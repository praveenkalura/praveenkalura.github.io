import { useEffect, useRef, useState } from "react";
import { useForm, ValidationError } from "@formspree/react";
import { Building2, Mail, Phone, Briefcase } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { profileData } from "@/data/content";

const CLUSTRMAPS_TOKEN = "xY28SGOT595prFPSJIsPB4d8Gt7IcYY-M1EmIHRxrlE";
const CLUSTRMAPS_SITE_URL = "https://clustrmaps.com/site/1c9nz";
const CLUSTRMAPS_GLOBE_URL = `https://clustrmaps.com/globe.js?d=${CLUSTRMAPS_TOKEN}&w=220`;
const CLUSTRMAPS_FALLBACK_IMAGE = `https://clustrmaps.com/map_v2.png?d=${CLUSTRMAPS_TOKEN}&cl=ffffff&w=220`;

const socialPlatforms = [
  { key: "linkedin", label: "LinkedIn", iconUrl: "https://www.linkedin.com/favicon.ico" },
  { key: "bluesky", label: "Bluesky", icon: "bluesky" },
  { key: "x", label: "X", icon: "x" },
  { key: "github", label: "GitHub", icon: "github" },
  { key: "medium", label: "Medium", icon: "medium" },
  { key: "scholar", label: "Google Scholar", icon: "googlescholar" },
  { key: "researchgate", label: "ResearchGate", icon: "researchgate" },
  { key: "orcid", label: "ORCID", icon: "orcid" },
];

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
  const emails = [profileData.email].filter(Boolean);
  const socialProfiles = socialPlatforms
    .map((platform) => ({
      ...platform,
      url: profileData.socialLinks?.[platform.key],
      handle: profileData.socialHandles?.[platform.key],
    }))
    .filter((platform) => platform.url);

  return (
    <section id="contact" className={`bg-gray-900 px-4 py-14 text-white sm:px-6 lg:px-8 lg:py-16 ${className}`}>
      <div className="mx-auto max-w-7xl">
        <h2 className="mb-12 text-center text-3xl font-bold sm:text-4xl">Contact Details</h2>
        <div className="mb-12">
          <p className="mb-4 text-sm font-semibold uppercase tracking-wide text-gray-400">Social and Academic Profiles</p>
          <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
            {socialProfiles.map((platform) => (
                <a
                  key={platform.key}
                  href={platform.url}
                  target="_blank"
                  rel="noreferrer"
                  className="flex items-center gap-3 rounded-2xl border border-white/10 bg-white/5 p-4 transition-colors hover:border-teal-400/40 hover:bg-white/10"
                >
                      <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl bg-white p-2">
                        <img
                          src={platform.iconUrl ?? `https://cdn.simpleicons.org/${platform.icon}`}
                          alt={`${platform.label} logo`}
                          className="h-6 w-6 object-contain"
                        />
                  </div>
                  <div className="min-w-0">
                    <p className="text-sm font-semibold text-white">{platform.label}</p>
                    <p className="truncate text-sm text-gray-300">{platform.handle ?? platform.url}</p>
                  </div>
                </a>
            ))}
          </div>
        </div>
        <div className="grid gap-8 lg:grid-cols-3 lg:items-stretch">
          <div className="rounded-3xl border border-white/10 bg-white/5 p-5 sm:p-6 lg:h-full">
            <h3 className="mb-4 text-xl font-semibold sm:text-2xl">Get in Touch</h3>
            <p className="mb-4 font-semibold text-white">{profileData.name}</p>

            <div className="space-y-3">
              <div className="rounded-2xl border border-white/10 bg-gray-950/20 p-3.5">
                <div className="flex items-start gap-3">
                  <Briefcase className="mt-0.5 h-5 w-5 text-teal-300" />
                  <div>
                    <p className="text-sm font-semibold text-white">Current Role</p>
                    <p className="mt-0.5 text-sm leading-5 text-gray-300">{profileData.role}</p>
                  </div>
                </div>
              </div>

              <div className="rounded-2xl border border-white/10 bg-gray-950/20 p-3.5">
                <div className="flex items-start gap-3">
                  <Building2 className="mt-0.5 h-5 w-5 text-teal-300" />
                  <div>
                    <p className="text-sm font-semibold text-white">Affiliation</p>
                    <div className="mt-0.5 space-y-0.5 text-sm leading-5 text-gray-300">
                      {profileData.affiliation.map((line) => (
                        <p key={line}>{line}</p>
                      ))}
                    </div>
                  </div>
                </div>
              </div>

              {emails.map((email) => (
                <div key={email} className="rounded-2xl border border-white/10 bg-gray-950/20 p-3.5">
                  <p className="flex items-center gap-3 text-sm text-gray-200">
                    <Mail className="h-5 w-5 text-teal-300" />
                    <a href={`mailto:${email}`} className="hover:text-teal-400 transition-colors">
                      {email}
                    </a>
                  </p>
                </div>
              ))}

              <div className="rounded-2xl border border-white/10 bg-gray-950/20 p-3.5">
                <p className="flex items-center gap-3 text-sm text-gray-200">
                  <Phone className="h-5 w-5 text-teal-300" />
                  <a href={`tel:${profileData.phone}`} className="hover:text-teal-400 transition-colors">
                    {profileData.phone}
                  </a>
                </p>
              </div>
            </div>
          </div>

          <div className="rounded-3xl border border-white/10 bg-white/5 p-6 sm:p-7 lg:h-full">
            <h3 className="mb-6 text-xl font-semibold sm:text-2xl">Send Me a Message</h3>
            <form className="flex h-full flex-col space-y-4" onSubmit={handleContactSubmit}>
              <Input id="email" name="email" type="email" placeholder="Email*" required className="bg-gray-800 border-gray-700 text-white placeholder:text-gray-400" />
              <ValidationError prefix="Email" field="email" errors={contactState.errors} className="text-sm text-red-300" />
              <textarea
                id="message"
                name="message"
                placeholder="Message*"
                required
                rows={8}
                className="min-h-[240px] w-full flex-1 rounded-md border border-gray-700 bg-gray-800 px-3 py-2 text-white placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-teal-500"
              />
              <ValidationError prefix="Message" field="message" errors={contactState.errors} className="text-sm text-red-300" />
              <Button type="submit" disabled={contactState.submitting} className="w-full bg-teal-600 py-6 text-white hover:bg-teal-700">
                {contactState.submitting ? "Sending..." : "Send Message"}
              </Button>
              {contactState.succeeded ? <p className="text-sm text-teal-200">Message sent. Thank you for reaching out to me.</p> : null}
              <ValidationError errors={contactState.errors} className="text-sm text-red-300" />
            </form>
          </div>

          <div className="rounded-3xl border border-white/10 bg-white/5 p-6 sm:p-7 lg:h-full">
            <p className="mb-3 text-sm font-semibold uppercase tracking-wide text-gray-400">Site Visitors</p>
            <div className="flex h-full flex-col items-start">
              <ClustrMapsGlobe />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
