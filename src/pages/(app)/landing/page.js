import { landingTemplate } from "./page.template";

export default function LandingPage(container) {
  if (!container) return null;

  container.innerHTML = landingTemplate();
}
