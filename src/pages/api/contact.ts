import type { APIRoute } from 'astro';
import { Resend } from 'resend';

export const prerender = false;

const resend = new Resend(import.meta.env.RESEND_API_KEY);

export const POST: APIRoute = async ({ request }) => {
  try {
    const formData = await request.formData();

    const name = formData.get('name')?.toString().trim();
    const email = formData.get('email')?.toString().trim();
    const message = formData.get('message')?.toString().trim();

    if (!name || !email || !message) {
      console.error('Missing fields', { name, email, message });
      return new Response('Missing fields', { status: 400 });
    }

    console.log('Form received:', { name, email, message });

    const result = await resend.emails.send({
      from: import.meta.env.CONTACT_FROM_EMAIL,
      to: import.meta.env.CONTACT_TO_EMAIL,
      replyTo: email,
      subject: `New Contact Form Message from ${name}`,
      html: `
        <h2>New Message</h2>
        <p><strong>Name:</strong> ${escapeHtml(name)}</p>
        <p><strong>Email:</strong> ${escapeHtml(email)}</p>
        <p><strong>Message:</strong><br/>${escapeHtml(message).replace(/\n/g, '<br/>')}</p>
      `,
    });

    console.log('Resend result:', result);

    return new Response(null, {
      status: 302,
      headers: {
        Location: '/contact?success=true',
      },
    });
  } catch (error) {
    console.error('CONTACT API ERROR:', error);
    return new Response('Error sending email', { status: 500 });
  }
};

function escapeHtml(str: string) {
  return str
    .replaceAll('&', '&amp;')
    .replaceAll('<', '&lt;')
    .replaceAll('>', '&gt;')
    .replaceAll('"', '&quot;')
    .replaceAll("'", '&#039;');
}