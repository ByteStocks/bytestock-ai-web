import { auth } from "@/lib/auth/server";
import { MarketingFooter } from "@/components/marketing/footer";
import { MarketingHeader } from "@/components/marketing/header";

const Layout = async ({ children }: { children: React.ReactNode }) => {
    const { userId } = await auth();

    return (
        <div className="marketing-shell">
            <MarketingHeader isAuthenticated={Boolean(userId)} />
            <div className="flex-1">{children}</div>
            <MarketingFooter />
        </div>
    );
};

export default Layout;
