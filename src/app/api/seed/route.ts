import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import bcrypt from "bcryptjs";

export async function GET() {
    try {
        // Check if admin already exists
        const adminExists = await prisma.user.findUnique({
            where: { email: "admin@educenter.sch.id" },
        });

        if (adminExists) {
            return NextResponse.json({ message: "Admin already exists" }, { status: 400 });
        }

        // Create Admin User
        const hashedPassword = await bcrypt.hash("admin123", 10);
        const admin = await prisma.user.create({
            data: {
                email: "admin@educenter.sch.id",
                password: hashedPassword,
                name: "School Administrator",
                role: "ADMIN",
            },
        });

        // Create Sample School Profile
        await prisma.schoolProfile.create({
            data: {
                schoolName: "EduCenter International School",
                logo: "https://example.com/logo.png",
                vision: "To be a world-class educational institution...",
                mission: "Provide a innovative and challenging academic environment...",
                history: "Founded in 1995, EduCenter began with a simple mission...",
                principalMessage: "At EduCenter, we believe that education is not just about academic excellence...",
                address: "123 School Street, Education City, ED 12345",
                phone: "+1 (234) 567-890",
                email: "info@educenter.sch.id",
            },
        });

        return NextResponse.json({
            message: "Database seeded successfully!",
            credentials: {
                email: "admin@educenter.sch.id",
                password: "admin123"
            }
        });
    } catch (error: any) {
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}
