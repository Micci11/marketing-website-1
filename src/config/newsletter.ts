// Public identifiers copied from the existing CraveSmart Kit form on 2026-10-21.
// This integration uses Kit's HTML embed, not an API credential.
export const newsletterEnabled = import.meta.env.PUBLIC_NEWSLETTER_ENABLED === 'true';

export const kitNewsletter = {
  formId: '9162136',
  uid: '501378dd0c',
  action: 'https://app.kit.com/forms/9162136/subscriptions',
  script: 'https://f.convertkit.com/ckjs/ck.5.js',
  poweredBy: 'https://kit.com/features/forms?utm_campaign=poweredby&utm_content=form&utm_medium=referral&utm_source=dynamic',
  options: {
    settings: {
      after_subscribe: {
        action: 'message',
        success_message: 'Check your email to confirm your subscription.',
        redirect_url: '',
      },
      analytics: { google: null, fathom: null, facebook: null, segment: null, pinterest: null, sparkloop: null, googletagmanager: null },
      powered_by: { show: true, url: 'https://kit.com/features/forms?utm_campaign=poweredby&utm_content=form&utm_medium=referral&utm_source=dynamic' },
      recaptcha: { enabled: false },
      return_visitor: { action: 'show', custom_content: '' },
    },
    version: '5',
  },
};
