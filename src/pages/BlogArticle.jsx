import { ArrowLeft, CalendarDays, Clock } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { SiteHeader } from "@/components/SiteHeader";
import { drangDrungBlog } from "@/data/drangDrungBlog";

export default function BlogArticle() {
  const post = drangDrungBlog;
  const formattedDate = new Date(post.date).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  return (
    <div className="min-h-screen bg-white">
      <SiteHeader />

      <main className="px-5 pt-28 pb-20 sm:px-6 lg:px-8">
        <article className="mx-auto max-w-4xl">
          <a href="#/blogs" className="mb-8 inline-flex items-center text-sm font-semibold text-teal-700 transition-colors hover:text-teal-900">
            <ArrowLeft className="mr-2" size={16} />
            Back to blogs
          </a>

          <header className="mb-10">
            <div className="mb-5 flex flex-wrap items-center gap-3 text-sm text-gray-600">
              <Badge variant="outline" className="border-teal-300 text-teal-700">
                {post.category}
              </Badge>
              <span className="inline-flex items-center gap-1.5">
                <CalendarDays size={16} />
                {formattedDate}
              </span>
              <span className="inline-flex items-center gap-1.5">
                <Clock size={16} />
                {post.readTime}
              </span>
            </div>

            <h1 className="text-4xl font-bold leading-tight text-gray-950 sm:text-5xl">{post.title}</h1>
            <p className="mt-6 border-l-4 border-teal-500 pl-5 text-xl leading-8 text-gray-700">{post.subtitle}</p>
          </header>

          <div className="mb-12 overflow-hidden rounded-lg border border-gray-200 bg-black shadow-lg">
            <div className="aspect-video">
              <iframe
                className="h-full w-full"
                src={`https://www.youtube.com/embed/${post.videoId}`}
                title={post.videoTitle}
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                allowFullScreen
              />
            </div>
          </div>

          <div className="space-y-10">
            {post.sections.map((section, sectionIndex) => (
              <section key={section.heading || sectionIndex}>
                {section.heading ? <h2 className="mb-5 text-2xl font-bold leading-8 text-gray-950 sm:text-3xl">{section.heading}</h2> : null}
                <div className="space-y-5">
                  {section.paragraphs.map((paragraph) => (
                    <p key={paragraph} className="text-lg leading-8 text-gray-700">
                      {paragraph}
                    </p>
                  ))}
                </div>
              </section>
            ))}
          </div>
        </article>
      </main>
    </div>
  );
}
