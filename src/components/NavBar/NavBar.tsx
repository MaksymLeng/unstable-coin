import {
    DropdownMenu,
    DropdownMenuTrigger,
    DropdownMenuContent,
    DropdownMenuItem,
} from "@/components/ui/dropdown-menu"
import { Button } from "@/components/ui/button"
import {useState} from "react";

export function NavBar() {
    const items = [
        { name: "Jup.Ag",
          href: "https://jup.ag/swap?sell=So11111111111111111111111111111111111111112&buy=CB9dDufT3ZuQXqqSfa1c5kY935TEreyBw9XJXxHKpump",
          src: "/logos/Jupiter.png" },
        { name: "Uniswap",
          href: "https://app.uniswap.org/swap?chain=mainnet&inputCurrency=NATIVE&outputCurrency=0xecedb6f8108b9f7bbf499da843dced6c2bb6e270&value=1&field=input",
          src: "/logos/Uniswap.png" },
    ]

    const [open, setOpen] = useState(false)

    return (
        <div className="flex justify-between w-[92%] items-center mx-auto mt-5 z-10">
            <div className="flex flex-col justify-center items-center gap-2">
                <img src="/logo1.png" alt="logo" className="w-20 h-20"/>
            </div>
            <DropdownMenu open={open} onOpenChange={setOpen}>
                <DropdownMenuTrigger asChild className="cursor-pointer p-6">
                    <Button className="bg-blue-400 text-black font-bold rounded-xl shadow-md hover:bg-blue-500">
                        BUY $USDUC {open ? "▲" : "▼"}
                    </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent className="bg-blue-400 rounded-xl shadow-lg mt-2">
                    {items.map((item) => (
                        <DropdownMenuItem
                            key={item.name}
                            className="flex items-center cursor-pointer gap-3 py-2 px-4 hover:bg-blue-500"
                            onSelect={() => window.open(item.href, "_blank")}
                        >
                            <img src={item.src} alt="" className="h-5 w-5" />
                            <span>{item.name}</span>
                        </DropdownMenuItem>
                    ))}
                </DropdownMenuContent>
            </DropdownMenu>
        </div>
    )
}
