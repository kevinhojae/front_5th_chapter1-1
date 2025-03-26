import { Header, Nav, Footer } from "../../components";

export default function Layout(children) {
  return `
    <div class="bg-gray-100 min-h-screen flex justify-center">
      <div class="max-w-md w-full">
        ${Header({ title: "항해플러스" })}
        ${Nav()}
        <main class="p-4">
          ${children()}
        </main>
        ${Footer()}
      </div>
    </div>
  `;
}
