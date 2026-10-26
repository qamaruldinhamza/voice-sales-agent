/** Decorative blinking green dot that sits just outside a mic button's corner. */
export function LiveDot({ className = "" }: { className?: string }) {
  return (
    <span aria-hidden className={`pointer-events-none absolute flex size-2.5 ${className}`}>
      <span className="absolute inline-flex size-full animate-ping rounded-full bg-live opacity-75 motion-reduce:animate-none" />
      <span className="relative inline-flex size-full rounded-full bg-live" />
    </span>
  );
}
