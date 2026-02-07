"use client";

// Enterprise-safe footer (aligned with Caspira Solutions brand language)
// No "Products/Services" lists, no pricing, no growth claims, no sensitive keywords
// Tailwind-only, drop-in replacement

import React from "react";

export default function Footer({
  email = "caspirasolutions@gmail.com",
  linkedinUrl = "https://www.linkedin.com/",
  showPhone = false,
  phone = "",
}) {
  const year = new Date().getFullYear();

  return (
    <footer className="w-full border-t border-white/10 bg-black/20 mt-20">
      <div className="mx-auto max-w-6xl px-6 py-12">
        <div className="grid gap-10 md:grid-cols-3">
          {/* Brand */}
          <div>
            <div className="flex items-center gap-3">
              <div>
                <p className="text-base font-semibold text-white/90">
                  Caspira Solutions
                </p>
                <p className="text-xs text-white/50">
                  Structured digital systems & interfaces
                </p>
              </div>
            </div>

            <p className="mt-4 max-w-sm text-sm leading-relaxed text-white/70">
              Designing structured digital systems and interfaces to support modern
              organizations across workflows, operations, and user support.
            </p>

            {/* Social (LinkedIn only for enterprise tone) */}
            <div className="mt-5 flex items-center gap-3">
              <a
                href={linkedinUrl}
                target="_blank"
                rel="noreferrer"
                className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-white/10 bg-white/5 text-white/70 transition hover:border-white/20 hover:bg-white/10 hover:text-white"
                aria-label="LinkedIn"
                title="LinkedIn"
              >
                <svg
                  width="18"
                  height="18"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                  aria-hidden="true"
                >
                  <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.063 2.063 0 114.126 0 2.062 2.062 0 01-2.063 2.065zM6.814 20.452H3.86V9h2.954v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0z" />
                </svg>
              </a>
            </div>
          </div>

          {/* Contact */}
          <div>
            <p className="text-sm font-semibold text-white/85">Contact</p>

            <div className="mt-4 space-y-3 text-sm text-white/70">
              <div className="flex items-start gap-2">
                <span className="mt-0.5 text-white/50" aria-hidden="true">✉</span>
                <a
                  href={`mailto:${email}`}
                  className="underline decoration-white/20 underline-offset-4 hover:decoration-white/40"
                >
                  {email}
                </a>
              </div>

              {showPhone && phone ? (
                <div className="flex items-start gap-2">
                  <span className="mt-0.5 text-white/50" aria-hidden="true">☎</span>
                  <a
                    href={`tel:${phone.replace(/\s+/g, "")}`}
                    className="underline decoration-white/20 underline-offset-4 hover:decoration-white/40"
                  >
                    {phone}
                  </a>
                </div>
              ) : null}

              <div className="flex items-start gap-2">
                <span className="mt-0.5 text-white/50" aria-hidden="true">⏱</span>
                <span>Typical response time: 1–2 business days</span>
              </div>
            </div>

            <p className="mt-5 text-xs leading-relaxed text-white/45">
              Information submitted will be used solely to respond to your inquiry.
            </p>
          </div>

          {/* Quick Links (anchors match page section ids) */}
          <div>
            <p className="text-sm font-semibold text-white/85">Quick Links</p>

            <ul className="mt-4 space-y-3 text-sm text-white/70">
              <li>
                <a className="hover:text-white transition-colors" href="#our-services">
                  Services
                </a>
              </li>
              <li>
                <a className="hover:text-white transition-colors" href="#our-solutions">
                  Solutions
                </a>
              </li>
              <li>
                <a className="hover:text-white transition-colors" href="#selected-projects">
                  Selected Projects
                </a>
              </li>
              <li>
                <a className="hover:text-white transition-colors" href="#contact">
                  Contact
                </a>
              </li>
            </ul>

            <p className="mt-6 text-xs text-white/45">
              Coverage information shown for service scope reference only.
            </p>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="mt-10 flex flex-col gap-3 border-t border-white/10 pt-6 md:flex-row md:items-center md:justify-between">
          <p className="text-xs text-white/45">
            © {year} Caspira Solutions. All rights reserved.
          </p>

          <div className="flex flex-wrap gap-x-4 gap-y-2 text-xs text-white/45">
            <a href="/privacy" className="hover:text-white/70 transition-colors">
              Privacy
            </a>
            <a href="/terms" className="hover:text-white/70 transition-colors">
              Terms
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
