declare module 'react-syntax-highlighter' {
    import { ComponentType, ReactNode } from 'react';

    export interface SyntaxHighlighterProps {
        language?: string;
        style?: Record<string, unknown>;
        children?: ReactNode;
        PreTag?: keyof JSX.IntrinsicElements | ComponentType<Record<string, unknown>>;
        customStyle?: Record<string, unknown>;
        customTag?: string;
        codeTagProps?: Record<string, unknown>;
        lineNumberStyle?: Record<string, unknown>;
        showLineNumbers?: boolean;
        className?: string;
        wrapLongLines?: boolean;
    }

    export const Prism: ComponentType<SyntaxHighlighterProps>;
    export const Light: ComponentType<SyntaxHighlighterProps>;
    export const SyntaxHighlighter: ComponentType<SyntaxHighlighterProps>;
    export const SyntaxHighlighterProps: SyntaxHighlighterProps;
    export default SyntaxHighlighter;
}

declare module 'react-syntax-highlighter/dist/cjs/styles/prism' {
    export const coldarkDark: Record<string, unknown>;
    export const coldarkCold: Record<string, unknown>;
    export const vscDarkPlus: Record<string, unknown>;
    export const atomDark: Record<string, unknown>;
    export const vs2015: Record<string, unknown>;
    export const oneDark: Record<string, unknown>;
    export const oneLight: Record<string, unknown>;
    export const dracula: Record<string, unknown>;
    export const a11yDark: Record<string, unknown>;
    export const nord: Record<string, unknown>;
}