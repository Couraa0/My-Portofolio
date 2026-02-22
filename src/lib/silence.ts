const noop = () => { };

// Silencing specific annoying logs (e.g., from browser extensions like MetaMask)
const silencedMessages = [
    "SES Removing unpermitted intrinsics",
    "violates the following Content Security Policy directive",
    "requires a `DialogTitle`",
    "Missing `Description` or `aria-describedby`",
    "Default export is deprecated"
];

const wrapConsole = (method: keyof Console) => {
    const original = console[method] as (...args: any[]) => void;
    (console[method] as any) = (...args: any[]) => {
        const shouldHide = args.some(arg =>
            typeof arg === 'string' && silencedMessages.some(msg => arg.includes(msg))
        );
        if (!shouldHide) {
            original.apply(console, args);
        }
    };
};

// Apply filters in both dev and prod
wrapConsole('log');
wrapConsole('info');
wrapConsole('debug');

if (import.meta.env.PROD) {
    console.log = noop;
    console.info = noop;
    console.warn = noop;
    console.error = noop;
    console.debug = noop;
    console.trace = noop;
    console.group = noop;
    console.groupEnd = noop;
    console.table = noop;
}
