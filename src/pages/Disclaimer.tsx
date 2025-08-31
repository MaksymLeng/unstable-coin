export default function Disclaimer() {
    return (
        <div className="prose prose-slate max-w-3xl mx-auto flex items-center flex-col gap-8 justify-center md: mt-30">
            <div className="flex gap-4 md:text-xl cursor-pointer">
                <a
                    href="https://drive.google.com/drive/folders/1wGHQJ3AttPyTgBOoXglkatCkWXYdYbEw?usp=sharing"
                    className="hover:text-blue-300">Brand Kit</a>
                <a
                    href="https://thegreatunstabling.com/"
                    className="hover:text-blue-300">The Great Unstabling</a>
                <a
                    href="https://bridge.usduc.org/"
                    className="hover:text-blue-300">LayerZero Bridge</a>
            </div>
            <div className="whitespace-nowrap text-sm flex flex-col gap-3">
                <p>
                    $USDUC is a highly volatile meme coin with no intrinsic value, no utility beyond entertainment, and no expectation of financial return.
                </p>
                <p>
                    $USDUC is for satirical and entertainment purposes only and not backed by any assets, team, or roadmap. When you purchase
                </p>
                <p>
                    $USDUC, you agree you've seen this disclaimer and accept all risks at your own expense.
                </p>
            </div>
            <p className="text-gray-500">© 2025 - USDUC</p>
        </div>
    )
}
