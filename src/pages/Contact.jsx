import { ContactSection } from "@/components/ContactSection";
import { SiteHeader } from "@/components/SiteHeader";

export default function Contact() {
  return (
    <div className="min-h-screen bg-gray-900">
      <SiteHeader />
      <ContactSection className="min-h-screen pt-28" />
    </div>
  );
}
