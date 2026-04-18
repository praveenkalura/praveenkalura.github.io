import { Building2, CalendarDays, ExternalLink, MapPin } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { SiteHeader } from "@/components/SiteHeader";
import { events } from "@/data/content";

const categoryOrder = [
  "Conferences and Symposiums",
  "Workshops and Training",
  "Seminars and Courses",
  "Memberships and Recognition",
  "Competitions and Technical Events",
];

const organizerResources = [
  {
    match: /National Institute of Hydrology|NIH/i,
    image: "/images/NIH_Logo.jpg",
    link: "https://nihroorkee.gov.in/",
    label: "Institute Website",
  },
  {
    match: /IIT Roorkee|Indian Institute of Technology \(IIT\) Roorkee|Indian Institute of Technology \(IIT\),? Roorkee/i,
    image: "/images/IIT_Roorkee.png",
    link: "https://www.iitr.ac.in/",
    label: "Institute Website",
  },
  {
    match: /Indian Institute of Remote Sensing|IIRS/i,
    image: "/images/IIRS_Logo.webp",
    link: "https://www.iirs.gov.in/",
    label: "Institute Website",
  },
  {
    match: /Graphic Era University/i,
    image: "/images/graphic_era.jpg",
    link: "https://geu.ac.in/",
    label: "Institute Website",
  },
  {
    match: /National Institute of Technology \(NIT\) Warangal|National Institute of Technology,? Warangal/i,
    image: "/images/NIT_Warangal.webp",
    link: "https://www.nitw.ac.in/",
    label: "Institute Website",
  },
  {
    match: /National Institute of Technical Teachers' Training & Research|NITTTR/i,
    link: "https://www.nitttrchd.ac.in/",
    label: "Institute Website",
  },
  {
    match: /National Institute of Disaster Management|NIDM/i,
    link: "https://nidm.gov.in/",
    label: "Institute Website",
  },
  {
    match: /Space Applications Centre|SAC/i,
    link: "https://www.sac.gov.in/",
    label: "Institute Website",
  },
  {
    match: /National Remote Sensing Centre|NRSC/i,
    link: "https://www.nrsc.gov.in/",
    label: "Institute Website",
  },
  {
    match: /National Programme on Technology Enhanced Learning|NPTEL/i,
    link: "https://www.nptel.ac.in/",
    label: "Programme Website",
  },
  {
    match: /Entrepreneurship Development Institute of India|EDI/i,
    link: "https://ediindia.org/",
    label: "Institute Website",
  },
  {
    match: /International Centre for Theoretical Physics|ICTP/i,
    link: "https://www.ictp.it/",
    label: "Institute Website",
  },
  {
    match: /The Institution of Engineers \(India\)|Institution of Engineers/i,
    link: "https://www.ieindia.org/webui/iei-home.html",
    label: "Institution Website",
  },
  {
    match: /Indian Institute of Science|IISc/i,
    link: "https://iisc.ac.in/",
    label: "Institute Website",
  },
  {
    match: /Make A Difference/i,
    link: "https://makeadiff.in/",
    label: "Organization Website",
  },
  {
    match: /Go Heritage Run/i,
    link: "https://www.goheritagerun.com/homepage/",
    label: "Event Website",
  },
];

function getEventCategory(type) {
  if (["Conference", "Symposium", "Conclave", "Academic Exchange"].includes(type)) {
    return "Conferences and Symposiums";
  }

  if (["Workshop", "Training", "Tutorials", "Summer School", "Camp"].includes(type)) {
    return "Workshops and Training";
  }

  if (["Seminar", "Course"].includes(type)) {
    return "Seminars and Courses";
  }

  if (["Membership", "Recognition"].includes(type)) {
    return "Memberships and Recognition";
  }

  return "Competitions and Technical Events";
}

function getEventResource(event) {
  const haystack = `${event.organizer ?? ""} ${event.title}`;
  const matched = organizerResources.find((resource) => resource.match.test(haystack));

  return {
    image: matched?.image ?? event.image ?? null,
    link: event.link ?? matched?.link ?? null,
    label: event.linkLabel ?? (event.link ? "Visit Event Page" : matched?.label ?? null),
  };
}

export default function Events() {
  const groupedEvents = categoryOrder
    .map((category) => ({
      category,
      items: events.filter((event) => getEventCategory(event.type) === category),
    }))
    .filter((group) => group.items.length > 0);

  return (
    <div className="min-h-screen bg-stone-50">
      <SiteHeader />

      <main className="px-4 pt-24 pb-16 sm:px-6 sm:pt-28 lg:px-8 lg:pb-20">
        <div className="mx-auto max-w-7xl">
          <div className="mb-12 max-w-3xl">
            <h1 className="text-3xl font-bold text-gray-900 sm:text-4xl">Events</h1>
            <p className="mt-4 text-base leading-7 text-gray-600 sm:text-lg sm:leading-8">
              Workshops, trainings, seminars, memberships, competitions, and conference participation organized into focused categories.
            </p>
          </div>

          <div className="space-y-10">
            {groupedEvents.map((group) => (
              <section key={group.category}>
                <div className="mb-4 flex items-center justify-between gap-4">
                  <h2 className="text-2xl font-bold text-gray-900 sm:text-3xl">{group.category}</h2>
                  <Badge variant="outline" className="border-stone-300 text-stone-700">
                    {group.items.length} events
                  </Badge>
                </div>

                <div className="overflow-hidden rounded-2xl border border-stone-200 bg-white shadow-sm">
                  {group.items.map((event, index) => (
                    <article key={event.id} className={`px-4 py-5 sm:px-6 ${index === group.items.length - 1 ? "" : "border-b border-stone-100"}`}>
                      {(() => {
                        const resource = getEventResource(event);

                        return (
                          <div className="flex flex-col gap-4 lg:flex-row lg:items-start lg:justify-between">
                        <div className="min-w-0 flex-1">
                          <div className="flex flex-wrap gap-2">
                            <Badge className="bg-slate-900 text-white hover:bg-slate-900">{event.type}</Badge>
                            {event.duration ? (
                              <Badge variant="outline" className="border-stone-300 text-stone-700">
                                {event.duration}
                              </Badge>
                            ) : null}
                          </div>

                          <h3 className="mt-3 text-lg font-bold leading-7 text-gray-900">{event.title}</h3>

                          <div className="mt-3 flex flex-wrap gap-x-5 gap-y-2 text-sm text-gray-500">
                            <span className="inline-flex items-start gap-2">
                              <CalendarDays size={16} className="mt-0.5 text-teal-700" />
                              <span>{event.dateLabel}</span>
                            </span>
                            {event.organizer ? (
                              <span className="inline-flex items-start gap-2">
                                <Building2 size={16} className="mt-0.5 text-teal-700" />
                                <span>{event.organizer}</span>
                              </span>
                            ) : null}
                            {event.location ? (
                              <span className="inline-flex items-start gap-2">
                                <MapPin size={16} className="mt-0.5 text-teal-700" />
                                <span>{event.location}</span>
                              </span>
                            ) : null}
                          </div>

                          <p className="mt-3 text-sm leading-6 text-gray-600">{event.description}</p>
                        </div>

                            {resource.image || resource.link ? (
                              <div className="flex shrink-0 items-start gap-3 lg:min-w-36 lg:flex-col lg:items-end">
                                {resource.image ? (
                                  <div className="flex h-14 w-14 items-center justify-center overflow-hidden rounded-xl border border-stone-200 bg-white p-2">
                                    <img src={resource.image} alt={event.organizer ?? event.title} className="h-full w-full object-contain" />
                                  </div>
                                ) : null}

                                {resource.link ? (
                                  <a
                                    href={resource.link}
                                    target="_blank"
                                    rel="noreferrer"
                                    className="inline-flex items-center gap-2 rounded-full border border-stone-300 px-4 py-2 text-sm font-semibold text-slate-900 transition-colors hover:border-teal-700 hover:text-teal-700"
                                  >
                                    {resource.label ?? "Related Link"}
                                    <ExternalLink size={16} />
                                  </a>
                                ) : null}
                              </div>
                            ) : null}
                          </div>
                        );
                      })()}
                    </article>
                  ))}
                </div>
              </section>
            ))}
          </div>
        </div>
      </main>
    </div>
  );
}
