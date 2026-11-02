// Layout preview only. APS account approval and integration tags are still required.
// A production build cannot enable this preview, even if the variable is set.
export const displayAdPreview =
  import.meta.env.DEV && String(import.meta.env.DISPLAY_AD_PREVIEW) === 'true';
