import type { Metadata } from "next";
import Link from "next/link";
import { ShieldCheck, Clock, Mail, FileText, Globe, Lock, Server } from "lucide-react";

export const metadata: Metadata = {
    title: "Privacy Policy · Signalist",
    description:
        "How Signalist collects, uses, and protects your personal information.",
};

export default function PrivacyPage() {
    const lastUpdated = "January 1, 2026";
    const effectiveDate = "January 1, 2026";

    return (
        <main>
            <section className="border-b border-gray-800 bg-gray-900/40">
                <div className="container py-16 md:py-20">
                    <span className="marketing-eyebrow">
                        <ShieldCheck className="h-3.5 w-3.5" />
                        Legal
                    </span>
                    <h1 className="mt-4 text-4xl md:text-5xl font-bold tracking-tight text-gray-100">
                        Privacy Policy
                    </h1>
                    <p className="mt-4 text-base text-gray-400 max-w-2xl">
                        Your privacy is important to us. This policy explains what information
                        Signalist collects, how we use it, and the choices you have.
                    </p>
                    <div className="mt-6 flex flex-wrap items-center gap-3">
                        <span className="marketing-pill">
                            <Clock className="h-3.5 w-3.5 text-yellow-500" />
                            Last updated: {lastUpdated}
                        </span>
                        <span className="marketing-pill">
                            <FileText className="h-3.5 w-3.5 text-teal-400" />
                            Effective: {effectiveDate}
                        </span>
                    </div>
                </div>
            </section>

            <section className="marketing-section">
                <div className="grid gap-10 lg:grid-cols-[1fr_280px]">
                    <article className="marketing-prose">
                        <h2>1. Overview</h2>
                        <p>
                            Signalist (&ldquo;we&rdquo;, &ldquo;us&rdquo;, or &ldquo;our&rdquo;)
                            provides an AI-powered stock market intelligence platform that includes
                            real-time quotes, watchlists, alerts, news, and analytical tools (the
                            &ldquo;Service&rdquo;). This Privacy Policy describes how we collect, use,
                            disclose, and safeguard information when you visit, register for, or
                            otherwise interact with the Service.
                        </p>
                        <p>
                            By accessing or using the Service you agree to the terms of this policy.
                            If you do not agree, please discontinue use of the Service.
                        </p>

                        <h2>2. Information we collect</h2>
                        <h3>Information you provide</h3>
                        <ul>
                            <li>
                                <strong>Account information</strong> — name, email address, password
                                (hashed), and profile details when you create an account.
                            </li>
                            <li>
                                <strong>Watchlist & preferences</strong> — the tickers you follow,
                                alert thresholds, dashboard preferences, and notification settings.
                            </li>
                            <li>
                                <strong>Communications</strong> — anything you send us through support
                                channels, surveys, or feedback forms.
                            </li>
                            <li>
                                <strong>Billing information</strong> — handled by our third-party
                                payment processor; we never store full card numbers on our servers.
                            </li>
                        </ul>

                        <h3>Information collected automatically</h3>
                        <ul>
                            <li>
                                Device and connection data such as IP address, browser type, operating
                                system, and referring URLs.
                            </li>
                            <li>
                                Usage data including pages viewed, features used, click timestamps, and
                                performance metrics.
                            </li>
                            <li>
                                Approximate geolocation derived from your IP address for security and
                                content localization.
                            </li>
                        </ul>

                        <h3>Information from third parties</h3>
                        <p>
                            When you sign in through a third-party provider (e.g. Google) we receive
                            basic profile information authorized by you. Market data shown in the
                            Service is sourced from licensed providers such as Finnhub and TradingView
                            and is governed by their respective terms.
                        </p>

                        <h2>3. How we use your information</h2>
                        <ul>
                            <li>To provide, operate, and improve the Signalist Service.</li>
                            <li>To deliver price alerts, daily briefings, and notifications you opt into.</li>
                            <li>
                                To personalize your experience, including AI-generated summaries and
                                curated news.
                            </li>
                            <li>
                                To authenticate users, prevent fraud, and maintain the security of the
                                platform.
                            </li>
                            <li>
                                To respond to support requests, send service announcements, and comply
                                with legal obligations.
                            </li>
                            <li>
                                To conduct research and analytics in aggregated or de-identified form.
                            </li>
                        </ul>

                        <h2>4. Legal bases for processing (EEA / UK)</h2>
                        <p>
                            If you are located in the EEA or UK we process your personal data under the
                            following legal bases:
                        </p>
                        <ul>
                            <li>
                                <strong>Performance of a contract</strong> — to deliver the Service you
                                signed up for.
                            </li>
                            <li>
                                <strong>Legitimate interests</strong> — to secure and improve the
                                Service, provided our interests are not overridden by your rights.
                            </li>
                            <li>
                                <strong>Consent</strong> — for marketing communications and non-essential
                                cookies. You can withdraw consent at any time.
                            </li>
                            <li>
                                <strong>Legal obligation</strong> — to comply with applicable laws and
                                regulations.
                            </li>
                        </ul>

                        <h2>5. AI processing</h2>
                        <p>
                            Signalist uses third-party large language models (including OpenAI and
                            Anthropic) to generate summaries, analyses, and chat responses. When you
                            use AI features:
                        </p>
                        <ul>
                            <li>Your prompts and the data needed to answer them are sent to our model providers.</li>
                            <li>Prompts are logged for abuse monitoring and quality assurance.</li>
                            <li>
                                You can opt out of AI features at any time via your account settings,
                                though this will limit functionality.
                            </li>
                            <li>
                                We do not use your prompts to train third-party foundation models.
                            </li>
                        </ul>

                        <h2>6. Sharing of information</h2>
                        <p>
                            We do not sell your personal information. We share information only with:
                        </p>
                        <ul>
                            <li>
                                <strong>Service providers</strong> — vendors that help us run the
                                Service (hosting, email, payment processing, analytics). Each is bound
                                by confidentiality and data-protection obligations.
                            </li>
                            <li>
                                <strong>Market data partners</strong> — limited to the queries needed to
                                fulfill your requests.
                            </li>
                            <li>
                                <strong>Legal authorities</strong> — when we believe in good faith that
                                disclosure is necessary to comply with law, court order, or to protect
                                our rights or the safety of others.
                            </li>
                            <li>
                                <strong>Business transfers</strong> — in connection with a merger,
                                acquisition, or sale of assets, with appropriate notice to you.
                            </li>
                        </ul>

                        <h2>7. Cookies and similar technologies</h2>
                        <p>
                            We use first-party cookies to keep you signed in and remember preferences.
                            We use limited third-party analytics to understand how the Service is used.
                            You can manage cookie preferences through your browser settings or our
                            cookie banner.
                        </p>

                        <h2>8. Data retention</h2>
                        <p>
                            We retain personal data for as long as your account is active or as needed
                            to provide the Service. When you delete your account we will delete or
                            de-identify your personal data within 30 days, except where retention is
                            necessary for legal, tax, or audit purposes.
                        </p>

                        <h2>9. Your rights</h2>
                        <p>Depending on your jurisdiction, you have the right to:</p>
                        <ul>
                            <li>Access, correct, or delete your personal data.</li>
                            <li>Object to or restrict certain processing.</li>
                            <li>Port your data to another service.</li>
                            <li>Withdraw consent at any time.</li>
                            <li>Lodge a complaint with your local data protection authority.</li>
                        </ul>
                        <p>
                            To exercise these rights, email{" "}
                            <Link href="mailto:privacy@signalist.io">privacy@signalist.io</Link>.
                        </p>

                        <h2>10. Security</h2>
                        <p>
                            We use industry-standard measures to protect your data, including TLS in
                            transit, encryption at rest, role-based access controls, and continuous
                            monitoring. No system is perfectly secure; if you ever suspect your
                            account has been compromised, please contact us immediately.
                        </p>

                        <h2>11. Children&apos;s privacy</h2>
                        <p>
                            The Service is not directed to children under 16, and we do not knowingly
                            collect personal data from children. If we learn we have, we will delete
                            the information promptly.
                        </p>

                        <h2>12. International transfers</h2>
                        <p>
                            Signalist is operated primarily from the United States. If you are located
                            outside the US your information may be transferred to and processed in the
                            US. We rely on Standard Contractual Clauses and equivalent safeguards for
                            cross-border transfers where required.
                        </p>

                        <h2>13. Changes to this policy</h2>
                        <p>
                            We may update this Privacy Policy to reflect changes in our practices or
                            applicable law. We will post the revised policy on this page with an
                            updated &ldquo;Last updated&rdquo; date and, where appropriate, notify
                            you by email or in-product.
                        </p>

                        <h2>14. Contact us</h2>
                        <p>
                            If you have questions about this policy or our data practices, please
                            reach out to:
                        </p>
                        <ul>
                            <li>
                                <strong>Signalist, Inc.</strong>
                            </li>
                            <li>
                                Email:{" "}
                                <Link href="mailto:privacy@signalist.io">
                                    privacy@signalist.io
                                </Link>
                            </li>
                            <li>
                                Mailing address: 1 Market Street, Suite 100, San Francisco, CA 94105,
                                USA
                            </li>
                        </ul>
                    </article>

                    <aside className="space-y-6 lg:sticky lg:top-28 self-start">
                        <div className="marketing-feature-card group">
                            <div className="marketing-feature-icon">
                                <Mail className="h-6 w-6" />
                            </div>
                            <h3 className="marketing-feature-title">Privacy questions?</h3>
                            <p className="marketing-feature-desc">
                                Our privacy team replies within one business day.
                            </p>
                            <Link
                                href="mailto:privacy@signalist.io"
                                className="mt-3 inline-flex items-center gap-1.5 text-sm font-semibold text-yellow-500 hover:text-yellow-400"
                            >
                                privacy@signalist.io
                            </Link>
                        </div>

                        <div className="rounded-2xl border border-gray-800 bg-gray-800/40 p-6">
                            <h3 className="text-sm font-semibold text-gray-100 mb-3">
                                On this page
                            </h3>
                            <ol className="space-y-2 text-sm text-gray-400">
                                {[
                                    "Overview",
                                    "Information we collect",
                                    "How we use your information",
                                    "Legal bases",
                                    "AI processing",
                                    "Sharing",
                                    "Cookies",
                                    "Retention",
                                    "Your rights",
                                    "Security",
                                    "International transfers",
                                    "Contact",
                                ].map((item, i) => (
                                    <li key={item} className="flex gap-2">
                                        <span className="text-yellow-500">{i + 1}</span>
                                        <span>{item}</span>
                                    </li>
                                ))}
                            </ol>
                        </div>

                        <div className="rounded-2xl border border-gray-800 bg-gray-800/40 p-6 space-y-3 text-sm text-gray-400">
                            <div className="flex items-center gap-2">
                                <Lock className="h-4 w-4 text-yellow-500" />
                                Encrypted in transit & at rest
                            </div>
                            <div className="flex items-center gap-2">
                                <Server className="h-4 w-4 text-teal-400" />
                                Hosted on SOC 2 infrastructure
                            </div>
                            <div className="flex items-center gap-2">
                                <Globe className="h-4 w-4 text-blue-600" />
                                GDPR & CCPA aligned
                            </div>
                        </div>
                    </aside>
                </div>
            </section>
        </main>
    );
}
