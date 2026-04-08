import { useEffect, useRef, useState } from "react";
import { useForm, ValidationError } from "@formspree/react";
import { BookOpen, FileText, Github, Linkedin, Mail, Phone } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { profileData } from "@/data/content";

const CLUSTRMAPS_TOKEN = "xY28SGOT595prFPSJIsPB4d8Gt7IcYY-M1EmIHRxrlE";
const CLUSTRMAPS_SITE_URL = "https://clustrmaps.com/site/1c9nz";
const CLUSTRMAPS_GLOBE_URL = `https://clustrmaps.com/globe.js?d=${CLUSTRMAPS_TOKEN}&w=220`;
const CLUSTRMAPS_FALLBACK_IMAGE = `https://clustrmaps.com/map_v2.png?d=${CLUSTRMAPS_TOKEN}&cl=ffffff&w=220`;

function ClustrMapsGlobe() {
  const containerRef = useRef(null);
  const [visitorCount, setVisitorCount] = useState("Loading visitors...");
  const [showFallback, setShowFallback] = useState(false);

  useEffect(() => {
    const container = containerRef.current;
    const timers = [];
    let attempts = 0;

    if (!container) {
      return undefined;
    }

    const updateVisitorCount = () => {
      const count = Array.from(container.querySelectorAll(".tooltiper[title]")).reduce((total, element) => {
        const match = element.getAttribute("title")?.match(/^(\d+)\s+(?:recent\s+)?visits?/i);
        return total + (match ? Number(match[1]) : 0);
      }, 0);

      if (count > 0) {
        setVisitorCount(`${count.toLocaleString("en-IN")} visitors`);
      }
    };

    setShowFallback(false);
    setVisitorCount("Loading visitors...");

    document.querySelectorAll("#clstr_a, .clstrm_outer").forEach((element) => {
      if (!container.contains(element)) {
        element.remove();
      }
    });

    const forceGlobeVisible = () => {
      const globe = container.querySelector(".clstrm_globe");

      if (!globe) {
        return false;
      }

      container.querySelectorAll(".clstrm_outer").forEach((element) => {
        element.style.setProperty("display", "block", "important");
        element.style.setProperty("width", "220px", "important");
        element.style.setProperty("overflow", "visible", "important");
      });

      container.querySelectorAll(".clstrm_inner").forEach((element) => {
        element.style.setProperty("display", "block", "important");
        element.style.setProperty("visibility", "visible", "important");
      });

      container.querySelectorAll(".clstrm_globe").forEach((element) => {
        element.classList.remove("velocity-animating");
        element.style.setProperty("opacity", "1", "important");
        element.style.setProperty("visibility", "visible", "important");
        element.style.setProperty("transform", "scale(1)", "important");
        element.style.setProperty("-webkit-transform", "scale(1)", "important");
      });

      updateVisitorCount();
      setShowFallback(false);
      return true;
    };

    const revealGlobe = () => {
      const globe = container.querySelector(".clstrm_outer");
      const clustrMapsJquery = window.clustrm_jq;

      if (!globe) {
        attempts += 1;

        if (attempts < 24) {
          timers.push(window.setTimeout(revealGlobe, 250));
        } else {
          setShowFallback(true);
          setVisitorCount("Visitor count unavailable");
        }

        return;
      }

      if (clustrMapsJquery) {
        clustrMapsJquery(window).triggerHandler("load");
      }

      forceGlobeVisible();
      updateVisitorCount();
      timers.push(window.setTimeout(forceGlobeVisible, 1000));
      timers.push(window.setTimeout(forceGlobeVisible, 2000));
      timers.push(window.setTimeout(forceGlobeVisible, 4000));
    };

    const observer = new MutationObserver(() => {
      updateVisitorCount();
      forceGlobeVisible();
    });

    observer.observe(container, { attributeFilter: ["title"], attributes: true, childList: true, subtree: true });

    const script = document.createElement("script");
    script.type = "text/javascript";
    script.id = "clstr_globe";
    script.src = CLUSTRMAPS_GLOBE_URL;
    script.onload = () => {
      timers.push(window.setTimeout(revealGlobe, 500));
    };
    script.onerror = () => {
      setShowFallback(true);
      setVisitorCount("Visitor count unavailable");
    };

    container.appendChild(script);

    return () => {
      timers.forEach((timer) => window.clearTimeout(timer));
      observer.disconnect();
      container.replaceChildren();
    };
  }, []);

  return (
    <div className="w-[244px] max-w-full">
      <div className="relative min-h-[258px] w-[244px] max-w-full overflow-visible rounded-md bg-gray-800 p-3">
        <div ref={containerRef} className="h-[238px] w-[220px] max-w-full overflow-visible" />
        {showFallback ? (
          <a href={CLUSTRMAPS_SITE_URL} target="_blank" rel="noreferrer" className="absolute inset-3 block">
            <img src={CLUSTRMAPS_FALLBACK_IMAGE} alt="Site visitor map" className="h-auto w-[220px] max-w-full rounded" />
          </a>
        ) : null}
      </div>
      <p className="mt-3 text-xs font-semibold uppercase tracking-wide text-gray-400">{visitorCount}</p>
    </div>
  );
}

export function ContactSection({ className = "" }) {
  const [contactState, handleContactSubmit] = useForm("mnjordoz");
  const emails = [profileData.email, profileData.alternateEmail].filter(Boolean);

  return (
    <section id="contact" className={`bg-gray-900 px-4 py-14 text-white sm:px-6 lg:px-8 lg:py-16 ${className}`}>
      <div className="mx-auto max-w-7xl">
        <h2 className="mb-12 text-center text-3xl font-bold sm:text-4xl">Contact Details</h2>
        <div className="grid gap-10 lg:grid-cols-[244px_minmax(0,1fr)_minmax(0,1.2fr)] lg:items-start lg:gap-14 xl:gap-20">
          <div>
            <p className="mb-3 text-sm font-semibold uppercase tracking-wide text-gray-400">Site Visitors</p>
            <ClustrMapsGlobe />
          </div>

          <div>
            <h3 className="mb-6 text-xl font-semibold sm:text-2xl">Address</h3>
            <div className="space-y-4 break-words text-gray-300">
              <p className="font-semibold text-white">{profileData.name}</p>
              {profileData.address.map((line) => (
                <p key={line}>{line}</p>
              ))}
              <div className="space-y-2 pt-6">
                {emails.map((email) => (
                  <p key={email}>
                    <Mail className="inline w-5 h-5 mr-2" />
                    <a href={`mailto:${email}`} className="hover:text-teal-400 transition-colors">
                      {email}
                    </a>
                  </p>
                ))}
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
