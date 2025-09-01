import { NavLink } from "react-router-dom"
import { cn } from "@/lib/utils"
import {tabs} from "@/data/TabsLink.ts";

export default function FooterNav() {
    return (
        <footer className="w-full pb-8">
            <div className="mx-auto max-w-5xl px-4">
                {/* Нав-пилюля */}
                <div className="rounded-full bg-[#0b1530] text-white/90 shadow-[0_8px_24px_rgba(0,0,0,.25)] p-2 flex gap-2 justify-between overflow-x-auto">
                    {tabs.map(({ to, label, exact }) => (
                        <NavLink
                            key={to}
                            to={to}
                            end={exact}
                            className={({ isActive }) =>
                                cn(
                                    "px-5 py-2 rounded-full font-extrabold tracking-wide whitespace-nowrap transition",
                                    isActive
                                        ? "bg-white text-[#0b1530] shadow-inner"
                                        : "hover:bg-white/10"
                                )
                            }
                        >
                            {label}
                        </NavLink>
                    ))}
                </div>
            </div>
        </footer>
    )
}
