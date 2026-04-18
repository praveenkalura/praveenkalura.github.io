import { useState } from "react";
import { ChevronDown, ChevronUp, Download, FolderTree, Globe, Layers3, MonitorSmartphone } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { SiteHeader } from "@/components/SiteHeader";
import { apps } from "@/data/content";

const iconMap = {
  1: Globe,
  2: FolderTree,
  3: MonitorSmartphone,
  4: Layers3,
};

export default function Apps() {
  const [expandedIds, setExpandedIds] = useState([]);

  function toggleExpanded(appId) {
    setExpandedIds((current) => (current.includes(appId) ? current.filter((id) => id !== appId) : [...current, appId]));
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <SiteHeader />

      <main className="px-4 pt-24 pb-16 sm:px-6 sm:pt-28 lg:px-8 lg:pb-20">
        <div className="mx-auto max-w-6xl">
          <div className="mb-10 max-w-3xl">
            <h1 className="text-3xl font-bold text-gray-900 sm:text-4xl">Apps</h1>
            <p className="mt-4 text-base leading-7 text-gray-600 sm:text-lg sm:leading-8">
              A small collection of local research tools for climate, NetCDF, and land-use workflows.
            </p>
          </div>

          <section className="grid gap-6 lg:grid-cols-2">
            {apps.map((app) => {
              const Icon = iconMap[app.id] ?? Globe;
              const isComingSoon = app.status === "Coming Soon";
              const isExpanded = expandedIds.includes(app.id);

              return (
                <Card key={app.id} className="border border-gray-200 bg-white shadow-sm">
                  <CardContent className="p-6">
                    <div className="flex items-start justify-between gap-4">
                      <div className="min-w-0">
                        <div className="mb-3 inline-flex rounded-2xl bg-teal-50 p-3 text-teal-700">
                          <Icon size={22} />
                        </div>
                        <p className="text-xs font-semibold uppercase tracking-[0.16em] text-teal-700">{app.category}</p>
                        <h2 className="mt-2 text-xl font-bold text-gray-900">{app.title}</h2>
                      </div>
                      <Badge variant="outline" className={`w-fit ${isComingSoon ? "border-amber-300 text-amber-700" : "border-teal-300 text-teal-700"}`}>
                        {app.status}
                      </Badge>
                    </div>

                    <p className="mt-4 text-sm leading-7 text-gray-600">{app.description}</p>

                    <div className="mt-6 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                      <Button
                        type="button"
                        variant="outline"
                        onClick={() => toggleExpanded(app.id)}
                        className="border-gray-300 text-gray-800 hover:bg-gray-100"
                      >
                        {isExpanded ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
                        {isExpanded ? "Hide Details" : "Expand Details"}
                      </Button>

                      {app.downloadUrl ? (
                        <Button asChild className="bg-teal-700 text-white hover:bg-teal-800">
                          <a href={app.downloadUrl} target="_blank" rel="noreferrer">
                            <Download size={16} />
                            Download App
                          </a>
                        </Button>
                      ) : null}
                    </div>

                    {isExpanded ? (
                      <div className="mt-6 grid gap-6 border-t border-gray-100 pt-6">
                        <div className="grid gap-4 sm:grid-cols-2">
                          <div className="rounded-2xl bg-gray-50 p-4">
                            <p className="text-xs font-semibold uppercase tracking-[0.16em] text-gray-500">Runtime</p>
                            <p className="mt-2 text-sm leading-6 text-gray-700">{app.backend}</p>
                          </div>
                          <div className="rounded-2xl bg-gray-50 p-4">
                            <p className="text-xs font-semibold uppercase tracking-[0.16em] text-gray-500">Output</p>
                            <p className="mt-2 text-sm leading-6 text-gray-700">{app.outputSummary}</p>
                          </div>
                        </div>

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
                    ) : null}
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
