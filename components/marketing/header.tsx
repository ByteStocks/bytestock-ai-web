"use client";

import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";

const NAV_LINKS = [
    { href: "/", label: "Home" },
    { href: "/#features", label: "Features" },
    { href: "/#how-it-works", label: "How it works" },
    { href: "/#faq", label: "FAQ" },
];

export const MarketingHeader = ({ isAuthenticated }: { isAuthenticated: boolean }) => {
    const pathname = usePathname();

    const isActive = (href: string) => {
        if (href === "/") return pathname === "/";
        return pathname.startsWith(href);
    };

    return (
        <header className="marketing-header">
            <div className="marketing-header-inner">
                <Link href="/" className="flex items-center gap-2">
                    <Image
                        src="/assets/icons/logo.svg"
                        alt="Signalist logo"
                        width={140}
                        height={32}
                        className="h-7 w-auto"
                    />
                </Link>

                <nav className="marketing-nav" aria-label="Primary">
                    {NAV_LINKS.map(({ href, label }) => (
                        <Link
                            key={href}
                            href={href}
                            className={cn(
                                "marketing-nav-link",
                                isActive(href) && "active"
                            )}
                        >
                            {label}
                        </Link>
                    ))}
                    <Link href="/support" className={cn("marketing-nav-link", isActive("/support") && "active")}>
                        Support
                    </Link>
                    <Link href="/privacy" className={cn("marketing-nav-link", isActive("/privacy") && "active")}>
                        Privacy
                    </Link>
                </nav>

                <div className="flex items-center gap-2">
                    {isAuthenticated ? (
                        <Link href="/dashboard" className="marketing-cta !h-10 !px-4 !text-sm">
                            Open dashboard
                        </Link>
                    ) : (
                        <>
                            <Link
                                href="/sign-in"
                                className="hidden sm:inline-flex h-10 items-center px-3 text-sm font-medium text-gray-400 hover:text-yellow-500 transition-colors"
                            >
                                Sign in
                            </Link>
                            <Link href="/sign-up" className="marketing-cta !h-10 !px-4 !text-sm">
                                Get started
                            </Link>
                        </>
                    )}
                </div>
            </div>
        </header>
    );
};
