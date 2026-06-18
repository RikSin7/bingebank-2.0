import { NextRequest, NextResponse } from "next/server";

export function middleware(req: NextRequest) {
    const ua = (req.headers.get("user-agent") || "").toLowerCase();

    const botPatterns = [
        "bot",
        "crawler",
        "spider",
        "scraper",
        "headless",
        "python",
        "curl",
        "wget",
        "postman",
        "insomnia",
    ];

    if (botPatterns.some(p => ua.includes(p))) {
        return new NextResponse("Forbidden", {
            status: 403,
        });
    }

    return NextResponse.next();
}

export const config = {
    matcher: [
        "/movie/:path*",
        "/tv/:path*",
        "/person/:path*",
        "/explore/:path*",
        "/search/:path*",
        "/",
    ],
};