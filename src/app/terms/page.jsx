// src/app/terms/page.jsx
export const metadata = {
  title: "Terms of Use | Caspira Solutions",
  description: "Guidelines for using the Caspira Solutions website and content.",
};

function Section({ title, children }) {
  return (
    <section className="mt-6">
      <h2 className="text-base font-semibold text-white/90">{title}</h2>
      <div className="mt-2 space-y-2 text-sm leading-relaxed text-white/70">
        {children}
      </div>
    </section>
  );
}

export default function TermsPage() {
  return (
    <main className="mx-auto w-full max-w-5xl px-6 pb-16 pt-28">
      {/* Header */}
      <header className="text-center">
        <h1 className="text-3xl font-semibold text-white/95 md:text-4xl">
          Terms of Use
        </h1>
        <p className="mt-3 text-sm leading-relaxed text-white/70">
          These terms outline the rules and guidelines for using this website and its
          content.
        </p>
        <p className="mt-2 text-xs text-white/50">
          Last updated: {new Date().toLocaleDateString("en-US", { year: "numeric", month: "long", day: "numeric" })}
        </p>
      </header>

      {/* Content card */}
      <div className="mx-auto mt-10 rounded-2xl border border-white/10 bg-white/5 p-6 shadow-[0_10px_40px_rgba(0,0,0,0.35)] backdrop-blur-md md:p-8">
        <Section title="Use of the Website">
          <p>
            This website is provided for general informational purposes. By using
            the site, you agree not to misuse it or attempt unauthorized access.
          </p>
        </Section>

        <Section title="Intellectual Property">
          <p>
            Unless stated otherwise, website content (including text, design,
            graphics, and layout) is owned by Caspira Solutions. You may not copy,
            reproduce, or redistribute materials without permission.
          </p>
        </Section>

        <Section title="Disclaimer">
          <p>
            Website information is provided "as is" without warranties. We do not
            guarantee the completeness or accuracy of information at all times.
          </p>
          <p>
            To the extent permitted by law, Caspira Solutions is not liable for
            damages resulting from use of, or inability to use, this website.
          </p>
        </Section>

        <Section title="External Links">
          <p>
            This website may contain links to third-party sites. Caspira Solutions
            is not responsible for third-party content or practices.
          </p>
        </Section>

        <Section title="Changes to These Terms">
          <p>
            We may update these terms periodically. Continued use of the website
            indicates acceptance of the latest version.
          </p>
        </Section>

        <Section title="Contact">
          <p>
            Email:{" "}
            <a
              className="underline decoration-white/20 underline-offset-4 hover:decoration-white/40"
              href="mailto:caspirasolutions@gmail.com"
            >
              caspirasolutions@gmail.com
            </a>
          </p>
        </Section>

        <p className="mt-8 text-xs leading-relaxed text-white/45">
          Note: If you do not agree with these terms, please discontinue use of
          this website.
        </p>
      </div>
    </main>
  );
}
