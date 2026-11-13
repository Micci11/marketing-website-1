import type { APIRoute } from 'astro';
import { Resend } from 'resend';
import { processContactForm } from '../../lib/contact.mjs';

export const prerender = false;

export const POST: APIRoute = async ({ request }) => {
  const apiKey = process.env.RESEND_API_KEY;
  const from = process.env.CONTACT_FROM_EMAIL;
  const to = process.env.CONTACT_TO_EMAIL;

  if (!apiKey || !from || !to) {
    return new Response('The contact form is temporarily unavailable. Please try again later.', { status: 503 });
  }

  try {
    const result = await processContactForm(await request.formData(), {
      from,
      to,
      send: (payload: Parameters<Resend['emails']['send']>[0]) => new Resend(apiKey).emails.send(payload),
    });
    return new Response(result.body, {
      status: result.status,
      headers: result.location ? { Location: result.location } : undefined,
    });
  } catch {
    return new Response('Your message could not be submitted. Please try again later.', { status: 500 });
  }
};
