type Rewrite = (from: string) => string | null;
export declare const mkAliasRewriter: (fromPrefix?: string, toPrefix?: string) => Rewrite;
export declare const isRelative: (s: string) => boolean;
export declare const mkRelativeToJs: (fromFile: string) => (spec: string) => string;
export {};
