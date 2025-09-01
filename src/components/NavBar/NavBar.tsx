import {
    DropdownMenu,
    DropdownMenuTrigger,
    DropdownMenuContent,
    DropdownMenuItem,
} from "@/components/ui/dropdown-menu"
import { Button } from "@/components/ui/button"
import {useState} from "react";
import {items} from "@/data/BuyBtn.ts";

export function NavBar() {
    const [open, setOpen] = useState(false);
    const [rotating, setRotating] = useState(false);

    const handleLogoClick = () => {
        setRotating(true)
        setTimeout(() => setRotating(false), 800)
    }

    return (
        <div className="flex justify-between w-[92%] items-center mx-auto mt-5 z-10">
            <div className="flex flex-col justify-center items-center gap-2"   onClick={handleLogoClick}>
                <img
                    src="/logo1.png"
                    alt="logo"
                    className={`w-20 h-20 transition-transform duration-800 ${
                        rotating ? "rotate-[360deg]" : "rotate-0"
                    }`}
                />
            </div>
            <DropdownMenu open={open} onOpenChange={setOpen}>
                <DropdownMenuTrigger asChild className="cursor-pointer p-6">
                    <Button className="bg-blue-400 text-black font-bold rounded-xl shadow-md hover:bg-blue-500 flex items-center gap-2" aria-expanded={open}>
                        <p>BUY $USDUC</p>
                        <span className={`inline-flex h-4 w-4 items-center justify-center transition-transform duration-300 ease-out ${open ? "rotate-180 scale-110" : "rotate-0"}`}>
                            <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="2">
                                <path d="M6 9l6 6 6-6" strokeLinecap="round" strokeLinejoin="round" />
                            </svg>
                        </span>
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
