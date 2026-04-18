import { ChevronRight } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { ContactSection } from "@/components/ContactSection";
import { SiteHeader } from "@/components/SiteHeader";
import { images } from "@/data/images";
import {
  blogPosts,
  profileData,
  projects,
  publications,
} from "@/data/content";

function SectionFrame({ id, className = "", children }) {
  return (
    <section id={id} className={`px-4 py-16 sm:px-6 lg:px-8 lg:py-20 ${className}`}>
      <div className="max-w-7xl mx-auto">{children}</div>
    </section>
  );
}

export default function Portfolio() {
  return (
    <div className="min-h-screen bg-white">
      <SiteHeader />

      <section id="about" className="relative min-h-[620px] overflow-hidden px-4 pt-24 pb-14 text-white sm:px-6 sm:pt-28 sm:pb-16 lg:px-8">
        <img src={images.header} alt="Himalayan mountain landscape" className="absolute inset-0 h-full w-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-r from-black/75 via-black/45 to-black/20" />
        <div className="absolute inset-0 bg-black/20" />

        <div className="relative z-10 mx-auto flex min-h-[496px] max-w-7xl items-center">
          <div className="max-w-3xl rounded-lg bg-black/35 p-5 shadow-2xl backdrop-blur-[2px] sm:p-6 md:p-8">
            <h1 className="mb-4 text-3xl font-bold leading-tight text-white sm:text-4xl md:text-5xl">{profileData.shortName}</h1>
            <div className="mb-6 max-w-2xl text-teal-50">
              <p className="text-lg font-semibold leading-8 sm:text-xl md:text-2xl">{profileData.role}</p>
              {profileData.affiliation.map((line) => (
                <p key={line} className="text-sm leading-7 sm:text-base md:text-lg">
                  {line}
                </p>
              ))}
            </div>
            <p className="mb-6 max-w-2xl text-sm leading-7 text-gray-100 sm:text-base sm:leading-8 md:text-lg">{profileData.bio}</p>
            <Button asChild className="bg-teal-600 text-white hover:bg-teal-700">
              <a href={profileData.resume} download>
                Download Resume
              </a>
            </Button>
          </div>
        </div>
      </section>

      <SectionFrame id="projects" className="bg-gray-50">
        <div className="mb-10 flex flex-col items-start gap-3 sm:mb-12 sm:flex-row sm:items-center sm:justify-between sm:gap-6">
          <h2 className="text-3xl font-bold text-gray-900 sm:text-4xl">Projects</h2>
          <Button asChild variant="link" className="text-gray-900">
            <a href="#/projects">
              READ MORE PROJECTS <ChevronRight className="ml-1" size={18} />
            </a>
          </Button>
        </div>
        <div className="grid gap-6 md:grid-cols-3">
          {projects.slice(0, 3).map((project) => (
            <Card key={project.id} className="border-0 shadow-md hover:shadow-lg transition-all">
              <CardContent className="p-5 sm:p-6">
                <div className="mb-4 flex items-start justify-between gap-4">
                  <h3 className="text-lg font-bold text-gray-900">{project.title}</h3>
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
      </SectionFrame>

      <SectionFrame id="publications">
        <div className="mb-10 flex flex-col items-start gap-3 sm:mb-12 sm:flex-row sm:items-center sm:justify-between sm:gap-6">
          <h2 className="text-3xl font-bold text-gray-900 sm:text-4xl">Publications</h2>
          <Button asChild variant="link" className="text-gray-900">
            <a href="#/publications">
              READ MORE PUBLICATIONS <ChevronRight className="ml-1" size={18} />
            </a>
          </Button>
        </div>
        <div className="grid gap-8 md:grid-cols-3">
          {publications.slice(0, 3).map((pub) => (
            <a key={pub.id} href={`https://doi.org/${pub.doi}`} target="_blank" rel="noreferrer" className="block h-full">
              <Card className="h-full overflow-hidden border-0 shadow-lg transition-all hover:shadow-xl">
                <div className="flex h-48 items-center justify-center bg-white p-4">
                  <img src={pub.thumbnail} alt={`${pub.title} thumbnail`} className="max-h-full max-w-full object-contain" />
                </div>
                <CardContent className="p-5 sm:p-6">
                  <div className="mb-4 flex flex-wrap gap-2">
                    <Badge variant="outline" className="border-gray-300 text-gray-700">
                      {pub.year}
                    </Badge>
                    {pub.scimagoQuartile ? (
                      <Badge variant="outline" className="border-teal-300 text-teal-700">
                        {pub.scimagoQuartile}
                      </Badge>
                    ) : null}
                  </div>
                  <h3 className="mb-3 text-lg font-bold leading-7 text-gray-900">{pub.title}</h3>
                  <p className="mb-3 text-sm text-gray-600">{pub.authors}</p>
                  <p className="text-sm italic text-gray-500">{pub.journal}</p>
                </CardContent>
              </Card>
            </a>
          ))}
        </div>
      </SectionFrame>

      <SectionFrame id="blogs">
        <div className="mb-10 flex flex-col items-start gap-3 sm:mb-12 sm:flex-row sm:items-center sm:justify-between">
          <h2 className="text-3xl font-bold text-gray-900 sm:text-4xl">Blogs</h2>
          <Button asChild variant="link" className="text-gray-900">
            <a href="#/blogs">
              READ MORE BLOGS <ChevronRight className="ml-1" size={18} />
            </a>
          </Button>
        </div>
        <div className="grid md:grid-cols-3 gap-8">
          {blogPosts.slice(0, 3).map((post) => (
            <a key={post.id} href={post.url} target="_blank" rel="noreferrer" className="block h-full">
              <Card className="h-full border-0 shadow-lg hover:shadow-xl transition-all group cursor-pointer overflow-hidden">
                <div className="h-48 bg-gradient-to-br from-blue-100 to-teal-100 overflow-hidden">
                  <img src={post.thumbnail} alt={post.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300" />
                </div>
                <CardContent className="p-5 sm:p-6">
                  <h3 className="text-xl font-bold text-gray-900 mb-3 group-hover:text-teal-600 transition-colors">{post.title}</h3>
                  <p className="mb-3 text-xs font-semibold uppercase text-teal-700">{post.category}</p>
                  <p className="text-sm text-gray-500">
                    {new Date(post.date).toLocaleDateString("en-US", {
                      year: "numeric",
                      month: "long",
                      day: "numeric",
                    })}{" "}
                    | {post.readTime}
                  </p>
                  <p className="mt-4 text-sm leading-6 text-gray-600">{post.excerpt}</p>
                </CardContent>
              </Card>
            </a>
          ))}
        </div>
      </SectionFrame>

      <ContactSection />

      <footer className="bg-black px-4 py-8 text-gray-400 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto text-center">
          <p>&copy; 2026 | Praveen Kalura</p>
        </div>
      </footer>
    </div>
  );
}
