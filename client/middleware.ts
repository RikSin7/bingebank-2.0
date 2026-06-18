import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

const BLOCKED_BOTS = [
    "gptbot",
    "claudebot",
    "perplexitybot",
    "bytespider",
    "ccbot",
    "ahrefsbot",
    "semrushbot",
];

export function middleware(req: NextRequest) {
    const ua = (req.headers.get("user-agent") || "").toLowerCase();

    if (BLOCKED_BOTS.some(bot => ua.includes(bot))) {
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
    ],
};