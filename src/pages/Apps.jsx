import { ArrowUpRight, Download, FolderTree, Globe, Map, MonitorSmartphone } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { SiteHeader } from "@/components/SiteHeader";
import { apps } from "@/data/content";

const iconMap = {
  1: Globe,
  2: FolderTree,
};

export default function Apps() {
  return (
    <div className="min-h-screen bg-gray-50">
      <SiteHeader />

      <main className="px-4 pt-24 pb-16 sm:px-6 sm:pt-28 lg:px-8 lg:pb-20">
        <div className="mx-auto max-w-7xl">
          <section className="overflow-hidden rounded-3xl bg-slate-950 px-6 py-10 text-white shadow-xl sm:px-8 lg:px-12 lg:py-14">
            <div className="grid gap-8 lg:grid-cols-[1.2fr_0.8fr] lg:items-end">
              <div className="max-w-3xl">
                <p className="text-sm font-semibold uppercase tracking-[0.22em] text-teal-300">Research Apps</p>
                <h1 className="mt-4 text-3xl font-bold leading-tight sm:text-4xl lg:text-5xl">
                  Local climate-data tools built for practical geospatial workflows
                </h1>
                <p className="mt-5 max-w-2xl text-base leading-7 text-slate-300 sm:text-lg sm:leading-8">
                  These applications package climate-data extraction and download workflows into browser-based local tools,
                  making it easier to work with IMD and CMIP6 datasets without custom scripting.
                </p>
              </div>

              <div className="grid gap-4 rounded-2xl border border-white/10 bg-white/5 p-5 backdrop-blur-sm sm:grid-cols-2">
                <div>
                  <div className="mb-3 inline-flex rounded-full bg-teal-400/15 p-3 text-teal-200">
                    <MonitorSmartphone size={22} />
                  </div>
                  <p className="text-sm font-semibold text-white">Desktop-launched</p>
                  <p className="mt-2 text-sm leading-6 text-slate-300">Built for researchers who want a guided local workflow with a familiar browser UI.</p>
                </div>
                <div>
                  <div className="mb-3 inline-flex rounded-full bg-sky-400/15 p-3 text-sky-200">
                    <Map size={22} />
                  </div>
                  <p className="text-sm font-semibold text-white">GIS-friendly</p>
                  <p className="mt-2 text-sm leading-6 text-slate-300">Supports shapefiles, AOIs, map previews, and structured outputs for downstream analysis.</p>
                </div>
              </div>
            </div>
          </section>

          <section className="mt-10 grid gap-6 xl:grid-cols-2">
            {apps.map((app) => {
              const Icon = iconMap[app.id] ?? Globe;

              return (
                <Card key={app.id} className="border-0 bg-white shadow-lg shadow-gray-200/70">
                  <CardContent className="p-6 sm:p-7">
                    <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
                      <div>
                        <div className="mb-3 inline-flex rounded-2xl bg-teal-50 p-3 text-teal-700">
                          <Icon size={24} />
                        </div>
                        <p className="text-sm font-medium uppercase tracking-[0.18em] text-teal-700">{app.category}</p>
                        <h2 className="mt-2 text-2xl font-bold text-gray-900">{app.title}</h2>
                        <p className="mt-3 max-w-2xl text-sm leading-7 text-gray-600 sm:text-base">{app.description}</p>
                      </div>
                      <Badge variant="outline" className="w-fit border-teal-300 text-teal-700">
                        {app.status}
                      </Badge>
                    </div>

                    <div className="grid gap-4 sm:grid-cols-3">
                      <div className="rounded-2xl bg-gray-50 p-4">
                        <p className="text-xs font-semibold uppercase tracking-[0.16em] text-gray-500">Runtime</p>
                        <p className="mt-2 text-sm leading-6 text-gray-700">{app.backend}</p>
                      </div>
                      <div className="rounded-2xl bg-gray-50 p-4">
                        <p className="text-xs font-semibold uppercase tracking-[0.16em] text-gray-500">Output</p>
                        <p className="mt-2 text-sm leading-6 text-gray-700">{app.outputSummary}</p>
                      </div>
                      <div className="rounded-2xl bg-gray-50 p-4">
                        <p className="text-xs font-semibold uppercase tracking-[0.16em] text-gray-500">Access</p>
                        <p className="mt-2 text-sm leading-6 text-gray-700">Download the packaged app directly or open the hosted Drive file page.</p>
                      </div>
                    </div>

                    <div className="mt-6 grid gap-6 lg:grid-cols-2">
                      <div>
                        <h3 className="text-sm font-semibold uppercase tracking-[0.16em] text-gray-500">Key Features</h3>
                        <div className="mt-4 space-y-3">
                          {app.highlights.map((item) => (
                            <div key={item} className="rounded-2xl border border-gray-100 bg-white p-4">
                              <p className="text-sm leading-6 text-gray-700">{item}</p>
                            </div>
                          ))}
                        </div>
                      </div>

                      <div>
                        <h3 className="text-sm font-semibold uppercase tracking-[0.16em] text-gray-500">Supported Inputs</h3>
                        <div className="mt-4 space-y-3">
                          {app.supportedItems.map((item) => (
                            <div key={item} className="rounded-2xl border border-gray-100 bg-gray-50 p-4">
                              <p className="text-sm leading-6 text-gray-700">{item}</p>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>

                    <div className="mt-8 flex flex-col gap-3 sm:flex-row">
                      <Button asChild className="bg-teal-700 text-white hover:bg-teal-800">
                        <a href={app.downloadUrl} target="_blank" rel="noreferrer">
                          <Download size={16} />
                          Download App
                        </a>
                      </Button>
                      <Button asChild variant="outline" className="border-gray-300 text-gray-800 hover:bg-gray-100">
                        <a href={app.sourceUrl} target="_blank" rel="noreferrer">
                          <ArrowUpRight size={16} />
                          Open Drive File
                        </a>
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              );
            })}
          </section>
        </div>
      </main>
    </div>
  );
}
