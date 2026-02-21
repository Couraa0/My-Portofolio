export const EMAILJS_CONFIG = {
    publicKey: "Vj2DER90RQziTnUCh",
    serviceId: "service_aijcenc",
    templateId: "template_a2jw0hi",
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
