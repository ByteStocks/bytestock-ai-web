'use client';

import { useRef, useState, useEffect } from 'react';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { coldarkDark } from 'react-syntax-highlighter/dist/cjs/styles/prism';

interface CodeEditorProps {
    initialCode: string;
    problemKey: string;
    onChange: (code: string) => void;
}

const FONT = 'var(--font-mono), ui-monospace, SFMono-Regular, Menlo, Consolas, monospace';
const FONT_SIZE = '13px';
const LINE_HEIGHT = '1.6';
const PAD = '0.75rem 1rem';

export function CodeEditor({ initialCode, problemKey, onChange }: CodeEditorProps) {
    const [code, setCode] = useState(initialCode);
    const taRef = useRef<HTMLTextAreaElement>(null);
    const [lines, setLines] = useState(1);

    useEffect(() => {
        setCode(initialCode);
    }, [initialCode, problemKey]);

    useEffect(() => {
        setLines(code.split('\n').length);
        if (taRef.current) {
            taRef.current.style.height = 'auto';
            taRef.current.style.height = taRef.current.scrollHeight + 'px';
        }
    }, [code]);

    const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
        const val = e.target.value;
        setCode(val);
        onChange(val);
    };

    const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
        if (e.key === 'Tab') {
            e.preventDefault();
            const ta = e.currentTarget;
            const { selectionStart, selectionEnd, value } = ta;
            const next = value.slice(0, selectionStart) + '  ' + value.slice(selectionEnd);
            setCode(next);
            onChange(next);
            requestAnimationFrame(() => {
                ta.selectionStart = ta.selectionEnd = selectionStart + 2;
            });
        }
    };

    const sharedLineStyle = {
        fontSize: FONT_SIZE,
        lineHeight: LINE_HEIGHT,
        fontFamily: FONT,
        whiteSpace: 'pre' as const,
        tabSize: 2,
    };

    return (
        <div className="flex min-h-[320px] overflow-x-auto">
            <div
                className="select-none border-r border-gray-800 bg-gray-900/60 text-right text-gray-600"
                style={{ padding: PAD, minHeight: '320px' }}
                aria-hidden
            >
                {Array.from({ length: Math.max(lines, 5) }, (_, i) => (
                    <div key={i} style={sharedLineStyle}>
                        {i + 1}
                    </div>
                ))}
            </div>

            <div className="relative flex-1 overflow-x-hidden" style={{ background: 'rgb(11,15,25)' }}>
                <div
                    aria-hidden
                    className="pointer-events-none select-none absolute inset-0 overflow-hidden"
                    style={{ minHeight: 320 }}
                >
                    <SyntaxHighlighter
                        language="python"
                        style={coldarkDark}
                        PreTag="div"
                        customStyle={{
                            margin: 0,
                            padding: PAD,
                            minHeight: 'inherit',
                            background: 'transparent',
                            fontFamily: FONT,
                            height: '100%',
                        }}
                        codeTagProps={{
                            style: { ...sharedLineStyle },
                        }}
                    >
                        {code || ' '}
                    </SyntaxHighlighter>
                </div>

                <textarea
                    ref={taRef}
                    value={code}
                    onChange={handleChange}
                    onKeyDown={handleKeyDown}
                    spellCheck={false}
                    autoCapitalize="off"
                    autoCorrect="off"
                    autoComplete="off"
                    wrap="off"
                    className="relative block w-full bg-transparent text-transparent caret-emerald-400 outline-none border-0 focus:ring-0 focus:outline-none resize-none"
                    style={{
                        ...sharedLineStyle,
                        padding: PAD,
                        minHeight: 320,
                        overflow: 'hidden',
                    }}
                />
            </div>
        </div>
    );
}