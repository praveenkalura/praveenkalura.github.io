import { CalendarDays, ExternalLink, MapPin } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { SiteHeader } from "@/components/SiteHeader";
import { events } from "@/data/content";

function formatEventDate(date) {
  return new Date(date).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}

export default function Events() {
  return (
    <div className="min-h-screen bg-stone-50">
      <SiteHeader />

      <main className="px-4 pt-24 pb-16 sm:px-6 sm:pt-28 lg:px-8 lg:pb-20">
        <div className="mx-auto max-w-7xl">
          <div className="mb-12 max-w-3xl">
            <h1 className="text-3xl font-bold text-gray-900 sm:text-4xl">Events</h1>
            <p className="mt-4 text-base leading-7 text-gray-600 sm:text-lg sm:leading-8">
              Conferences, trainings, and research milestones from recent academic and professional engagements.
            </p>
          </div>

          <section className="space-y-8">
            {events.map((event, index) => (
              <Card key={event.id} className="overflow-hidden border-0 bg-white shadow-lg shadow-stone-200/70">
                <div className="grid gap-0 lg:grid-cols-[0.95fr_1.05fr]">
                  <div className={`relative min-h-[260px] ${event.imageBackground ?? "bg-stone-100"} ${index % 2 === 1 ? "lg:order-2" : ""}`}>
                    <img
                      src={event.image}
                      alt={event.title}
                      className={`h-full w-full ${event.imageFit === "contain" ? "object-contain p-8" : "object-cover"}`}
                    />
                    {event.imageFit === "contain" ? null : <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-black/10 to-transparent" />}
                    <div className="absolute left-5 bottom-5">
                      <Badge className="bg-white text-slate-900 hover:bg-white">{event.type}</Badge>
                    </div>
                  </div>

                  <CardContent className={`p-6 sm:p-8 ${index % 2 === 1 ? "lg:order-1" : ""}`}>
                    <div className="flex flex-wrap items-center gap-3 text-sm text-gray-500">
                      <span className="inline-flex items-center gap-2">
                        <CalendarDays size={16} className="text-teal-700" />
                        {formatEventDate(event.date)}
                      </span>
                      <span className="inline-flex items-center gap-2">
                        <MapPin size={16} className="text-teal-700" />
                        {event.location}
                      </span>
                    </div>

                    <h2 className="mt-4 text-2xl font-bold text-gray-900">{event.title}</h2>
                    <p className="mt-4 text-sm leading-7 text-gray-600 sm:text-base">{event.description}</p>

                    <a
                      href={event.link}
                      target="_blank"
                      rel="noreferrer"
                      className="mt-6 inline-flex items-center gap-2 rounded-full bg-slate-900 px-5 py-3 text-sm font-semibold text-white transition-colors hover:bg-teal-700"
                    >
                      {event.linkLabel ?? "Visit Event Page"}
                      <ExternalLink size={16} />
                    </a>
                  </CardContent>
                </div>
              </Card>
            ))}
          </section>
        </div>
      </main>
    </div>
  );
}
