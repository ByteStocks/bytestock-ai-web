import Link from "next/link";
import type { Metadata } from "next";
import {
    BookOpen,
    LifeBuoy,
    Mail,
    MessageCircle,
    Phone,
    Search,
    ShieldCheck,
    Sparkles,
    Twitter,
} from "lucide-react";

export const metadata: Metadata = {
    title: "Support · Signalist",
    description:
        "Get help with Signalist. Reach our support team, browse the help center, or check system status.",
};

const CHANNELS = [
    {
        icon: Mail,
        title: "Email support",
        description: "We typically reply within one business day.",
        action: { label: "support@signalist.io", href: "mailto:support@signalist.io" },
    },
    {
        icon: MessageCircle,
        title: "Live chat",
        description: "Chat with a product specialist in real time.",
        action: { label: "Start a chat", href: "#chat" },
    },
    {
        icon: Phone,
        title: "Schedule a call",
        description: "Book a 1:1 screen-share with a product expert.",
        action: { label: "Book a time", href: "#call" },
    },
];

const HELP_CATEGORIES = [
    {
        icon: Sparkles,
        title: "Getting started",
        description: "Set up your account, build a watchlist, and place your first alert.",
        links: ["Create your account", "Add stocks to your watchlist", "Trigger your first alert"],
    },
    {
        icon: BookOpen,
        title: "Watchlists & alerts",
        description: "Master the tools that keep you ahead of the market.",
        links: [
            "How alerts work",
            "Manage your watchlist",
            "Choose the right strategy",
        ],
    },
    {
        icon: ShieldCheck,
        title: "Account & billing",
        description: "Manage your subscription, security, and notifications.",
        links: ["Reset your password", "Update your email", "Delete your account"],
    },
    {
        icon: Search,
        title: "Product & data",
        description: "Understand data sources, AI features, and integrations.",
        links: ["Where our data comes from", "About the AI analyst", "Status & uptime"],
    },
];

const FAQ = [
    {
        q: "I forgot my password — how do I reset it?",
        a: "On the sign-in page click 'Forgot password', enter your email, and we'll send you a secure reset link.",
    },
    {
        q: "Why isn't a price updating?",
        a: "Quotes stream in near real-time during market hours. Outside of trading hours prices reflect the last close and resume updating at the next market open.",
    },
    {
        q: "Can I export my watchlist?",
        a: "Yes. From your dashboard open the watchlist menu and choose 'Export to CSV'. Premium members can also export to JSON and stream via API.",
    },
    {
        q: "How do I contact a human?",
        a: "Use any of the channels above. For account or billing issues please email support@signalist.io from the email address associated with your account.",
    },
];

export default function SupportPage() {
    return (
        <main>
            <section className="border-b border-gray-800 bg-gray-900/40">
                <div className="container py-16 md:py-24">
                    <div className="max-w-3xl">
                        <span className="marketing-eyebrow">
                            <LifeBuoy className="h-3.5 w-3.5" />
                            Support center
                        </span>
                        <h1 className="mt-4 text-4xl md:text-5xl font-bold tracking-tight text-gray-100">
                            We&rsquo;re here to help.
                        </h1>
                        <p className="mt-4 text-base md:text-lg text-gray-400 max-w-2xl">
                            Find answers, browse guides, or get in touch with our team. Most questions
                            are answered in under an hour during business days.
                        </p>

                        <div className="mt-8 flex items-center gap-2 rounded-xl border border-gray-800 bg-gray-800/60 px-4 py-3 max-w-xl">
                            <Search className="h-4 w-4 text-gray-400" />
                            <input
                                type="search"
                                placeholder="Search the help center…"
                                className="w-full bg-transparent text-sm text-gray-100 placeholder:text-gray-500 outline-none"
                            />
                            <kbd className="hidden sm:inline-flex items-center rounded border border-gray-700 bg-gray-900 px-2 py-0.5 text-[11px] text-gray-400">
                                ⌘K
                            </kbd>
                        </div>
                    </div>
                </div>
            </section>

            <section className="marketing-section">
                <div className="grid gap-5 md:grid-cols-3">
                    {CHANNELS.map(({ icon: Icon, title, description, action }) => (
                        <div key={title} className="marketing-feature-card group">
                            <div className="marketing-feature-icon">
                                <Icon className="h-6 w-6" />
                            </div>
                            <h3 className="marketing-feature-title">{title}</h3>
                            <p className="marketing-feature-desc">{description}</p>
                            <Link
                                href={action.href}
                                className="mt-4 inline-flex items-center gap-1.5 text-sm font-semibold text-yellow-500 hover:text-yellow-400"
                            >
                                {action.label}
                            </Link>
                        </div>
                    ))}
                </div>
            </section>

            <section className="marketing-section border-t border-gray-800 bg-gray-900/40">
                <div className="max-w-2xl">
                    <span className="marketing-eyebrow">Help center</span>
                    <h2 className="mt-4 marketing-section-title">
                        Browse popular topics
                    </h2>
                    <p className="marketing-section-subtitle">
                        Step-by-step guides to help you get the most out of Signalist.
                    </p>
                </div>

                <div className="mt-10 grid gap-5 md:grid-cols-2">
                    {HELP_CATEGORIES.map(({ icon: Icon, title, description, links }) => (
                        <div key={title} className="rounded-2xl border border-gray-800 bg-gray-800/40 p-6">
                            <div className="flex items-center gap-3">
                                <div className="marketing-feature-icon !h-10 !w-10">
                                    <Icon className="h-5 w-5" />
                                </div>
                                <h3 className="text-lg font-semibold text-gray-100">{title}</h3>
                            </div>
                            <p className="mt-3 text-sm text-gray-400">{description}</p>
                            <ul className="mt-4 space-y-2">
                                {links.map((l) => (
                                    <li key={l}>
                                        <Link
                                            href="#"
                                            className="text-sm text-yellow-500 hover:text-yellow-400"
                                        >
                                            {l}
                                        </Link>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    ))}
                </div>
            </section>

            <section className="marketing-section">
                <div className="max-w-2xl">
                    <span className="marketing-eyebrow">FAQ</span>
                    <h2 className="mt-4 marketing-section-title">Common questions</h2>
                </div>
                <div className="mt-8 max-w-3xl grid gap-3 md:grid-cols-2">
                    {FAQ.map((f) => (
                        <div key={f.q} className="marketing-faq">
                            <p className="marketing-faq-q">{f.q}</p>
                            <p className="marketing-faq-a">{f.a}</p>
                        </div>
                    ))}
                </div>
            </section>

            <section className="marketing-section border-t border-gray-800">
                <div className="rounded-2xl border border-gray-800 bg-gradient-to-br from-gray-800/60 to-gray-900 p-8 md:p-12 flex flex-col md:flex-row items-start md:items-center gap-6 md:gap-10">
                    <div className="flex-1">
                        <h2 className="text-2xl md:text-3xl font-bold text-gray-100 tracking-tight">
                            Still need help?
                        </h2>
                        <p className="mt-2 text-gray-400">
                            Tell us what&rsquo;s going on and we&rsquo;ll get back to you as soon
                            as possible.
                        </p>
                    </div>
                    <div className="flex flex-col sm:flex-row gap-3">
                        <Link href="mailto:support@signalist.io" className="marketing-cta">
                            <Mail className="h-4 w-4" />
                            Email support
                        </Link>
                        <Link
                            href="https://twitter.com/signalist"
                            className="marketing-ghost"
                            target="_blank"
                            rel="noopener noreferrer"
                        >
                            <Twitter className="h-4 w-4" />
                            @signalist
                        </Link>
                    </div>
                </div>
            </section>
        </main>
    );
}
