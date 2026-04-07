import fs from "node:fs/promises";
import path from "node:path";
import process from "node:process";
import vm from "node:vm";
import { fileURLToPath } from "node:url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const repoRoot = path.resolve(__dirname, "..");
const contentFile = path.join(repoRoot, "src", "data", "content.js");
const args = new Set(process.argv.slice(2));
const skipWithoutKey = args.has("--skip-without-key");
const serpApiKey = process.env.SERPAPI_API_KEY;

if (!serpApiKey) {
  const message = "SERPAPI_API_KEY is not set; skipping Google Scholar citation refresh.";

  if (skipWithoutKey) {
    console.log(message);
    process.exit(0);
  }

  console.error(message);
  console.error("Set SERPAPI_API_KEY and rerun `npm run refresh:scholar`.");
  process.exit(1);
}

const today = process.env.CITATION_UPDATED_DATE ?? new Date().toISOString().slice(0, 10);
const delay = (milliseconds) => new Promise((resolve) => setTimeout(resolve, milliseconds));

function normalizeTitle(value) {
  return String(value ?? "")
    .replace(/<[^>]*>/g, "")
    .normalize("NFKD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, " ")
    .trim();
}

function scoreTitleMatch(resultTitle, publicationTitle) {
  const resultWords = new Set(normalizeTitle(resultTitle).split(" ").filter((word) => word.length > 2));
  const publicationWords = normalizeTitle(publicationTitle).split(" ").filter((word) => word.length > 2);

  if (!resultWords.size || !publicationWords.length) {
    return 0;
  }

  const matches = publicationWords.filter((word) => resultWords.has(word)).length;
  return matches / publicationWords.length;
}

function readPublications(content) {
  const sandbox = {};
  const runnableContent = content.replace(/^export const\s+/gm, "var ");

  vm.createContext(sandbox);
  vm.runInContext(runnableContent, sandbox, { filename: contentFile });

  if (!Array.isArray(sandbox.publications)) {
    throw new Error("Could not read publications from src/data/content.js");
  }

  return sandbox.publications;
}

async function fetchScholarCitationCount(publication) {
  const url = new URL("https://serpapi.com/search.json");
  url.searchParams.set("engine", "google_scholar");
  url.searchParams.set("q", `"${publication.title}"`);
  url.searchParams.set("hl", "en");
  url.searchParams.set("api_key", serpApiKey);

  const response = await fetch(url);
  const data = await response.json();

  if (!response.ok || data.error) {
    throw new Error(data.error ?? `SerpAPI request failed with status ${response.status}`);
  }

  const candidates = (data.organic_results ?? [])
    .map((result) => ({
      result,
      score: scoreTitleMatch(result.title, publication.title),
    }))
    .sort((a, b) => b.score - a.score);
  const bestMatch = candidates[0];

  if (!bestMatch || bestMatch.score < 0.45) {
    throw new Error(`Could not find a confident Google Scholar match for "${publication.title}"`);
  }

  const citationTotal = bestMatch.result.inline_links?.cited_by?.total ?? 0;
  return Number.parseInt(citationTotal, 10) || 0;
}

function updateNumberField(block, field, value) {
  const pattern = new RegExp(`(\\n\\s*${field}:\\s*)\\d+(,)`);

  if (!pattern.test(block)) {
    throw new Error(`Could not find numeric field "${field}" in publication block.`);
  }

  return block.replace(pattern, `$1${value}$2`);
}

function updateStringField(block, field, value, afterField) {
  const encodedValue = JSON.stringify(value);
  const pattern = new RegExp(`(\\n\\s*${field}:\\s*)"[^"]*"(,)`);

  if (pattern.test(block)) {
    return block.replace(pattern, `$1${encodedValue}$2`);
  }

  const afterPattern = new RegExp(`(\\n\\s*${afterField}:\\s*[^\\n]+,)`);

  if (!afterPattern.test(block)) {
    throw new Error(`Could not insert string field "${field}" after "${afterField}".`);
  }

  return block.replace(afterPattern, `$1\n    ${field}: ${encodedValue},`);
}

function updatePublicationBlock(content, publicationId, updateBlock) {
  const publicationsStart = content.indexOf("export const publications = [");

  if (publicationsStart === -1) {
    throw new Error("Could not find publications array.");
  }

  const idIndex = content.indexOf(`    id: ${publicationId},`, publicationsStart);

  if (idIndex === -1) {
    throw new Error(`Could not find publication id ${publicationId}.`);
  }

  const blockStart = content.lastIndexOf("  {", idIndex);
  const blockEndMarker = "\n  },";
  const blockEnd = content.indexOf(blockEndMarker, idIndex);

  if (blockStart === -1 || blockEnd === -1) {
    throw new Error(`Could not isolate publication id ${publicationId}.`);
  }

  const blockEndWithMarker = blockEnd + blockEndMarker.length;
  const block = content.slice(blockStart, blockEndWithMarker);
  const updatedBlock = updateBlock(block);

  return content.slice(0, blockStart) + updatedBlock + content.slice(blockEndWithMarker);
}

let content = await fs.readFile(contentFile, "utf8");
const publications = readPublications(content);

for (const publication of publications) {
  console.log(`Fetching Google Scholar citations for: ${publication.title}`);
  const citationCount = await fetchScholarCitationCount(publication);

  content = updatePublicationBlock(content, publication.id, (block) => {
    let updatedBlock = updateNumberField(block, "citations", citationCount);
    updatedBlock = updateStringField(updatedBlock, "citationUpdated", today, "citations");
    return updatedBlock;
  });

  console.log(`Updated publication ${publication.id}: ${citationCount} citations`);
  await delay(1000);
}

await fs.writeFile(contentFile, content);
console.log(`Google Scholar citation refresh complete (${today}).`);
