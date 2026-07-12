export const EMAILJS_CONFIG = {
    publicKey: import.meta.env.VITE_EMAILJS_PUBLIC_KEY || "Vj2DER90RQziTnUCh",
    serviceId: import.meta.env.VITE_EMAILJS_SERVICE_ID || "service_aijcenc",
    templateId: import.meta.env.VITE_EMAILJS_TEMPLATE_ID || "template_a2jw0hi",
    guestbookTemplateId: import.meta.env.VITE_EMAILJS_GUESTBOOK_TEMPLATE_ID || "template_guestbook_notification",
};

export const RATE_LIMIT_MS = 10 * 60 * 1000;

export const MIN_FILL_MS = 4_000;

const STORAGE_KEY = "contact_last_sent";

export function getRateLimitSecondsLeft(): number {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return 0;
    const elapsed = Date.now() - parseInt(raw, 10);
    const remaining = RATE_LIMIT_MS - elapsed;
    return remaining > 0 ? Math.ceil(remaining / 1000) : 0;
}

export function markSent(): void {
    localStorage.setItem(STORAGE_KEY, String(Date.now()));
}
