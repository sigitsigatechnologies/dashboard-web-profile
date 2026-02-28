import { Navbar } from "@/components/shared/Navbar";
import { Footer } from "@/components/shared/Footer";
import { prisma } from "@/lib/prisma";

export default async function PublicLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    const profile = await prisma.schoolProfile.findFirst();

    return (
        <div className="relative flex min-h-screen flex-col">
            <Navbar profile={profile} />
            <main className="flex-1">{children}</main>
            <Footer />
        </div>
    );
}
