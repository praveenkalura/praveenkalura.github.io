import { Briefcase } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { SiteHeader } from "@/components/SiteHeader";
import { education, experiences } from "@/data/content";

export default function Background() {
  return (
    <div className="min-h-screen bg-gray-50">
      <SiteHeader />

      <main className="px-4 pt-24 pb-16 sm:px-6 sm:pt-28 lg:px-8 lg:pb-20">
        <div className="mx-auto max-w-7xl">
          <div className="mb-12 max-w-3xl">
            <h1 className="text-3xl font-bold text-gray-900 sm:text-4xl">Background</h1>
            <p className="mt-4 text-base leading-7 text-gray-600 sm:text-lg sm:leading-8">
              Academic training and professional experience across civil engineering, remote sensing, GIS, hydrology, and water resources engineering.
            </p>
          </div>

          <section>
            <h2 className="mb-8 text-2xl font-bold text-gray-900 sm:text-3xl">Education</h2>
            <div className="grid gap-6 lg:grid-cols-3">
              {education.map((edu) => (
                <Card key={edu.id} className="border-0 shadow-md transition-all hover:shadow-lg">
                  <CardContent className="p-5 sm:p-6">
                    <div className="mb-5 flex h-28 w-full items-center justify-center rounded-lg bg-gray-50 p-3">
                      <img src={edu.logo} alt={`${edu.institution} logo`} className="max-h-full max-w-full object-contain" />
                    </div>
                    <h2 className="text-lg font-bold text-gray-900">{edu.degree}</h2>
                    <p className="mt-2 text-sm font-medium text-teal-700">{edu.field}</p>
                    <p className="mt-3 text-sm text-gray-600">{edu.institution}</p>
                    <p className="mt-2 text-sm text-gray-500">{edu.year}</p>
                    {edu.dissertation ? <p className="mt-4 text-sm leading-6 text-gray-600">{edu.dissertation}</p> : null}
                  </CardContent>
                </Card>
              ))}
            </div>
          </section>

          <section className="mt-14">
            <h2 className="mb-8 text-2xl font-bold text-gray-900 sm:text-3xl">Experience</h2>
            <div className="grid gap-6 lg:grid-cols-2">
              {experiences.map((exp) => (
                <Card key={exp.id} className="border-0 shadow-md transition-all hover:shadow-lg">
                  <CardContent className="p-5 sm:p-6">
                    <div className="flex flex-col gap-5 sm:flex-row sm:items-start">
                      <div className="flex h-28 w-32 flex-shrink-0 items-center justify-center rounded-lg bg-gray-50 p-3">
                        {exp.logo ? (
                          <img src={exp.logo} alt={`${exp.organization} logo`} className="max-h-full max-w-full object-contain" />
                        ) : (
                          <Briefcase size={48} className="text-gray-400" />
                        )}
                      </div>
                      <div className="min-w-0">
                        <h3 className="text-lg font-bold text-gray-900">{exp.title}</h3>
                        <p className="mt-2 text-sm font-medium text-teal-700">{exp.organization}</p>
                        <p className="mt-2 text-sm text-gray-500">{exp.duration}</p>
                        <p className="mt-4 text-sm leading-6 text-gray-600">{exp.location}</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </section>
        </div>
      </main>
    </div>
  );
}
