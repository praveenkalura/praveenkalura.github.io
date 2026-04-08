import { useEffect, useRef } from "react";
import { useForm, ValidationError } from "@formspree/react";
import { BookOpen, FileText, Github, Linkedin, Mail, Phone } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { profileData } from "@/data/content";

function ClustrMapsGlobe() {
  const containerRef = useRef(null);

  useEffect(() => {
    const container = containerRef.current;
    const timers = [];
    let attempts = 0;

    if (!container) {
      return undefined;
    }

    document.querySelectorAll("#clstr_a, .clstrm_outer").forEach((element) => {
      if (!container.contains(element)) {
        element.remove();
      }
    });

    const forceGlobeVisible = () => {
      container.querySelectorAll(".clstrm_inner").forEach((element) => {
        element.style.setProperty("display", "block", "important");
      });

      container.querySelectorAll(".clstrm_globe").forEach((element) => {
        element.classList.remove("velocity-animating");
        element.style.setProperty("opacity", "1", "important");
        element.style.setProperty("visibility", "visible", "important");
        element.style.setProperty("transform", "scale(1)", "important");
      });
    };

    const revealGlobe = () => {
      const globe = container.querySelector(".clstrm_outer");
      const clustrMapsJquery = window.clustrm_jq;

      if (!globe) {
        attempts += 1;

        if (attempts < 24) {
          timers.push(window.setTimeout(revealGlobe, 250));
        }

        return;
      }

      if (clustrMapsJquery) {
        clustrMapsJquery(window).triggerHandler("load");
      }

      forceGlobeVisible();
      timers.push(window.setTimeout(forceGlobeVisible, 1000));
      timers.push(window.setTimeout(forceGlobeVisible, 2000));
      timers.push(window.setTimeout(forceGlobeVisible, 4000));
    };

    const script = document.createElement("script");
    script.type = "text/javascript";
    script.id = "clstr_globe";
    script.src = "https://clustrmaps.com/globe.js?d=xY28SGOT595prFPSJIsPB4d8Gt7IcYY-M1EmIHRxrlE&w=220";
    script.onload = () => {
      timers.push(window.setTimeout(revealGlobe, 500));
    };

    container.appendChild(script);

    return () => {
      timers.forEach((timer) => window.clearTimeout(timer));
      container.replaceChildren();
    };
  }, []);

  return <div ref={containerRef} className="block w-[220px] max-w-full rounded-md bg-gray-800 p-3" />;
}

export function ContactSection({ className = "" }) {
  const [contactState, handleContactSubmit] = useForm("mnjordoz");

  return (
    <section id="contact" className={`bg-gray-900 px-4 py-16 text-white sm:px-6 lg:px-8 lg:py-20 ${className}`}>
      <div className="max-w-4xl mx-auto">
        <h2 className="mb-4 text-center text-3xl font-bold sm:text-4xl">Contact Details</h2>
        <p className="mb-10 text-center text-base text-gray-300 sm:mb-12 sm:text-xl">We'd love to hear from you!</p>
        <div className="grid gap-10 md:grid-cols-2 md:gap-12">
          <div>
            <h3 className="mb-6 text-xl font-semibold sm:text-2xl">Address</h3>
            <div className="space-y-4 break-words text-gray-300">
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
              <div className="flex flex-wrap gap-3 pt-6 sm:gap-4">
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
                <ClustrMapsGlobe />
              </div>
            </div>
          </div>

          <div>
            <h3 className="mb-6 text-xl font-semibold sm:text-2xl">Send us a Message</h3>
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
