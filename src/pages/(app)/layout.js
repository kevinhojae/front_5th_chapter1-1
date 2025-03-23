import { Header } from "../../components/header";
import { Nav } from "../../components/nav";
import { Footer } from "../../components/footer";

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
