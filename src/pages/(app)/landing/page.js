import { landingTemplate } from "./page.template";
import Layout from "../layout";

export default function LandingPage(container) {
  if (!container) return null;

  const { html, cleanUp } = Layout(container, {
    children: landingTemplate,
  });

  container.innerHTML = html;

  return () => {
    if (cleanUp) cleanUp();
  };
}
