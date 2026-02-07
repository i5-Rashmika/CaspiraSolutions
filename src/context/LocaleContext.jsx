"use client";

import React, { createContext, useContext, useState, useEffect, useCallback } from "react";
import { NextIntlClientProvider } from "next-intl";
import en from "@/messages/en.json";
import ru from "@/messages/ru.json";
import hy from "@/messages/hy.json";
import hi from "@/messages/hi.json";

const messagesMap = { en, ru, hy, hi };
const LOCALE_COOKIE = "NEXT_LOCALE";
const COOKIE_MAX_AGE = 365 * 24 * 60 * 60;

function getLocaleFromCookie() {
    if (typeof document === "undefined") return "en";
    const match = document.cookie.match(new RegExp(`(^| )${LOCALE_COOKIE}=([^;]+)`));
    return match ? match[2] : "en";
}

function setLocaleCookie(locale) {
    document.cookie = `${LOCALE_COOKIE}=${locale};path=/;max-age=${COOKIE_MAX_AGE};SameSite=Lax`;
}

const LocaleContext = createContext(null);

export function LocaleProvider({ children }) {
    const [locale, setLocaleState] = useState("en");
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        setLocaleState(getLocaleFromCookie());
        setMounted(true);
    }, []);

    const setLocale = useCallback((newLocale) => {
        if (!messagesMap[newLocale]) return;
        setLocaleCookie(newLocale);
        setLocaleState(newLocale);
    }, []);

    const messages = messagesMap[locale] || en;

    if (!mounted) {
        return (
            <NextIntlClientProvider key="en" locale="en" messages={en}>
                {children}
            </NextIntlClientProvider>
        );
    }

    return (
        <LocaleContext.Provider value={{ locale, setLocale }}>
            {/* key 随 locale 变化，强制整棵翻译树重新挂载，避免切换后文案/选择器卡在旧语言 */}
            <NextIntlClientProvider key={locale} locale={locale} messages={messages}>
                {children}
            </NextIntlClientProvider>
        </LocaleContext.Provider>
    );
}

export function useLocale() {
    const ctx = useContext(LocaleContext);
    return ctx || { locale: "en", setLocale: () => {} };
}
