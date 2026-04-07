import {
  BookOpen,
  Briefcase,
  ChevronRight,
  FileText,
  Github,
  Linkedin,
  Mail,
  Phone,
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { images } from "@/data/images";
import {
  blogPosts,
  education,
  experiences,
  grants,
  profileData,
  publications,
} from "@/data/content";

const navItems = [
  ["About", "#about"],
  ["Publications", "#publications"],
  ["News", "#news"],
  ["Contact", "#contact"],
];

function SectionFrame({ id, className = "", children }) {
  return (
    <section id={id} className={`py-20 px-6 lg:px-8 ${className}`}>
      <div className="max-w-7xl mx-auto">{children}</div>
    </section>
  );
}

export default function Portfolio() {
  return (
    <div className="min-h-screen bg-white">
      <header className="fixed top-0 left-0 right-0 z-50 bg-white/95 backdrop-blur-sm border-b border-gray-100">
        <nav className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="text-lg font-semibold text-gray-900">{profileData.shortName}</div>
            <div className="hidden md:flex space-x-8 text-sm">
              {navItems.map(([label, href]) => (
                <a key={href} href={href} className="text-gray-600 hover:text-gray-900 transition-colors">
                  {label}
                </a>
              ))}
            </div>
          </div>
        </nav>
      </header>

      <section id="about" className="relative min-h-[620px] overflow-hidden px-6 pt-28 pb-16 text-white lg:px-8">
        <img src={images.header} alt="Himalayan mountain landscape" className="absolute inset-0 h-full w-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-r from-black/75 via-black/45 to-black/20" />
        <div className="absolute inset-0 bg-black/20" />

        <div className="relative z-10 mx-auto flex min-h-[476px] max-w-7xl items-center">
          <div className="max-w-3xl">
            <p className="mb-3 text-sm font-semibold uppercase tracking-wider text-teal-100">MEET THE RESEARCHER</p>
            <h1 className="mb-4 text-4xl font-bold leading-tight text-white md:text-5xl">{profileData.name}</h1>
            <p className="mb-6 text-xl font-medium text-teal-50 md:text-2xl">{profileData.role}</p>
            <p className="mb-5 max-w-2xl text-base leading-8 text-gray-100 md:text-lg">{profileData.bio}</p>
            <p className="max-w-2xl text-base leading-8 text-gray-100 md:text-lg">{profileData.expertise}</p>
          </div>
        </div>
      </section>

      <SectionFrame>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {education.map((edu) => (
            <Card key={edu.id} className="border-0 shadow-lg hover:shadow-xl transition-all group">
              <CardContent className="p-8">
                <div className="flex items-start gap-5">
                  <div className="flex h-20 w-24 flex-shrink-0 items-center justify-center rounded-lg bg-gray-50 p-3 group-hover:bg-gray-100 transition-colors">
                    <img src={edu.logo} alt={`${edu.institution} logo`} className="max-h-full max-w-full object-contain" />
                  </div>
                  <div className="min-w-0">
                    <h3 className="text-lg font-bold text-gray-900 mb-2">{edu.degree}</h3>
                    <p className="text-gray-600 mb-4">{edu.institution}</p>
                    <p className="text-sm text-gray-500">{edu.year}</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="grid md:grid-cols-2 gap-8 mt-8">
          {experiences.map((exp) => (
            <Card key={exp.id} className="border-0 shadow-lg hover:shadow-xl transition-all group">
              <CardContent className="p-8">
                <div className="h-24 flex items-center justify-center mb-6 bg-gray-50 rounded-lg p-4 group-hover:bg-gray-100 transition-colors">
                  {exp.logo ? (
                    <img src={exp.logo} alt={`${exp.organization} logo`} className="max-h-full max-w-full object-contain" />
                  ) : (
                    <Briefcase size={48} className="text-gray-400" />
                  )}
                </div>
                <h3 className="text-lg font-bold text-gray-900 mb-2">{exp.title}</h3>
                <p className="text-gray-600 mb-2">{exp.organization}</p>
                <p className="text-sm text-gray-500">{exp.duration}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </SectionFrame>

      <SectionFrame id="publications">
        <h2 className="text-4xl font-bold text-gray-900 mb-12">Publications</h2>
        <div className="space-y-6">
          {publications.map((pub) => (
            <Card key={pub.id} className="border-0 shadow-md hover:shadow-lg transition-all">
              <CardContent className="p-6">
                <div className="flex justify-between items-start mb-3">
                  <Badge variant="outline" className="text-gray-700 border-gray-300">
                    {pub.year}
                  </Badge>
                  <span className="text-sm text-gray-500">{pub.citations} citations</span>
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">{pub.title}</h3>
                <p className="text-gray-600 mb-2">{pub.authors}</p>
                <p className="text-gray-500 italic text-sm">
                  {[pub.journal, pub.volume, pub.pages].filter(Boolean).join(", ")}
                </p>
                {pub.doi ? (
                  <p className="text-sm text-gray-500 mt-2">
                    DOI:{" "}
                    <a href={`https://doi.org/${pub.doi}`} target="_blank" rel="noreferrer" className="text-teal-700 hover:text-teal-800 hover:underline">
                      {pub.doi}
                    </a>
                  </p>
                ) : null}
                {pub.citationUpdated ? <p className="text-xs text-gray-400 mt-1">Citations updated: {pub.citationUpdated}</p> : null}
              </CardContent>
            </Card>
          ))}
        </div>
      </SectionFrame>

      <SectionFrame id="news" className="bg-gray-50">
        <div className="flex justify-between items-center mb-12">
          <h2 className="text-4xl font-bold text-gray-900">News & Updates</h2>
          <Button variant="link" className="text-gray-900">
            READ MORE NEWS <ChevronRight className="ml-1" size={18} />
          </Button>
        </div>
        <div className="grid md:grid-cols-3 gap-8">
          {blogPosts.map((post) => (
            <Card key={post.id} className="border-0 shadow-lg hover:shadow-xl transition-all group cursor-pointer overflow-hidden">
              <div className="h-48 bg-gradient-to-br from-blue-100 to-teal-100 overflow-hidden">
                <img src={images.blog} alt={post.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300" />
              </div>
              <CardContent className="p-6">
                <h3 className="text-xl font-bold text-gray-900 mb-3 group-hover:text-teal-600 transition-colors">{post.title}</h3>
                <p className="text-sm text-gray-500 mb-4">
                  {new Date(post.date).toLocaleDateString("en-US", {
                    year: "numeric",
                    month: "long",
                    day: "numeric",
                  })}{" "}
                  | {post.excerpt}
                </p>
              </CardContent>
            </Card>
          ))}
        </div>
      </SectionFrame>

      <SectionFrame>
        <h2 className="text-4xl font-bold text-gray-900 mb-12">Grants & Awards</h2>
        <div className="grid md:grid-cols-2 gap-6">
          {grants.map((grant) => (
            <Card key={grant.id} className="border-l-4 border-teal-600 shadow-md">
              <CardContent className="p-6">
                <div className="flex justify-between items-start mb-3 gap-4">
                  <h3 className="text-lg font-bold text-gray-900">{grant.title}</h3>
                  <Badge variant="outline" className="text-teal-700 border-teal-300">
                    {grant.year}
                  </Badge>
                </div>
                <p className="text-gray-600 font-medium mb-2">{grant.program}</p>
                <p className="text-gray-700 text-sm">{grant.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </SectionFrame>

      <section id="contact" className="py-20 bg-gray-900 text-white px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-4xl font-bold mb-4 text-center">Contact Us</h2>
          <p className="text-xl text-gray-300 mb-12 text-center">We'd love to hear from you!</p>
          <div className="grid md:grid-cols-2 gap-12">
            <div>
              <h3 className="text-2xl font-semibold mb-6">Address</h3>
              <div className="space-y-4 text-gray-300">
                <p className="font-semibold text-white">{profileData.name}</p>
                {profileData.address.map((line) => (
                  <p key={line}>{line}</p>
                ))}
                <div className="pt-6">
                  <p className="mb-2">
                    <Mail className="inline w-5 h-5 mr-2" />
                    <a href={`mailto:${profileData.email}`} className="hover:text-teal-400 transition-colors">
                      {profileData.email}
                    </a>
                  </p>
                  <p>
                    <Phone className="inline w-5 h-5 mr-2" />
                    <a href={`tel:${profileData.phone}`} className="hover:text-teal-400 transition-colors">
                      {profileData.phone}
                    </a>
                  </p>
                </div>
                <div className="pt-6 flex gap-4">
                  <a href={profileData.socialLinks.linkedin} className="w-10 h-10 bg-gray-800 rounded-full flex items-center justify-center hover:bg-teal-600 transition-colors">
                    <Linkedin size={20} />
                  </a>
                  <a href={profileData.socialLinks.scholar} className="w-10 h-10 bg-gray-800 rounded-full flex items-center justify-center hover:bg-teal-600 transition-colors">
                    <BookOpen size={20} />
                  </a>
                  <a href={profileData.socialLinks.researchgate} className="w-10 h-10 bg-gray-800 rounded-full flex items-center justify-center hover:bg-teal-600 transition-colors">
                    <FileText size={20} />
                  </a>
                  <a href={profileData.socialLinks.github} className="w-10 h-10 bg-gray-800 rounded-full flex items-center justify-center hover:bg-teal-600 transition-colors">
                    <Github size={20} />
                  </a>
                </div>
              </div>
            </div>

            <div>
              <h3 className="text-2xl font-semibold mb-6">Send us a Message</h3>
              <form className="space-y-4" onSubmit={(event) => event.preventDefault()}>
                <Input placeholder="Full Name*" className="bg-gray-800 border-gray-700 text-white placeholder:text-gray-400" />
                <Input type="email" placeholder="Email*" className="bg-gray-800 border-gray-700 text-white placeholder:text-gray-400" />
                <Input type="tel" placeholder="Phone*" className="bg-gray-800 border-gray-700 text-white placeholder:text-gray-400" />
                <textarea
                  placeholder="Message*"
                  rows={5}
                  className="w-full px-3 py-2 bg-gray-800 border border-gray-700 rounded-md text-white placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-teal-500"
                />
                <Button className="w-full bg-teal-600 hover:bg-teal-700 text-white py-6">Send</Button>
              </form>
            </div>
          </div>
        </div>
      </section>

      <footer className="bg-black text-gray-400 py-8 px-6 lg:px-8">
        <div className="max-w-7xl mx-auto text-center">
          <p>&copy; {new Date().getFullYear()} Dr. Praveen Kalura. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
}
