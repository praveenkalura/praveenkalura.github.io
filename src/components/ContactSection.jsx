import { useForm, ValidationError } from "@formspree/react";
import { BookOpen, FileText, Github, Linkedin, Mail, Phone } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { profileData } from "@/data/content";

export function ContactSection({ className = "" }) {
  const [contactState, handleContactSubmit] = useForm("mnjordoz");

  return (
    <section id="contact" className={`py-20 bg-gray-900 text-white px-6 lg:px-8 ${className}`}>
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
              <div className="pt-8">
                <p className="mb-3 text-sm font-semibold uppercase tracking-wide text-gray-400">Site Visitors</p>
                <a href="https://hits.sh/praveenkalura.github.io/" target="_blank" rel="noreferrer" className="inline-flex rounded-md bg-gray-800 px-3 py-2 transition-colors hover:bg-gray-700">
                  <img src="https://hits.sh/praveenkalura.github.io.svg?label=visitors&color=0f766e&labelColor=111827" alt="Site visitors" />
                </a>
              </div>
            </div>
          </div>

          <div>
            <h3 className="text-2xl font-semibold mb-6">Send us a Message</h3>
            <form className="space-y-4" onSubmit={handleContactSubmit}>
              <Input id="email" name="email" type="email" placeholder="Email*" required className="bg-gray-800 border-gray-700 text-white placeholder:text-gray-400" />
              <ValidationError prefix="Email" field="email" errors={contactState.errors} className="text-sm text-red-300" />
              <textarea
                id="message"
                name="message"
                placeholder="Message*"
                required
                rows={5}
                className="w-full px-3 py-2 bg-gray-800 border border-gray-700 rounded-md text-white placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-teal-500"
              />
              <ValidationError prefix="Message" field="message" errors={contactState.errors} className="text-sm text-red-300" />
              <Button type="submit" disabled={contactState.submitting} className="w-full bg-teal-600 hover:bg-teal-700 text-white py-6">
                {contactState.submitting ? "Sending..." : "Send Message"}
              </Button>
              {contactState.succeeded ? <p className="text-sm text-teal-200">Message sent. Thank you for reaching out.</p> : null}
              <ValidationError errors={contactState.errors} className="text-sm text-red-300" />
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}
