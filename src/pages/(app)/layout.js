import { Header } from "../../components/ui/header";
import { Nav } from "../../components/ui/nav";
import { Footer } from "../../components/ui/footer";

export default function Layout(children) {
  return `
    <div class="bg-gray-100 min-h-screen flex justify-center">
      <div class="max-w-md w-full">
        ${Header()}
        ${Nav()}
        <main class="p-4">
          ${children()}
        </main>
        ${Footer()}
      </div>
    </div>
  `;
}
