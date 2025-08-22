import { Loader2 } from "lucide-react";

export default function LoadingFile({ active = true }: { active?: boolean }) {
    if (active) {
        return <div
            className="fixed bottom-6 left-1/2 w-72 h-auto bg-white/90 backdrop-blur-md border border-gray-200 rounded-xl shadow-xl transform -translate-x-1/2 flex items-center justify-center z-50 p-4 transition-all"
        >
            <div className="flex items-center gap-2">
                <Loader2 className="h-7 w-7 animate-spin text-blue-500" />
                <span className="text-sm font-medium text-gray-900">
                    Carregando arquivo...
                </span>
            </div>
        </div>
    }
    return <></>;
}