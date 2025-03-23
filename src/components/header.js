export function Header(title = "항해플러스") {
  return `
    <header class="bg-blue-600 text-white p-4 sticky top-0">
      <h1 class="text-2xl font-bold">${title}</h1>
    </header>
  `;
}
