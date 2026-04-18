import { useEffect, useState } from "react";
import "./App.css";
import Apps from "./pages/Apps.jsx";
import Background from "./pages/Education.jsx";
import Blogs from "./pages/Blogs.jsx";
import Contact from "./pages/Contact.jsx";
import Events from "./pages/Events.jsx";
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

  if (hash === "#/background" || hash === "#background" || hash === "#/education" || hash === "#education") {
    return "background";
  }

  if (hash === "#/apps" || hash === "#apps" || hash === "#/resources" || hash === "#resources") {
    return "apps";
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
      {route === "background" ? <Background /> : null}
      {route === "publications" ? <Publications /> : null}
      {route === "projects" ? <Projects /> : null}
      {route === "blogs" ? <Blogs /> : null}
      {route === "apps" ? <Apps /> : null}
      {route === "events" ? <Events /> : null}
      {route === "gallery" ? <MaintenancePage title="Gallery" /> : null}
      {route === "contact" ? <Contact /> : null}
      {route === "home" ? <Portfolio /> : null}
    </div>
  );
}
