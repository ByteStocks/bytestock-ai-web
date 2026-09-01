import type { Metadata } from "next";
import Link from "next/link";
import { FileText, Clock, Mail, ShieldCheck, Globe, Lock, Server } from "lucide-react";

export const metadata: Metadata = {
    title: "Terms of Service · Signalist",
    description:
        "The terms and conditions governing your use of the Signalist platform.",
};

export default function TermsPage() {
    const lastUpdated = "January 1, 2026";
    const effectiveDate = "January 1, 2026";

    return (
        <main>
            <section className="border-b border-gray-800 bg-gray-900/40">
                <div className="container py-16 md:py-20">
                    <span className="marketing-eyebrow">
                        <FileText className="h-3.5 w-3.5" />
                        Legal
                    </span>
                    <h1 className="mt-4 text-4xl md:text-5xl font-bold tracking-tight text-gray-100">
                        Terms of Service
                    </h1>
                    <p className="mt-4 text-base text-gray-400 max-w-2xl">
                        Please read these terms carefully before using the Signalist platform.
                        By accessing or using our services you agree to be bound by these terms.
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
                        <h2>1. Acceptance of Terms</h2>
                        <p>
                            These Terms of Service (&ldquo;Terms&rdquo;) constitute a legally binding
                            agreement between you and Signalist, Inc. (&ldquo;Signalist&rdquo;,
                            &ldquo;we&rdquo;, &ldquo;us&rdquo;, or &ldquo;our&rdquo;). By creating an
                            account, accessing, or using the Signalist platform (the
                            &ldquo;Service&rdquo;), you acknowledge that you have read, understood, and
                            agree to be bound by these Terms and our{" "}
                            <Link href="/privacy">Privacy Policy</Link>.
                        </p>
                        <p>
                            If you do not agree to these Terms, you must not access or use the Service.
                        </p>

                        <h2>2. Description of Service</h2>
                        <p>
                            Signalist is an AI-powered stock market intelligence platform that provides:
                        </p>
                        <ul>
                            <li>
                                <strong>Real-time stock tracking &amp; watchlists</strong> — live quotes,
                                price alerts, and customizable watchlists across thousands of tickers.
                            </li>
                            <li>
                                <strong>Company valuations &amp; financial data</strong> — profiles,
                                financials, technical analysis, and competitive context for informed
                                research.
                            </li>
                            <li>
                                <strong>News-based trading insights</strong> — curated market news,
                                sentiment analysis, and AI-driven summaries to help you understand what
                                is moving the market.
                            </li>
                            <li>
                                <strong>AI recommendation analysis</strong> — GPT-powered analysis that
                                answers questions about fundamentals, sentiment, and technicals in plain
                                English.
                            </li>
                            <li>
                                <strong>Brokerage account integration</strong> — connect and sync
                                multiple brokerage accounts to track investments and trades in a single
                                unified dashboard.
                            </li>
                            <li>
                                <strong>Strategy lab &amp; backtests</strong> — explore trading
                                strategies, tweak parameters, and review historical performance.
                            </li>
                            <li>
                                <strong>Prediction markets</strong> — aggregate Polymarket and Kalshi
                                data alongside traditional markets.
                            </li>
                        </ul>

                        <h2>3. Eligibility</h2>
                        <p>
                            You must be at least 18 years old (or the age of majority in your
                            jurisdiction) to use the Service. By using the Service you represent and
                            warrant that you meet this requirement and have the legal capacity to enter
                            into these Terms.
                        </p>

                        <h2>4. Account Registration</h2>
                        <ul>
                            <li>
                                You must provide accurate, complete, and current information during
                                registration and keep your account information up to date.
                            </li>
                            <li>
                                You are responsible for safeguarding your password and for all activity
                                that occurs under your account.
                            </li>
                            <li>
                                You must notify us immediately at{" "}
                                <Link href="mailto:support@signalist.io">support@signalist.io</Link>{" "}
                                if you suspect unauthorized access to your account.
                            </li>
                            <li>
                                We reserve the right to suspend or terminate accounts that violate
                                these Terms.
                            </li>
                        </ul>

                        <h2>5. Brokerage Account Connections</h2>
                        <p>
                            Signalist allows you to connect third-party brokerage accounts to
                            aggregate your investment data. By connecting a brokerage account you
                            understand and agree that:
                        </p>
                        <ul>
                            <li>
                                You authorize Signalist to access your brokerage account data solely
                                for the purpose of displaying your holdings, trades, and portfolio
                                performance within the Service.
                            </li>
                            <li>
                                Signalist does not execute trades on your behalf unless you explicitly
                                initiate a transaction through a connected brokerage interface.
                            </li>
                            <li>
                                Brokerage data is provided &ldquo;as is&rdquo; and may be subject to
                                delays or inaccuracies originating from the brokerage or data provider.
                            </li>
                            <li>
                                You may disconnect your brokerage account at any time through your
                                account settings. Disconnection does not retroactively delete data
                                already processed.
                            </li>
                            <li>
                                We do not have access to your brokerage login credentials. Authentication
                                is handled through secure OAuth flows provided by the brokerage.
                            </li>
                        </ul>

                        <h2>6. Investment Data &amp; Tracking</h2>
                        <p>
                            The Service aggregates your portfolio data from connected brokerage accounts
                            and other sources you authorize. You acknowledge that:
                        </p>
                        <ul>
                            <li>
                                All investment data displayed is for informational and tracking purposes
                                only.
                            </li>
                            <li>
                                Signalist does not provide custodial services and does not hold or
                                manage your securities or funds.
                            </li>
                            <li>
                                Portfolio performance calculations are estimates and may not reflect
                                exact brokerage balances due to timing differences or data sync delays.
                            </li>
                        </ul>

                        <h2>7. AI-Powered Analysis &amp; Recommendations</h2>
                        <p>
                            Signalist uses third-party large language models to generate analyses,
                            summaries, and chat responses. You understand and agree that:
                        </p>
                        <ul>
                            <li>
                                <strong>AI outputs are not financial advice.</strong> All AI-generated
                                content is provided for informational and educational purposes only and
                                should not be construed as a recommendation to buy, sell, or hold any
                                security.
                            </li>
                            <li>
                                AI models may produce inaccurate, incomplete, or outdated information.
                                You are solely responsible for verifying any information before relying
                                on it.
                            </li>
                            <li>
                                You should consult a qualified financial advisor before making any
                                investment decisions.
                            </li>
                            <li>
                                We do not guarantee the accuracy, completeness, or timeliness of any
                                AI-generated content.
                            </li>
                        </ul>

                        <h2>8. News &amp; Sentiment Analysis</h2>
                        <p>
                            Signalist aggregates news from third-party sources and applies sentiment
                            analysis to help you understand market narratives. You acknowledge that:
                        </p>
                        <ul>
                            <li>
                                News content is sourced from third parties and may contain errors or
                                biases beyond our control.
                            </li>
                            <li>
                                Sentiment scores are algorithmically generated estimates and should not
                                be the sole basis for any trading decision.
                            </li>
                            <li>
                                We do not endorse or verify the accuracy of any news articles or
                                opinions expressed by third-party sources.
                            </li>
                        </ul>

                        <h2>9. User Responsibilities</h2>
                        <p>You agree not to:</p>
                        <ul>
                            <li>
                                Use the Service for any unlawful purpose or in violation of any
                                applicable law or regulation.
                            </li>
                            <li>
                                Attempt to gain unauthorized access to any part of the Service, other
                                user accounts, or connected systems.
                            </li>
                            <li>
                                Interfere with or disrupt the Service, servers, or networks.
                            </li>
                            <li>
                                Reverse engineer, decompile, or disassemble any aspect of the Service.
                            </li>
                            <li>
                                Use automated tools (scrapers, bots, crawlers) to access or collect
                                data from the Service without our express written permission.
                            </li>
                            <li>
                                Resell, sublicense, or redistribute any part of the Service without
                                prior written consent.
                            </li>
                            <li>
                                Impersonate any person or entity, or misrepresent your affiliation with
                                any person or entity.
                            </li>
                        </ul>

                        <h2>10. Intellectual Property</h2>
                        <p>
                            All content, features, and functionality of the Service — including but not
                            limited to text, graphics, logos, icons, images, data compilations, software,
                            and design — are the exclusive property of Signalist or its licensors and
                            are protected by United States and international copyright, trademark, and
                            other intellectual property laws.
                        </p>
                        <p>
                            You are granted a limited, non-exclusive, non-transferable license to access
                            and use the Service for personal, non-commercial purposes in accordance
                            with these Terms.
                        </p>

                        <h2>11. Disclaimer of Warranties</h2>
                        <p>
                            THE SERVICE IS PROVIDED &ldquo;AS IS&rdquo; AND &ldquo;AS AVAILABLE&rdquo;
                            WITHOUT WARRANTIES OF ANY KIND, WHETHER EXPRESS OR IMPLIED, INCLUDING BUT
                            NOT LIMITED TO IMPLIED WARRANTIES OF MERCHANTABILITY, FITNESS FOR A
                            PARTICULAR PURPOSE, AND NON-INFRINGEMENT.
                        </p>
                        <p>
                            We do not warrant that the Service will be uninterrupted, timely, secure,
                            or error-free, or that any defects will be corrected. We make no
                            representations or warranties regarding the accuracy, reliability, or
                            completeness of any content on the Service.
                        </p>

                        <h2>12. Limitation of Liability</h2>
                        <p>
                            TO THE MAXIMUM EXTENT PERMITTED BY APPLICABLE LAW, IN NO EVENT SHALL
                            SIGNALIST, ITS AFFILIATES, DIRECTORS, OFFICERS, EMPLOYEES, OR AGENTS BE
                            LIABLE FOR ANY INDIRECT, INCIDENTAL, SPECIAL, CONSEQUENTIAL, OR PUNITIVE
                            DAMAGES, INCLUDING BUT NOT LIMITED TO LOSS OF PROFITS, DATA, USE, OR
                            GOODWILL, ARISING OUT OF OR IN CONNECTION WITH YOUR USE OF THE SERVICE,
                            WHETHER BASED ON WARRANTY, CONTRACT, TORT, OR ANY OTHER LEGAL THEORY.
                        </p>
                        <p>
                            In no event shall our aggregate liability exceed the greater of (a) the
                            total amount paid by you to Signalist in the twelve (12) months preceding
                            the claim, or (b) one hundred dollars ($100).
                        </p>

                        <h2>13. Indemnification</h2>
                        <p>
                            You agree to indemnify, defend, and hold harmless Signalist and its
                            affiliates, officers, directors, employees, and agents from and against any
                            claims, liabilities, damages, losses, costs, or expenses (including
                            reasonable attorneys&rsquo; fees) arising out of or relating to your use of
                            the Service, your violation of these Terms, or your violation of any rights
                            of a third party.
                        </p>

                        <h2>14. Third-Party Services</h2>
                        <p>
                            The Service integrates with or provides links to third-party services
                            (including brokerages, data providers, and marketplaces). We are not
                            responsible for the content, policies, or practices of any third-party
                            service. Your use of third-party services is governed by their respective
                            terms and privacy policies.
                        </p>

                        <h2>15. Termination</h2>
                        <p>
                            We may suspend or terminate your access to the Service at any time, with or
                            without cause, and with or without notice. Upon termination, your right to
                            use the Service ceases immediately. We may, but are not obligated to,
                            delete your account data following termination.
                        </p>
                        <p>
                            You may terminate your account at any time by contacting us at{" "}
                            <Link href="mailto:support@signalist.io">support@signalist.io</Link> or
                            through your account settings.
                        </p>

                        <h2>16. Governing Law &amp; Dispute Resolution</h2>
                        <p>
                            These Terms are governed by the laws of the State of California, United
                            States, without regard to its conflict-of-law principles. Any disputes
                            arising out of or relating to these Terms or the Service shall be resolved
                            through binding arbitration administered by the American Arbitration
                            Association under its Commercial Arbitration Rules, conducted in San
                            Francisco, California.
                        </p>

                        <h2>17. Changes to These Terms</h2>
                        <p>
                            We reserve the right to modify these Terms at any time. We will post the
                            revised Terms on this page with an updated &ldquo;Last updated&rdquo; date.
                            Material changes will be communicated via email or in-product notification.
                            Your continued use of the Service after any changes constitutes acceptance
                            of the revised Terms.
                        </p>

                        <h2>18. Contact Us</h2>
                        <p>
                            If you have questions about these Terms, please contact us:
                        </p>
                        <ul>
                            <li>
                                <strong>Signalist, Inc.</strong>
                            </li>
                            <li>
                                Email:{" "}
                                <Link href="mailto:legal@signalist.io">
                                    legal@signalist.io
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
                            <h3 className="marketing-feature-title">Questions about these terms?</h3>
                            <p className="marketing-feature-desc">
                                Our legal team responds within two business days.
                            </p>
                            <Link
                                href="mailto:legal@signalist.io"
                                className="mt-3 inline-flex items-center gap-1.5 text-sm font-semibold text-yellow-500 hover:text-yellow-400"
                            >
                                legal@signalist.io
                            </Link>
                        </div>

                        <div className="rounded-2xl border border-gray-800 bg-gray-800/40 p-6">
                            <h3 className="text-sm font-semibold text-gray-100 mb-3">
                                On this page
                            </h3>
                            <ol className="space-y-2 text-sm text-gray-400">
                                {[
                                    "Acceptance of Terms",
                                    "Description of Service",
                                    "Eligibility",
                                    "Account Registration",
                                    "Brokerage Connections",
                                    "Investment Data",
                                    "AI Analysis",
                                    "News & Sentiment",
                                    "User Responsibilities",
                                    "Intellectual Property",
                                    "Disclaimers",
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
                                Encrypted in transit &amp; at rest
                            </div>
                            <div className="flex items-center gap-2">
                                <Server className="h-4 w-4 text-teal-400" />
                                Hosted on SOC 2 infrastructure
                            </div>
                            <div className="flex items-center gap-2">
                                <Globe className="h-4 w-4 text-blue-600" />
                                GDPR &amp; CCPA aligned
                            </div>
                        </div>
                    </aside>
                </div>
            </section>
        </main>
    );
}
