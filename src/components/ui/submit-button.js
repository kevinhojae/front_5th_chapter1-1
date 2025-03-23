export function SubmitButton({ label }) {
  return `
    <button
      type="submit"
      role="link"
      class="w-full bg-blue-600 text-white p-2 rounded font-bold"
    >${label}</button>
  `;
}
