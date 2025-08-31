import CABox from "@/components/CABox/CABox.tsx";

export default function Main() {
    return (
        <div className="flex mt-15 flex-col gap-8 justify-center items-center">
            <h1 className="text-6xl font-bold tracking-widest text-blue-700">$USDUC</h1>
            <div className="flex flex-col gap-5 justify-center items-center">
                <div className="flex gap-3 items-center">
                    <h2 className="text-black text-xl tracking-widest">first ever unstable coin</h2>
                    <div className="bg-blue-700 text-sm p-1 tracking-widest text-white rounded-md hover:scale-105">NOW OMNICHAIN</div>
                </div>
                <h2 className="text-black text-xl tracking-widest">u can't get rich by holding <em className="italic text-blue-800">stablecoins</em></h2>
            </div>
            <div className="w-full flex flex-col items-center justify-center gap-4 mt-6">
                <CABox chain="SOL" address="CB9dDufT3ZuQXqqSfa1c5kY935TEreyBw9XJXxHKpump" />
                <CABox chain="ETH" address="0xeceDb6F8108b9F7bfF499dA843DcED6C2B6E270" />
            </div>
        </div>
    )
}