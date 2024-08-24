import { NextRequest, NextResponse } from "next/server";
import { SettingsData } from "./types";

export function middleware(req: NextRequest) {
    const dummySettings: SettingsData = {
        tempFormat: 'F',
        theme: 'Bulbasaur',
        lang: 'English',
    };

    const res: NextResponse = NextResponse.next();
    const settings = req.cookies.get("settings")?.value || JSON.stringify(dummySettings);
    res.headers.set("settings", settings);
}