export default function Disclaimer() {
    return (
        <div className="flex flex-col flex-1 items-center justify-center">
            <div className="relative mx-auto w-full max-w-3xl mt-30 px-4 sm:px-6 py-10 sm:py-14 flex flex-col items-center gap-6 sm:gap-8 text-center">
                <nav className="w-full flex flex-col sm:flex-row sm:flex-wrap items-center justify-center gap-2 sm:gap-4 text-sm sm:text-base font-semibold">
                    <a href="https://drive.google.com/drive/folders/1wGHQJ3AttPyTgBOoXglkatCkWXYdYbEw?usp=sharing"
                       className="px-3 py-1 rounded-full hover:text-blue-500 hover:bg-white/40 transition">
                        Brand Kit
                    </a>
                    <a href="https://thegreatunstabling.com/"
                       className="px-3 py-1 rounded-full hover:text-blue-500 hover:bg-white/40 transition">
                        The Great Unstabling
                    </a>
                    <a href="https://bridge.usduc.org/"
                       className="px-3 py-1 rounded-full hover:text-blue-500 hover:bg-white/40 transition">
                        LayerZero Bridge
                    </a>
                </nav>

                <section className="w-full max-w-2xl text-xs sm:text-sm md:text-base leading-relaxed sm:leading-7 text-slate-900/90 space-y-3">
                    <p>
                        $USDUC is a highly volatile meme coin with no intrinsic value, no utility beyond entertainment, and no expectation of financial return.
                    </p>
                    <p>
                        $USDUC is for satirical and entertainment purposes only and not backed by any assets, team, or roadmap. When you purchase
                    </p>
                    <p>
                        $USDUC, you agree you've seen this disclaimer and accept all risks at your own expense.
                    </p>
                </section>

                <p className="text-[11px] sm:text-xs text-gray-500 pt-2">© 2025 — USDUC</p>

                <div className="pb-[env(safe-area-inset-bottom)]" />
            </div>
        </div>
    )
}
