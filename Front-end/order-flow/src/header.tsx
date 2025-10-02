import { Bell, Settings } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "./components/ui/avatar";
import { Button } from "./components/ui/button";

const Header : React.FC = () => {
    return (
        <header className="w-full border-b border-b-white/10 border-[#e1ebe3] bg-[#0D120E] text-white">
            <div className="mx-auto flex max-w-7xl items-center px-6 py-3">
                {/* Left: Logo */}
                <div className="flex items-center space-x-2">
                    <span className="rounded-sm bg-white p-1 text-black font-bold"></span>
                    <span className="text-lg font-semibold">TradeView</span>
                </div>
                {/* Center: Navigation (mx-auto to center) */}
                <nav className="hidden md:flex items-center gap-9 mx-auto">
                    {["Home", "Markets", "Research"].map((item) => (
                        <a  
                            color="white"
                            key={item}
                            href="#"
                            className="!text-white hover:!text-gray-400 font-normal transition-colors duration-300 ease-in-out"
                        >
                            {item}
                        </a>
                    ))}
                </nav>
                {/* Right: Icons/Profile */}
                <div className="flex items-center gap-3">
                    <Button
                        size="icon"
                        variant="ghost"
                        className="rounded-md bg-[#1C221D] hover:bg-[#2A302B] !outline-none !ring-0"
                    >
                        <Bell className="h-5 w-5" />
                    </Button>
                    <Button
                        size="icon"
                        variant="ghost"
                        className="rounded-md bg-[#1C221D] hover:bg-[#2A302B] !outline-none !ring-0"
                    >
                        <Settings className="w-5 h-5" />
                    </Button>
                    <Avatar className="h-9 w-9">
                        <AvatarImage alt="User" />
                        <AvatarFallback className="bg-[#1C221D] text-[#B0B8B2]">U</AvatarFallback>
                    </Avatar>
                </div>
            </div>
        </header>
    );
};

export default Header;
