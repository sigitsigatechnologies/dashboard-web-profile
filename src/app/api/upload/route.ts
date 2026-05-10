import { NextRequest, NextResponse } from "next/server";

// This route is now legacy because we switched to Base64 uploads to support Vercel's read-only filesystem.
export async function POST(req: NextRequest) {
    return NextResponse.json({ 
        error: "Direct file uploads are disabled in production. Please use Base64 conversion on the client side.",
        message: "The application has been updated to use Base64 strings stored directly in the database."
    }, { status: 400 });
}
