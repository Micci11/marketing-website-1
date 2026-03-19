import { Resend } from 'resend';
export { renderers } from '../../renderers.mjs';

const prerender = false;
const resend = new Resend("re_aYacEbEZ_6DgfT5sJ9mUEP7At68qH23gS");
const POST = async ({ request }) => {
  try {
    const formData = await request.formData();
    const name = formData.get("name")?.toString().trim();
    const email = formData.get("email")?.toString().trim();
    const message = formData.get("message")?.toString().trim();
    if (!name || !email || !message) {
      console.error("Missing fields", { name, email, message });
      return new Response("Missing fields", { status: 400 });
    }
    console.log("Form received:", { name, email, message });
    const result = await resend.emails.send({
      from: "hello@cravesmart.recipes",
      to: "miccicurto@gmail.com",
      replyTo: email,
      subject: `New Contact Form Message from ${name}`,
      html: `
        <h2>New Message</h2>
        <p><strong>Name:</strong> ${escapeHtml(name)}</p>
        <p><strong>Email:</strong> ${escapeHtml(email)}</p>
        <p><strong>Message:</strong><br/>${escapeHtml(message).replace(/\n/g, "<br/>")}</p>
      `
    });
    console.log("Resend result:", result);
    return new Response(null, {
      status: 302,
      headers: {
        Location: "/contact?success=true"
      }
    });
  } catch (error) {
    console.error("CONTACT API ERROR:", error);
    return new Response("Error sending email", { status: 500 });
  }
};
function escapeHtml(str) {
  return str.replaceAll("&", "&amp;").replaceAll("<", "&lt;").replaceAll(">", "&gt;").replaceAll('"', "&quot;").replaceAll("'", "&#039;");
}

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  POST,
  prerender
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
