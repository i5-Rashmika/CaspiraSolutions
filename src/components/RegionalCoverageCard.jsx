// Drop-in component: replace the Google Maps iframe block with this card.
// Tailwind-only styling, no global CSS changes.

import React from "react";

export default function RegionalCoverageCard() {
  return (
    <section
      aria-label="Regional coverage"
      className="w-full rounded-2xl p-6 shadow-[0_10px_40px_rgba(0,0,0,0.35)] glass-card-strong gradient-border"
    >
      {/* Title */}
      <h3 className="text-lg font-semibold text-white/90">Regional Coverage</h3>

      {/* Intro */}
      <p className="mt-2 text-sm leading-relaxed text-white/70">
        We support organizations across multiple regions through structured digital systems and
        remote collaboration.
      </p>

      {/* Divider */}
      <div className="my-5 h-px w-full bg-white/10" />

      {/* Coverage regions */}
      <div>
        <p className="text-xs font-semibold uppercase tracking-wider text-white/50">
          Coverage regions
        </p>
        <ul className="mt-3 space-y-2 text-sm text-white/75">
          <li className="flex items-start gap-2">
            <span className="mt-1 inline-block h-1.5 w-1.5 rounded-full bg-white/40" />
            <span>Asia-Pacific</span>
          </li>
          <li className="flex items-start gap-2">
            <span className="mt-1 inline-block h-1.5 w-1.5 rounded-full bg-white/40" />
            <span>Europe</span>
          </li>
          <li className="flex items-start gap-2">
            <span className="mt-1 inline-block h-1.5 w-1.5 rounded-full bg-white/40" />
            <span>Middle East</span>
          </li>
        </ul>
      </div>

      {/* Support model */}
      <div className="mt-6">
        <p className="text-xs font-semibold uppercase tracking-wider text-white/50">
          Support model
        </p>
        <div className="mt-3 flex flex-wrap gap-2">
          <span className="rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs text-white/70">
            Remote-first
          </span>
          <span className="rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs text-white/70">
            System-based
          </span>
          <span className="rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs text-white/70">
            Asynchronous collaboration
          </span>
        </div>
      </div>

      {/* Languages */}
      <div className="mt-6">
        <p className="text-xs font-semibold uppercase tracking-wider text-white/50">
          Languages supported
        </p>
        <p className="mt-3 text-sm text-white/75">
          English · Armenian · Hindi · Russian
        </p>
      </div>

      {/* Response time */}
      <div className="mt-6">
        <p className="text-xs font-semibold uppercase tracking-wider text-white/50">
          Typical response time
        </p>
        <p className="mt-3 text-sm text-white/75">1–2 business days</p>
      </div>

      {/* Optional compliance note */}
      <p className="mt-6 text-[11px] leading-relaxed text-white/40">
        Coverage information shown for service scope reference only.
      </p>
    </section>
  );
}
