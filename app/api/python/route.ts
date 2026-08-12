import { NextResponse } from "next/server";

export async function POST(request: Request) {
    try {
        const { code, stdin } = await request.json();

        if (!code || typeof code !== "string") {
            return NextResponse.json({ error: "No code provided" }, { status: 400 });
        }

        const controller = new AbortController();
        const timeout = setTimeout(() => controller.abort(), 15000);

        try {
            const response = await fetch("https://emkc.org/api/v2/piston/execute", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    language: "python",
                    version: "3.10.0",
                    files: [{ name: "main.py", content: code }],
                    stdin: stdin || "",
                }),
                signal: controller.signal,
            });

            if (!response.ok) {
                const text = await response.text();
                return NextResponse.json({ error: `Sandbox service returned ${response.status}: ${text}` }, { status: 502 });
            }

            const data = await response.json();
            return NextResponse.json(data);
        } finally {
            clearTimeout(timeout);
        }
    } catch (error) {
        const message = error instanceof Error && error.name === "AbortError"
            ? "Execution timed out (15s limit)"
            : "Failed to reach the code execution sandbox";
        return NextResponse.json({ error: message }, { status: 500 });
    }
}