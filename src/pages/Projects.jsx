import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { SiteHeader } from "@/components/SiteHeader";
import { projects } from "@/data/content";

export default function Projects() {
  return (
    <div className="min-h-screen bg-gray-50">
      <SiteHeader />

      <main className="px-6 pt-28 pb-20 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <div className="mb-12 max-w-3xl">
            <h1 className="text-4xl font-bold text-gray-900">Projects</h1>
            <p className="mt-4 text-lg leading-8 text-gray-600">
              Research, modeling, and geospatial development projects across water resources and remote sensing.
            </p>
          </div>

          <div className="grid gap-6 md:grid-cols-2">
            {projects.map((project) => (
              <Card key={project.id} className="border-0 shadow-md transition-all hover:shadow-lg">
                <CardContent className="p-6">
                  <div className="mb-4 flex items-start justify-between gap-4">
                    <h2 className="text-lg font-bold text-gray-900">{project.title}</h2>
                    <Badge variant="outline" className="border-teal-300 text-teal-700">
                      {project.status}
                    </Badge>
                  </div>
                  <p className="mb-2 text-sm font-medium text-gray-600">{project.organization}</p>
                  <p className="mb-4 text-sm text-gray-500">{project.duration}</p>
                  <p className="mb-5 text-sm leading-6 text-gray-700">{project.description}</p>
                  <div className="flex flex-wrap gap-2">
                    {project.technologies.map((technology) => (
                      <Badge key={technology} variant="outline" className="border-gray-300 text-gray-700">
                        {technology}
                      </Badge>
                    ))}
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
