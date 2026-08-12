'use client';

import { useState, useCallback, useEffect } from "react";
import { CodeEditor } from "@/components/strategies/CodeEditor";
import { SANDBOX_PROBLEMS } from "@/lib/strategies/sandboxProblems";
import { cn } from "@/lib/utils";
import { Play, Loader2, RotateCcw, TerminalSquare } from "lucide-react";

interface RunResult {
    stdout?: string;
    stderr?: string;
    output?: string;
    code?: number | null;
    error?: string;
}

const DIFF_STYLE: Record<string, string> = {
    Easy: 'text-green-400',
    Medium: 'text-yellow-400',
    Hard: 'text-red-400',
};

export function PythonSandbox() {
    const [problemIndex, setProblemIndex] = useState(0);
    const [code, setCode] = useState(SANDBOX_PROBLEMS[0].starterCode);
    const [stdin, setStdin] = useState(SANDBOX_PROBLEMS[0].testInput);
    const [running, setRunning] = useState(false);
    const [result, setResult] = useState<RunResult | null>(null);
    const [elapsedMs, setElapsedMs] = useState<number | null>(null);

    useEffect(() => {
        const problem = SANDBOX_PROBLEMS[problemIndex];
        setCode(problem.starterCode);
        setStdin(problem.testInput);
        setResult(null);
        setElapsedMs(null);
    }, [problemIndex]);

    const problem = SANDBOX_PROBLEMS[problemIndex];

    const run = useCallback(async () => {
        setRunning(true);
        setResult(null);
        setElapsedMs(null);
        const start = performance.now();
        try {
            const res = await fetch('/api/python', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ code, stdin }),
            });
            const data = await res.json();
            setResult(data);
        } catch (e) {
            setResult({ error: e instanceof Error ? e.message : 'Execution failed' });
        } finally {
            setElapsedMs(Math.max(1, Math.round(performance.now() - start)));
            setRunning(false);
        }
    }, [code, stdin]);

    const reset = () => {
        setCode(problem.starterCode);
        setResult(null);
        setElapsedMs(null);
    };

    return (
        <div className="space-y-6">
            <div className="flex flex-col gap-1">
                <h2 className="text-xl font-bold text-white">Python Sandbox</h2>
                <p className="text-sm text-gray-400">
                    Solve algorithmic trading challenges in real Python (executed in a remote sandbox) — LeetCode style.
                </p>
            </div>

            <div className="grid grid-cols-1 xl:grid-cols-[280px_1fr] gap-6">
                <div className="space-y-3">
                    <h3 className="text-sm font-medium text-gray-300">Challenges</h3>
                    <div className="space-y-2">
                        {SANDBOX_PROBLEMS.map((p, i) => (
                            <button
                                key={p.id}
                                onClick={() => setProblemIndex(i)}
                                className={cn(
                                    'w-full rounded-lg border px-4 py-3 text-left transition-colors',
                                    i === problemIndex
                                        ? 'border-yellow-500/70 bg-yellow-500/10'
                                        : 'border-gray-700 bg-gray-800/40 hover:border-gray-500'
                                )}
                            >
                                <div className="flex items-center justify-between gap-2">
                                    <span className={cn('text-sm font-medium', i === problemIndex ? 'text-yellow-400' : 'text-gray-200')}>
                                        {p.title}
                                    </span>
                                    <span className={cn('text-xs font-medium', DIFF_STYLE[p.difficulty])}>{p.difficulty}</span>
                                </div>
                                <div className="mt-1 flex flex-wrap gap-1">
                                    {p.topics.slice(0, 3).map((t) => (
                                        <span key={t} className="rounded bg-gray-800 px-1.5 py-0.5 text-[10px] text-gray-500">{t}</span>
                                    ))}
                                </div>
                            </button>
                        ))}
                    </div>
                </div>

                <div className="rounded-xl border border-gray-700 bg-gray-900/40 overflow-hidden">
                    <div className="flex items-center justify-between border-b border-gray-700 bg-gray-800/60 px-4 py-2">
                        <div className="flex items-center gap-2 text-sm font-medium text-gray-200">
                            <span className="text-yellow-500">{problem.title}</span>
                            <span className={cn('text-xs', DIFF_STYLE[problem.difficulty])}>{problem.difficulty}</span>
                        </div>
                        <div className="flex items-center gap-2">
                            <button
                                onClick={reset}
                                className="inline-flex items-center gap-1.5 rounded-md border border-gray-600 px-3 py-1.5 text-xs text-gray-300 transition-colors hover:border-gray-400 hover:text-white"
                            >
                                <RotateCcw className="h-3.5 w-3.5" />
                                Reset
                            </button>
                            <button
                                onClick={run}
                                disabled={running}
                                className="inline-flex items-center gap-1.5 rounded-md bg-emerald-500 px-4 py-1.5 text-xs font-semibold text-emerald-950 transition-colors hover:bg-emerald-400 disabled:opacity-60"
                            >
                                {running ? <Loader2 className="h-3.5 w-3.5 animate-spin" /> : <Play className="h-3.5 w-3.5" />}
                                {running ? 'Running...' : 'Run'}
                            </button>
                        </div>
                    </div>

                    <div className="grid grid-cols-1 lg:grid-cols-2">
                        <div className="border-b lg:border-b-0 lg:border-r border-gray-700 max-h-[70vh] overflow-y-auto">
                            <div className="space-y-4 p-5">
                                {problem.description.map((para, i) => (
                                    <p key={i} className="text-sm leading-relaxed text-gray-300">{para}</p>
                                ))}

                                <div className="rounded-lg border border-gray-700 bg-black/30 p-4">
                                    <div className="mb-1.5 text-xs font-semibold text-gray-400">Example</div>
                                    <pre className="overflow-x-auto text-xs leading-5 text-gray-300 whitespace-pre-wrap">{problem.example}</pre>
                                </div>

                                <div>
                                    <div className="mb-2 text-xs font-semibold text-gray-400">Constraints</div>
                                    <ul className="list-inside space-y-1">
                                        {problem.constraints.map((c, i) => (
                                            <li key={i} className="text-xs text-gray-500">• {c}</li>
                                        ))}
                                    </ul>
                                </div>
                            </div>
                        </div>

                        <div className="flex flex-col">
                            <CodeEditor initialCode={problem.starterCode} problemKey={problem.id} onChange={setCode} />
                        </div>
                    </div>

                    <div className="border-t border-gray-700">
                        <div className="flex items-center justify-between border-b border-gray-700 bg-gray-800/60 px-4 py-2">
                            <label htmlFor="stdin" className="text-xs font-medium text-gray-400">Stdin</label>
                            <span className="text-[10px] text-gray-600">optional input passed to the program</span>
                        </div>
                        <textarea
                            id="stdin"
                            value={stdin}
                            onChange={(e) => setStdin(e.target.value)}
                            rows={3}
                            spellCheck={false}
                            className="w-full resize-none bg-gray-900/40 px-4 py-3 font-mono text-xs text-gray-300 outline-none"
                            placeholder="Enter program input here..."
                        />
                    </div>

                    <div className="border-t border-gray-700">
                        <div className="flex items-center gap-2 border-b border-gray-700 bg-gray-800/60 px-4 py-2">
                            <TerminalSquare className="h-4 w-4 text-gray-400" />
                            <span className="text-xs font-medium text-gray-400">Output</span>
                            {elapsedMs !== null && !running && (
                                <span className="ml-auto text-[10px] text-gray-500">{elapsedMs} ms</span>
                            )}
                        </div>
                        <pre className="max-h-64 min-h-[64px] overflow-auto bg-black/40 px-4 py-3 font-mono text-xs leading-relaxed">
                            {running && <span className="text-yellow-400">running…</span>}
                            {!running && result?.error && <span className="text-red-400">{result.error}</span>}
                            {!running && result && !result.error && (
                                <code className="text-emerald-300 whitespace-pre-wrap">
                                    {result.stdout ?? ''}
                                    {result.stderr ? `\n[stderr]\n${result.stderr}` : ''}
                                    {result.code !== null && result.code !== undefined && result.code !== 0 ? `\n[exit code: ${result.code}]` : ''}
                                </code>
                            )}
                            {!running && !result && <span className="text-gray-600">Press Run to execute your code.</span>}
                        </pre>
                    </div>
                </div>
            </div>
        </div>
    );
}