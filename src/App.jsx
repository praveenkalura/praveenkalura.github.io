import { useEffect, useState } from "react";
import "./App.css";
import Blogs from "./pages/Blogs.jsx";
import Contact from "./pages/Contact.jsx";
import MaintenancePage from "./pages/MaintenancePage.jsx";
import Portfolio from "./pages/Portfolio.jsx";
import Projects from "./pages/Projects.jsx";
import Publications from "./pages/Publications.jsx";

function getRoute() {
  const hash = window.location.hash;
  if (hash === "#/publications" || hash === "#publications") {
    return "publications";
  }

  if (hash === "#/projects" || hash === "#projects") {
    return "projects";
  }

  if (hash === "#/blogs" || hash === "#blogs") {
    return "blogs";
  }

  if (hash === "#/resources" || hash === "#resources") {
    return "resources";
  }

  if (hash === "#/events" || hash === "#events") {
    return "events";
  }

  if (hash === "#/gallery" || hash === "#gallery") {
    return "gallery";
  }

  if (hash === "#/contact" || hash === "#contact") {
    return "contact";
  }

  return "home";
}

export default function App() {
  const [route, setRoute] = useState(getRoute);

  useEffect(() => {
    const handleHashChange = () => setRoute(getRoute());

    window.addEventListener("hashchange", handleHashChange);
    return () => window.removeEventListener("hashchange", handleHashChange);
  }, []);

  return (
    <div className="App">
      {route === "publications" ? <Publications /> : null}
      {route === "projects" ? <Projects /> : null}
      {route === "blogs" ? <Blogs /> : null}
      {route === "resources" ? <MaintenancePage title="Resources" /> : null}
      {route === "events" ? <MaintenancePage title="Events" /> : null}
      {route === "gallery" ? <MaintenancePage title="Gallery" /> : null}
      {route === "contact" ? <Contact /> : null}
      {route === "home" ? <Portfolio /> : null}
    </div>
  );
}
