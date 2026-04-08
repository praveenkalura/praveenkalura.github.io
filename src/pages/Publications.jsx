import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { SiteHeader } from "@/components/SiteHeader";
import { publications } from "@/data/content";

export default function Publications() {
  return (
    <div className="min-h-screen bg-gray-50">
      <SiteHeader />

      <main className="px-6 pt-28 pb-20 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <div className="mb-12 max-w-3xl">
            <h1 className="text-4xl font-bold text-gray-900">Publications</h1>
            <div className="mt-6 flex flex-wrap gap-3">
              <a href="https://scholar.google.com/citations?user=iie9NUUAAAAJ&hl=en" target="_blank" rel="noreferrer" className="inline-flex items-center gap-2 rounded-md bg-white px-4 py-2 text-sm font-semibold text-gray-900 shadow-sm transition-colors hover:bg-gray-100">
                <img src="https://scholar.google.com/favicon.ico" alt="" className="h-5 w-5" />
                <span>Google Scholar</span>
              </a>
              <a href="https://www.researchgate.net/profile/Praveen-Kalura?ev=hdr_xprf" target="_blank" rel="noreferrer" className="inline-flex items-center gap-2 rounded-md bg-white px-4 py-2 text-sm font-semibold text-gray-900 shadow-sm transition-colors hover:bg-gray-100">
                <img src="https://www.researchgate.net/favicon.ico" alt="" className="h-5 w-5" />
                <span>ResearchGate</span>
              </a>
              <a href="https://orcid.org/0000-0002-3722-138X" target="_blank" rel="noreferrer" className="inline-flex items-center gap-2 rounded-md bg-white px-4 py-2 text-sm font-semibold text-gray-900 shadow-sm transition-colors hover:bg-gray-100">
                <img src="https://orcid.org/favicon.ico" alt="" className="h-5 w-5" />
                <span>ORCID</span>
              </a>
              <a href="https://www.webofscience.com/wos/author/record/LFS-4835-2024" target="_blank" rel="noreferrer" className="inline-flex items-center gap-2 rounded-md bg-white px-4 py-2 text-sm font-semibold text-gray-900 shadow-sm transition-colors hover:bg-gray-100">
                <img src="https://www.webofscience.com/favicon.ico" alt="" className="h-5 w-5" />
                <span>Web of Science</span>
              </a>
            </div>
          </div>

          <div className="space-y-6">
            {publications.map((pub) => (
              <Card key={pub.id} className="overflow-hidden border-0 shadow-md hover:shadow-lg transition-all">
                <CardContent className="grid gap-6 p-6 md:grid-cols-[11rem_1fr]">
                  <div className="flex h-44 items-center justify-center overflow-hidden rounded-lg bg-white p-3">
                    <img src={pub.thumbnail} alt={`${pub.title} thumbnail`} className="max-h-full max-w-full object-contain" />
                  </div>
                  <div>
                    <div className="flex justify-between items-start mb-3">
                      <Badge variant="outline" className="text-gray-700 border-gray-300">
                        {pub.year}
                      </Badge>
                      <span className="text-sm text-gray-500">{pub.citations} citations</span>
                    </div>
                    <h2 className="text-lg font-semibold text-gray-900 mb-2">{pub.title}</h2>
                    <p className="text-gray-600 mb-2">{pub.authors}</p>
                    <p className="text-gray-500 italic text-sm">
                      {[pub.journal, pub.volume, pub.pages].filter(Boolean).join(", ")}
                    </p>
                    <div className="mt-3 flex flex-wrap gap-2">
                      {pub.impactFactor ? (
                        <Badge variant="outline" className="border-teal-300 text-teal-700">
                          Impact Factor: {pub.impactFactor}
                        </Badge>
                      ) : null}
                      {pub.scimagoQuartile ? (
                        <Badge variant="outline" className="border-blue-300 text-blue-700">
                          {pub.scimagoQuartile}
                        </Badge>
                      ) : null}
                    </div>
                    {pub.doi ? (
                      <p className="text-sm text-gray-500 mt-2">
                        DOI:{" "}
                        <a href={`https://doi.org/${pub.doi}`} target="_blank" rel="noreferrer" className="text-teal-700 hover:text-teal-800 hover:underline">
                          {pub.doi}
                        </a>
                      </p>
                    ) : null}
                    {pub.citationUpdated ? <p className="text-xs text-gray-400 mt-1">Citations updated: {pub.citationUpdated}</p> : null}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </main>
    </div>
  );
}
