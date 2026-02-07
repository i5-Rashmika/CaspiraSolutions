import React, { useState, useEffect } from "react";
import { ChevronDown } from "lucide-react";
import { useLocale } from "@/context/LocaleContext";

const LANGUAGES = [
    { code: "en", short: "Eng", name: "English" },
    { code: "hi", short: "Hi", name: "Hindi" },
    { code: "hy", short: "Հայ", name: "Armenian" },
    { code: "ru", short: "Рус", name: "Russian" },
];

export default function LanguageSelector() {
    const [open, setOpen] = useState(false);
    const { locale, setLocale } = useLocale();
    const current = LANGUAGES.find((l) => l.code === locale) || LANGUAGES[0];

    useEffect(() => {
        if (locale && !LANGUAGES.find((l) => l.code === locale)) {
            setLocale("en");
        }
    }, [locale, setLocale]);

    return (
        <div className="relative">
            {/* Main Button */}
            <div
                className="flex items-center gap-2 text-white cursor-pointer hover:text-[#3B82F6]"
                onClick={() => setOpen(!open)}
            >
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="22"
                    height="22"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                >
                    <path d="m5 8 6 6" />
                    <path d="m4 14 6-6 2-3" />
                    <path d="M2 5h12" />
                    <path d="m20 8-4.5 9" />
                    <path d="m15 8 4.5 9" />
                    <path d="M14 12h6" />
                </svg>

                <span className="text-base font-normal">{current.short}</span>

                <ChevronDown size={18} />
            </div>

            {/* Dropdown */}
            {open && (
                <div className="absolute right-0 mt-2 bg-black text-white border border-white/10 rounded-lg shadow-lg min-w-[140px] p-2 z-[10001]">
                    {LANGUAGES.map((lang) => (
                        <button
                            key={lang.code}
                            type="button"
                            className={`w-full text-left px-2 py-1.5 rounded hover:bg-white/10 transition-colors ${current.code === lang.code ? "text-[#3B82F6]" : ""}`}
                            onClick={() => {
                                setLocale(lang.code);
                                setOpen(false);
                            }}
                        >
                            {lang.name}
                        </button>
                    ))}
                </div>
            )}
        </div>
    );
}
