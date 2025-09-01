import { useState } from "react";
import type {CABoxProps} from "../../../Type/Type.ts";

export default function CABox({ chain, address, className = "" }: CABoxProps) {
    const [copied, setCopied] = useState(false);

    const copy = async () => {
        await navigator.clipboard.writeText(address);
        setCopied(true);
        setTimeout(() => setCopied(false), 1200);
    };

    return (
        <button
            onClick={copy}
            className={`group w-full max-w-3xl text-left rounded-2xl border border-blue-400/70
                  bg-white/70 backdrop-blur-sm shadow-[0_8px_30px_rgba(59,130,246,0.15)]
                  hover:bg-white/90 transition cursor-pointer
                  md:px-5 px-2 py-4 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-400/60 ${className}`}
            aria-label={`Copy ${chain} contract address`}
        >
            <div className="flex items-center gap-3">
                <span className="inline-flex items-center justify-center rounded-full bg-blue-500 text-white
                                 h-8 min-w-8 px-3 text-xs font-bold tracking-widest">
                  {chain}
                </span>

                <div className="flex-1 min-w-0">
                    <div className="text-xs uppercase tracking-widest text-blue-700/80">Contract Address</div>
                    <div className="font-mono text-sm md:text-base text-slate-800 whitespace-normal break-all sm:whitespace-nowrap sm:overflow-hidden sm:text-ellipsis">
                        {address}
                    </div>
                </div>

                <span className="text-sm font-semibold text-blue-700/80 opacity-0 group-hover:opacity-100 group-focus-visible:opacity-100 transition"
                      aria-live="polite">
                    {copied ? "Copied!" : "Copy"}
                </span>
            </div>
        </button>
    );
}
