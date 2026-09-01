import Link from "next/link";
import Image from "next/image";
import {
    ArrowRight,
    BarChart3,
    Bell,
    Brain,
    ChevronRight,
    Compass,
    FileSearch,
    Globe2,
    LineChart,
    Link2,
    Mail,
    Newspaper,
    PieChart,
    Sparkles,
    Star,
    Target,
    TrendingUp,
    Wallet,
    Zap,
} from "lucide-react";
import { auth } from "@/lib/auth/server";

const FEATURES = [
    {
        icon: LineChart,
        title: "Real-time market data",
        description:
            "Stream live quotes for thousands of stocks, ETFs, and indices with millisecond-level precision so you never miss a move.",
    },
    {
        icon: Link2,
        title: "Brokerage account integration",
        description:
            "Connect multiple brokerage accounts to track all your investments, trades, and portfolio performance in a single unified dashboard.",
    },
    {
        icon: Brain,
        title: "Sentiment AI analysis",
        description:
            "News-driven sentiment scoring and AI-powered analysis help you understand the narratives behind every price movement.",
    },
    {
        icon: Sparkles,
        title: "AI investment recommendations",
        description:
            "Ask anything in plain English. Get streaming, citation-backed insights on fundamentals, sentiment, and technicals — not financial advice, but powerful research.",
    },
    {
        icon: Bell,
        title: "Smart price alerts",
        description:
            "Set upper or lower price thresholds and let Signalist watch your watchlist so you can react the moment conditions are met.",
    },
    {
        icon: Newspaper,
        title: "News-based trading insights",
        description:
            "Personalized news digests powered by your watchlist and AI sentiment analysis, delivered the moment stories break.",
    },
    {
        icon: PieChart,
        title: "Valuations & portfolio tracking",
        description:
            "Track holdings, visualize performance across sectors, and monitor valuations — all across your connected brokerage accounts.",
    },
    {
        icon: FileSearch,
        title: "Deep company analysis",
        description:
            "Profiles, financials, technicals, and competitive context for every ticker — all in one beautifully organized view.",
    },
    {
        icon: Target,
        title: "Strategy lab & backtests",
        description:
            "Explore battle-tested trading strategies, tweak parameters, and see historical performance in seconds.",
    },
    {
        icon: Globe2,
        title: "Prediction markets",
        description:
            "Aggregate Polymarket and Kalshi alongside traditional markets to spot where consensus is forming before consensus does.",
    },
];

const STEPS = [
    {
        title: "Create your free account",
        description: "Sign up in under a minute — no credit card, no commitments, just access.",
    },
    {
        title: "Connect your brokerages",
        description: "Link your brokerage accounts via secure OAuth so Signalist can unify your portfolio.",
    },
    {
        title: "Build your watchlist & set alerts",
        description: "Add tickers, set price thresholds, and let AI surface the news and sentiment that matters.",
    },
    {
        title: "Trade with intelligence",
        description: "Get AI-powered analysis, sentiment scores, and real-time alerts to make informed decisions.",
    },
];

const STATS = [
    { value: "8,000+", label: "Tickers tracked" },
    { value: "60+", label: "Markets covered" },
    { value: "<100ms", label: "Quote latency" },
    { value: "24/7", label: "AI coverage" },
];

const TESTIMONIALS = [
    {
        quote: "Connecting my brokerage accounts gave me a complete picture of my portfolio for the first time. The sentiment alerts are a game-changer.",
        author: "Ethan R.",
        role: "Retail Investor",
    },
    {
        quote: "The AI summaries and sentiment scores save me hours every week. It's like having a junior analyst on staff that never sleeps.",
        author: "Priya S.",
        role: "Active Trader",
    },
    {
        quote: "Portfolio tracking, news sentiment, valuations, and backtests — finally in one place. I closed three other apps after switching.",
        author: "Marcus L.",
        role: "Long-term Investor",
    },
];

const FAQS = [
    {
        q: "Is Signalist really free?",
        a: "Yes. The core experience — real-time quotes, watchlists, price alerts, AI summaries, and news — is free while we're in beta. Premium add-ons are coming soon.",
    },
    {
        q: "How does brokerage integration work?",
        a: "We use secure OAuth flows to connect to your brokerage. Signalist never sees your login credentials — we only access read-only portfolio data to display your holdings and trades.",
    },
    {
        q: "Does Signalist give investment advice?",
        a: "No. We surface data, news, AI-powered analysis, and sentiment scores to help you research faster. Nothing on Signalist is a recommendation to buy or sell any security.",
    },
    {
        q: "How does the sentiment AI work?",
        a: "We aggregate news from trusted sources and apply machine-learning sentiment scoring to help you understand the narratives driving price movements. Scores are estimates, not guarantees.",
    },
    {
        q: "Can I track assets outside the US?",
        a: "Yes. Signalist supports equities, ETFs, indices, FX pairs, prediction markets, and more — across North America, Europe, and Asia.",
    },
];

export default async function HomePage() {
    const { userId } = await auth();
    const ctaHref = userId ? "/dashboard" : "/sign-up";
    const ctaLabel = userId ? "Open dashboard" : "Get started — it's free";

    return (
        <main>
            {/* Hero */}
            <section className="marketing-hero">
                <div className="marketing-grid" aria-hidden />
                <div className="marketing-hero-glow" aria-hidden />
                <div className="marketing-hero-glow-teal" aria-hidden />

                <div className="container relative pt-20 pb-24 md:pt-28 md:pb-32">
                    <div className="max-w-3xl">
                        <span className="marketing-eyebrow">
                            <Sparkles className="h-3.5 w-3.5" />
                            Now in public beta
                        </span>
                        <h1 className="mt-5 text-4xl sm:text-5xl md:text-6xl font-bold tracking-tight text-gray-100">
                            The market, decoded by{" "}
                            <span className="bg-gradient-to-r from-yellow-400 to-orange-500 bg-clip-text text-transparent">
                                AI.
                            </span>
                        </h1>
                        <p className="mt-5 text-base md:text-lg text-gray-400 max-w-2xl">
                            Track stocks with AI-powered sentiment analysis, connect multiple brokerage
                            accounts to monitor your portfolio in one place, and get intelligent
                            investment recommendations — all in one beautifully focused platform built
                            for the next generation of investors.
                        </p>

                        <div className="mt-8 flex flex-col sm:flex-row gap-3">
                            <Link href={ctaHref} className="marketing-cta">
                                {ctaLabel}
                                <ArrowRight className="h-4 w-4" />
                            </Link>
                            <Link href="#features" className="marketing-ghost">
                                Explore features
                                <ChevronRight className="h-4 w-4" />
                            </Link>
                        </div>

                        <div className="mt-8 flex flex-wrap items-center gap-3">
                            <span className="marketing-pill">
                                <Zap className="h-3.5 w-3.5 text-yellow-500" />
                                Real-time quotes
                            </span>
                            <span className="marketing-pill">
                                <Brain className="h-3.5 w-3.5 text-teal-400" />
                                Sentiment AI
                            </span>
                            <span className="marketing-pill">
                                <Link2 className="h-3.5 w-3.5 text-orange-500" />
                                Brokerage sync
                            </span>
                            <span className="marketing-pill">
                                <Mail className="h-3.5 w-3.5 text-blue-600" />
                                Smart alerts
                            </span>
                        </div>
                    </div>

                    {/* Dashboard preview */}
                    <div className="mt-14 md:mt-20 relative">
                        <div className="mx-auto max-w-5xl rounded-2xl border border-gray-800 bg-gray-800/40 p-3 shadow-2xl backdrop-blur">
                            <Image
                                src="/assets/images/dashboard.png"
                                alt="Signalist dashboard preview"
                                width={1920}
                                height={1080}
                                className="w-full h-auto rounded-xl"
                                priority
                            />
                        </div>
                    </div>
                </div>
            </section>

            {/* Stats */}
            <section className="border-y border-gray-800 bg-gray-900/40">
                <div className="container py-10 grid grid-cols-2 md:grid-cols-4 gap-4">
                    {STATS.map((s) => (
                        <div key={s.label} className="marketing-stat">
                            <div className="marketing-stat-value">{s.value}</div>
                            <div className="marketing-stat-label">{s.label}</div>
                        </div>
                    ))}
                </div>
            </section>

            {/* Features */}
            <section id="features" className="marketing-section">
                <div className="text-center max-w-2xl mx-auto">
                    <span className="marketing-eyebrow">
                        <BarChart3 className="h-3.5 w-3.5" />
                        Everything you need
                    </span>
                    <h2 className="mt-4 marketing-section-title">
                        Built for investors who want signal, not noise.
                    </h2>
                    <p className="marketing-section-subtitle mx-auto">
                        From the first quote of the day to the close, Signalist keeps you informed,
                        organized, and a step ahead with brokerage sync, sentiment AI, and smart alerts.
                    </p>
                </div>

                <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
                    {FEATURES.map(({ icon: Icon, title, description }) => (
                        <div key={title} className="marketing-feature-card group">
                            <div className="marketing-feature-icon">
                                <Icon className="h-6 w-6" />
                            </div>
                            <h3 className="marketing-feature-title">{title}</h3>
                            <p className="marketing-feature-desc">{description}</p>
                        </div>
                    ))}
                </div>
            </section>

            {/* How it works */}
            <section
                id="how-it-works"
                className="marketing-section bg-gray-900/40 border-y border-gray-800"
            >
                <div className="max-w-2xl">
                    <span className="marketing-eyebrow">
                        <Compass className="h-3.5 w-3.5" />
                        How it works
                    </span>
                    <h2 className="mt-4 marketing-section-title">
                        From sign-up to your first smart alert in minutes.
                    </h2>
                    <p className="marketing-section-subtitle">
                        Signalist is designed to get out of your way. Connect your brokerages, set your
                        preferences, and let AI handle the research.
                    </p>
                </div>

                <div className="mt-10 grid gap-5 md:grid-cols-2">
                    {STEPS.map((step, idx) => (
                        <div key={step.title} className="marketing-step">
                            <div className="marketing-step-num">{idx + 1}</div>
                            <div>
                                <h3 className="marketing-step-title">{step.title}</h3>
                                <p className="marketing-step-desc">{step.description}</p>
                            </div>
                        </div>
                    ))}
                </div>
            </section>

            {/* Testimonials */}
            <section className="marketing-section">
                <div className="text-center max-w-2xl mx-auto">
                    <span className="marketing-eyebrow">
                        <Star className="h-3.5 w-3.5" />
                        Loved by investors
                    </span>
                    <h2 className="mt-4 marketing-section-title">Trusted by thousands of traders.</h2>
                </div>

                <div className="mt-12 grid gap-5 md:grid-cols-3">
                    {TESTIMONIALS.map((t) => (
                        <div
                            key={t.author}
                            className="rounded-2xl border border-gray-800 bg-gray-800/40 p-6"
                        >
                            <div className="flex items-center gap-1 mb-4">
                                {Array.from({ length: 5 }).map((_, i) => (
                                    <Star key={i} className="h-4 w-4 fill-yellow-500 text-yellow-500" />
                                ))}
                            </div>
                            <p className="text-gray-200 leading-relaxed">“{t.quote}”</p>
                            <div className="mt-5">
                                <p className="text-sm font-semibold text-gray-100">{t.author}</p>
                                <p className="text-xs text-gray-500">{t.role}</p>
                            </div>
                        </div>
                    ))}
                </div>
            </section>

            {/* CTA */}
            <section className="marketing-section">
                <div className="relative overflow-hidden rounded-3xl border border-gray-800 bg-gradient-to-br from-gray-800/60 to-gray-900 p-10 md:p-16 text-center">
                    <div className="marketing-hero-glow" aria-hidden />
                    <TrendingUp className="mx-auto h-10 w-10 text-yellow-500" />
                    <h2 className="mt-5 text-3xl md:text-4xl font-bold text-gray-100 tracking-tight">
                        Start trading smarter with AI.
                    </h2>
                    <p className="mt-3 text-base md:text-lg text-gray-400 max-w-xl mx-auto">
                        Join Signalist for free, connect your brokerages, and turn market noise into
                        clear, actionable insight powered by sentiment AI.
                    </p>
                    <div className="mt-7 flex flex-col sm:flex-row items-center justify-center gap-3">
                        <Link href={ctaHref} className="marketing-cta">
                            {ctaLabel}
                            <ArrowRight className="h-4 w-4" />
                        </Link>
                        <Link href="/support" className="marketing-ghost">
                            Talk to our team
                        </Link>
                    </div>
                </div>
            </section>

            {/* FAQ */}
            <section id="faq" className="marketing-section border-t border-gray-800">
                <div className="max-w-2xl mx-auto text-center">
                    <span className="marketing-eyebrow">
                        <Wallet className="h-3.5 w-3.5" />
                        FAQ
                    </span>
                    <h2 className="mt-4 marketing-section-title">Frequently asked questions</h2>
                    <p className="marketing-section-subtitle mx-auto">
                        Everything you need to know before getting started.
                    </p>
                </div>

                <div className="mt-10 max-w-3xl mx-auto grid gap-4 md:grid-cols-2">
                    {FAQS.map((f) => (
                        <div key={f.q} className="marketing-faq">
                            <p className="marketing-faq-q">{f.q}</p>
                            <p className="marketing-faq-a">{f.a}</p>
                        </div>
                    ))}
                </div>
            </section>
        </main>
    );
}
