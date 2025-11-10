import { Gamepad2 } from "lucide-react";

export default function LogoPage() {
    return (
        <div className="flex flex-col items-center justify-center h-screen bg-gradient-to-br bg-[#075033]">
            {/* Logo */}
            <div className="flex items-center space-x-4">
                <Gamepad2 className="h-24 w-24 text-purple-400 drop-shadow-lg" />
                <span className="text-6xl font-extrabold bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
          NextlvlHardware
        </span>
            </div>
        </div>
    );
}