// src/app/privacy/page.jsx
export const metadata = {
  title: "Privacy Policy | Caspira Solutions",
  description:
    "How Caspira Solutions collects and uses information submitted through this website.",
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

export default function PrivacyPage() {
  return (
    <main className="mx-auto w-full max-w-5xl px-6 pb-16 pt-28">
      {/* Header */}
      <header className="text-center">
        <h1 className="text-3xl font-semibold text-white/95 md:text-4xl">
          Privacy Policy
        </h1>
        <p className="mt-3 text-sm leading-relaxed text-white/70">
          This page explains how we collect and use information submitted through
          this website.
        </p>
        <p className="mt-2 text-xs text-white/50">
          Last updated: {new Date().toLocaleDateString("en-US", { year: "numeric", month: "long", day: "numeric" })}
        </p>
      </header>

      {/* Content card */}
      <div className="mx-auto mt-10 rounded-2xl border border-white/10 bg-white/5 p-6 shadow-[0_10px_40px_rgba(0,0,0,0.35)] backdrop-blur-md md:p-8">
        <Section title="Information We Collect">
          <p>
            We may collect information you submit via forms on this website, such
            as your name, email address, organization, and message content.
          </p>
          <p>
            We may also collect limited technical information (for example, IP
            address, browser type, and device information) to help maintain
            website security and performance.
          </p>
        </Section>

        <Section title="How We Use Information">
          <p>We use submitted information to:</p>
          <ul className="list-disc pl-5">
            <li>Respond to your inquiries and requests.</li>
            <li>Improve website functionality and user experience.</li>
            <li>Maintain security, prevent abuse, and troubleshoot issues.</li>
          </ul>
          <p>We do not sell personal information submitted through this website.</p>
        </Section>

        <Section title="Data Retention">
          <p>
            We retain submitted information only as long as necessary to respond
            to inquiries and to maintain appropriate internal records.
          </p>
        </Section>

        <Section title="Third-Party Services">
          <p>
            This website may use third-party services for hosting, security, and
            basic analytics. These providers may process limited technical data
            required to operate the website.
          </p>
        </Section>

        <Section title="Your Rights">
          <p>
            You may request access, correction, or deletion of information you
            submitted through this website by contacting us using the email
            below.
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
          Note: This Privacy Policy applies to this website only. For other
          platforms or services, additional terms may apply.
        </p>
      </div>
    </main>
  );
}
