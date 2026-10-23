import { AlertCircle, ArrowLeft } from "lucide-react";
import { useLocation } from "wouter";

export default function NotFound() {
  const [, setLocation] = useLocation();

  return (
    <div className="site-shell min-h-screen flex items-center justify-center p-6 bg-[var(--bg)] text-[var(--ink)]">
      <div className="w-full max-w-md p-8 rounded-2xl border border-[var(--line)] bg-[var(--surface)] shadow-[var(--shadow)] text-center">
        <div className="flex justify-center mb-6">
          <div className="grid place-items-center w-16 h-16 rounded-full bg-[var(--surface-soft)] text-amber-500">
            <AlertCircle size={32} />
          </div>
        </div>

        <h1 className="text-4xl font-bold font-display mb-2 text-[var(--ink)]">404</h1>
        <h2 className="text-lg font-semibold text-[var(--ink)] mb-3">Page Not Found</h2>
        <p className="text-sm text-[var(--muted)] mb-8 leading-relaxed">
          The page you are looking for doesn't exist or has moved.
        </p>

        <button
          onClick={() => setLocation("/")}
          className="button button-primary inline-flex items-center gap-2 cursor-pointer"
          type="button"
        >
          <ArrowLeft size={16} /> Return to Home
        </button>
      </div>
    </div>
  );
}
