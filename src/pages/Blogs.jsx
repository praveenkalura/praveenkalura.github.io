import { ChevronRight } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { SiteHeader } from "@/components/SiteHeader";
import { blogPosts } from "@/data/content";

export default function Blogs() {
  return (
    <div className="min-h-screen bg-gray-50">
      <SiteHeader />

      <main className="px-6 pt-28 pb-20 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <div className="mb-12 max-w-3xl">
            <h1 className="text-4xl font-bold text-gray-900">Blogs</h1>
            <p className="mt-4 text-lg leading-8 text-gray-600">
              Medium posts from Praveen Kalura on water resources, remote sensing, sustainability, and technology.
            </p>
          </div>

          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            {blogPosts.map((post) => (
              <a key={post.id} href={post.url} target="_blank" rel="noreferrer" className="block h-full">
                <Card className="h-full overflow-hidden border-0 shadow-lg transition-all hover:shadow-xl">
                  <div className="h-52 overflow-hidden bg-teal-50">
                    <img src={post.thumbnail} alt={post.title} className="h-full w-full object-cover transition-transform duration-300 hover:scale-105" />
                  </div>
                  <CardContent className="p-6">
                    <div className="mb-4 flex flex-wrap items-center gap-2">
                      <Badge variant="outline" className="border-teal-300 text-teal-700">
                        {post.category}
                      </Badge>
                      <span className="text-sm text-gray-500">
                        {new Date(post.date).toLocaleDateString("en-US", {
                          year: "numeric",
                          month: "long",
                          day: "numeric",
                        })}
                      </span>
                    </div>
                    <h2 className="mb-3 text-xl font-bold leading-7 text-gray-900">{post.title}</h2>
                    <p className="mb-5 text-sm leading-6 text-gray-600">{post.excerpt}</p>
                    <span className="inline-flex items-center text-sm font-semibold text-teal-700">
                      Read on Medium <ChevronRight className="ml-1" size={16} />
                    </span>
                  </CardContent>
                </Card>
              </a>
            ))}
          </div>
        </div>
      </main>
    </div>
  );
}
