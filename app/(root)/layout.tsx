import Header from "@/components/Header";
import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";

const Layout = async ({ children }: { children : React.ReactNode }) => {
    const { userId } = await auth();

    if(!userId) redirect('/sign-in');

    return (
        <main className="min-h-screen text-gray-400">
            <Header />

            <div className="container py-10">
                {children}
            </div>
        </main>
    )
}
export default Layout