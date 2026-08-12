import Link from "next/link";
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
import { auth } from "@clerk/nextjs/server";

const FEATURES = [
    {
        icon: LineChart,
        title: "Real-time market data",
        description:
            "Stream live quotes for thousands of stocks, ETFs, and indices with millisecond-level precision so you never miss a move.",
    },
    {
        icon: Brain,
        title: "AI market analyst",
        description:
            "Ask anything in plain English. Get streaming, citation-backed insights on fundamentals, sentiment, and technicals.",
    },
    {
        icon: Bell,
        title: "Smart price alerts",
        description:
            "Set upper or lower price thresholds and let Signalist watch your watchlist so you can react the moment conditions are met.",
    },
    {
        icon: Newspaper,
        title: "Curated market news",
        description:
            "Personalized news digests powered by your watchlist and the broader market, delivered the moment stories break.",
    },
    {
        icon: FileSearch,
        title: "Deep company analysis",
        description:
            "Profiles, financials, technicals, and competitive context for every ticker — all in one beautifully organized view.",
    },
    {
        icon: PieChart,
        title: "Watchlist that thinks",
        description:
            "Track holdings, set targets, and visualize performance across sectors and themes in a clean unified dashboard.",
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
    {
        icon: Mail,
        title: "Daily briefings in your inbox",
        description:
            "Wake up to a personalized morning brief covering your watchlist, top movers, and AI-curated headlines.",
    },
];

const STEPS = [
    {
        title: "Create your free account",
        description: "Sign up in under a minute — no credit card, no commitments, just access.",
    },
    {
        title: "Build your watchlist",
        description: "Search any ticker and star the names you want tracked across every screen.",
    },
    {
        title: "Set alerts & strategies",
        description: "Define price thresholds, pick a strategy, or just ask the AI — Signalist handles the rest.",
    },
    {
        title: "React in real time",
        description: "Get notified the moment conditions are met and dig into the news driving the move.",
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
        quote: "Signalist turned my watchlist into a winning list. The alerts are spot-on and I feel more confident making moves in the market.",
        author: "Ethan R.",
        role: "Retail Investor",
    },
    {
        quote: "The AI summaries save me hours every week. It's like having a junior analyst on staff that never sleeps.",
        author: "Priya S.",
        role: "Active Trader",
    },
    {
        quote: "Market data, news, financials, and backtests — finally in one place. I closed two other apps after switching.",
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
        q: "Where does the market data come from?",
        a: "We aggregate best-in-class providers (including Finnhub and TradingView) and normalize the data so you get consistent quotes across every screen.",
    },
    {
        q: "Does Signalist give investment advice?",
        a: "No. We surface data, news, and AI-powered analysis to help you research faster. Nothing on Signalist is a recommendation to buy or sell any security.",
    },
    {
        q: "Can I track assets outside the US?",
        a: "Yes. Signalist supports equities, ETFs, indices, FX pairs, prediction markets, and more — across North America, Europe, and Asia.",
    },
    {
        q: "How do alerts work?",
        a: "Choose a stock, set an upper or lower price threshold, and we'll email you the instant the condition is met. You can manage thresholds anytime from your dashboard.",
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
                            Track real-time stock prices, get personalized alerts, and explore detailed
                            company insights — all in one beautifully focused dashboard built for the
                            next generation of investors.
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
                                GPT-powered AI
                            </span>
                            <span className="marketing-pill">
                                <Bell className="h-3.5 w-3.5 text-orange-500" />
                                Price alerts
                            </span>
                            <span className="marketing-pill">
                                <Mail className="h-3.5 w-3.5 text-blue-600" />
                                Daily briefings
                            </span>
                        </div>
                    </div>

                    {/* Mock dashboard preview */}
                    <div className="mt-14 md:mt-20 relative">
                        <div className="mx-auto max-w-5xl rounded-2xl border border-gray-800 bg-gray-800/40 p-3 shadow-2xl backdrop-blur">
                            <div className="rounded-xl bg-gray-900 border border-gray-800 p-5">
                                <div className="flex items-center justify-between mb-5">
                                    <div className="flex items-center gap-2">
                                        <span className="h-2.5 w-2.5 rounded-full bg-red-500/80" />
                                        <span className="h-2.5 w-2.5 rounded-full bg-yellow-500/80" />
                                        <span className="h-2.5 w-2.5 rounded-full bg-green-500/80" />
                                        <span className="ml-3 text-xs text-gray-500">app.signalist.io / dashboard</span>
                                    </div>
                                    <span className="text-xs text-gray-500">Live preview</span>
                                </div>
                                <div className="grid gap-3 md:grid-cols-3">
                                    {[
                                        { s: "AAPL", p: "$228.14", c: "+1.42%", up: true },
                                        { s: "NVDA", p: "$142.65", c: "+2.87%", up: true },
                                        { s: "TSLA", p: "$219.31", c: "-0.93%", up: false },
                                        { s: "MSFT", p: "$415.50", c: "+0.71%", up: true },
                                        { s: "AMZN", p: "$189.07", c: "+0.34%", up: true },
                                        { s: "META", p: "$512.30", c: "-0.18%", up: false },
                                    ].map((q) => (
                                        <div
                                            key={q.s}
                                            className="rounded-lg border border-gray-800 bg-gray-800/50 p-3"
                                        >
                                            <div className="flex items-center justify-between">
                                                <span className="text-sm font-semibold text-gray-100">{q.s}</span>
                                                <span className="text-xs text-gray-500">NASDAQ</span>
                                            </div>
                                            <div className="mt-2 flex items-center justify-between">
                                                <span className="text-lg font-bold text-gray-100">{q.p}</span>
                                                <span
                                                    className={
                                                        q.up
                                                            ? "text-xs font-semibold text-teal-400"
                                                            : "text-xs font-semibold text-red-500"
                                                    }
                                                >
                                                    {q.c}
                                                </span>
                                            </div>
                                            <div className="mt-3 h-8 flex items-end gap-0.5">
                                                {Array.from({ length: 24 }).map((_, i) => {
                                                    const h = 4 + ((i * 17) % 28);
                                                    const positive = q.up;
                                                    return (
                                                        <span
                                                            key={i}
                                                            className={
                                                                positive
                                                                    ? "flex-1 rounded-sm bg-teal-400/70"
                                                                    : "flex-1 rounded-sm bg-red-500/70"
                                                            }
                                                            style={{ height: `${h}px` }}
                                                        />
                                                    );
                                                })}
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
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
                        organized, and a step ahead.
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
                        Signalist is designed to get out of your way. No bloated dashboards, no noisy
                        feeds — just the data and insights that matter.
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
                        Start tracking the market smarter.
                    </h2>
                    <p className="mt-3 text-base md:text-lg text-gray-400 max-w-xl mx-auto">
                        Join Signalist for free and turn the noise of the market into clear, actionable
                        insight.
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
