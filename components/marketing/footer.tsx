"use client";

import Link from "next/link";
import Image from "next/image";
import { TrendingUp } from "lucide-react";

const PRODUCT_LINKS = [
    { href: "/dashboard", label: "Dashboard" },
    { href: "/search", label: "Stock search" },
    { href: "/strategies", label: "Strategy lab" },
    { href: "/prediction-markets", label: "Prediction markets" },
];

const COMPANY_LINKS = [
    { href: "/support", label: "Support" },
    { href: "/privacy", label: "Privacy policy" },
    { href: "/terms", label: "Terms of service" },
    { href: "/#features", label: "Features" },
    { href: "/#faq", label: "FAQ" },
];

export const MarketingFooter = () => {
    const year = new Date().getFullYear();

    return (
        <footer className="marketing-footer">
            <div className="marketing-footer-inner">
                <div>
                    <Link href="/" className="inline-flex items-center">
                        <Image
                            src="/assets/icons/logo.svg"
                            alt="Signalist logo"
                            width={140}
                            height={32}
                            className="h-7 w-auto"
                        />
                    </Link>
                    <p className="mt-4 text-sm text-gray-500 max-w-xs">
                        AI-powered stock analysis, brokerage integration, and sentiment-driven recommendations for modern investors.
                    </p>
                </div>

                <div>
                    <p className="marketing-footer-title">Product</p>
                    <ul>
                        {PRODUCT_LINKS.map((link) => (
                            <li key={link.href}>
                                <Link href={link.href} className="marketing-footer-link">
                                    {link.label}
                                </Link>
                            </li>
                        ))}
                    </ul>
                </div>

                <div>
                    <p className="marketing-footer-title">Company</p>
                    <ul>
                        {COMPANY_LINKS.map((link) => (
                            <li key={link.href}>
                                <Link href={link.href} className="marketing-footer-link">
                                    {link.label}
                                </Link>
                            </li>
                        ))}
                    </ul>
                </div>

                <div>
                    <p className="marketing-footer-title">Stay in the loop</p>
                    <p className="text-sm text-gray-500 mb-3">
                        Get curated market news and AI insights delivered to your inbox.
                    </p>
                    <Link href="/sign-up" className="inline-flex items-center gap-2 text-sm font-medium text-yellow-500 hover:text-yellow-400">
                        <TrendingUp className="h-4 w-4" />
                        Create a free account
                    </Link>
                </div>
            </div>

            <div className="marketing-divider">
                <div className="container py-6 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-gray-500">
                    <p>© {year} Signalist. All rights reserved.</p>
                    <p>Market data is for informational purposes only and does not constitute investment advice.</p>
                </div>
            </div>
        </footer>
    );
};
