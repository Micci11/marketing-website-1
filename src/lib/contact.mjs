const deliveryFailure = 'Your message could not be submitted. Please try again later.';

// The sender is injected so validation and provider failures can be checked without sending mail.
export async function processContactForm(formData, { from, to, send }) {
  if (!from || !to || typeof send !== 'function') {
    return { status: 503, body: 'The contact form is temporarily unavailable. Please try again later.' };
  }

  const field = (key) => {
    const value = formData.get(key);
    return typeof value === 'string' ? value.trim() : '';
  };
  const name = field('name');
  const email = field('email');
  const message = field('message');

  if (!name || !message || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return { status: 400, body: 'Please provide your name, a valid email address and a message.' };
  }

  try {
    const result = await send({
      from,
      to,
      replyTo: email,
      subject: 'New Contact Form Message from ' + name,
      html: '<h2>New Message</h2>'
        + '<p><strong>Name:</strong> ' + escapeHtml(name) + '</p>'
        + '<p><strong>Email:</strong> ' + escapeHtml(email) + '</p>'
        + '<p><strong>Message:</strong><br/>' + escapeHtml(message).replace(/\n/g, '<br/>') + '</p>',
    });
    if (result?.error || !result?.data?.id) {
      return { status: 502, body: deliveryFailure };
    }
    // A provider acceptance is not a guarantee of inbox delivery.
    return { status: 303, body: null, location: '/contact?success=true' };
  } catch {
    return { status: 500, body: deliveryFailure };
  }
}

function escapeHtml(str) {
  return str
    .replaceAll('&', '&amp;')
    .replaceAll('<', '&lt;')
    .replaceAll('>', '&gt;')
    .replaceAll('"', '&quot;')
    .replaceAll("'", '&#039;');
}
