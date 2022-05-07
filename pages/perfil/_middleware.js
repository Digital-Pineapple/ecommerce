import { NextResponse } from "next/server";
import { emailVerified } from "../../src/actions/authActions";

export async function middleware(req, ev) {

    const { token } = req.cookies;

    const baseUrl = req.nextUrl.clone().origin;

    return NextResponse.next();

    const handleEmailVerified = async (token) => {
        return await emailVerified(token);
    }

    if (token) {
        const { email_verified } = handleEmailVerified(token);
        if (email_verified) {
            return NextResponse.next();
        }
        return NextResponse.redirect(`${baseUrl}/verificar-cuenta`);
    }


    const requestedPage = req.page.name;

    return NextResponse.redirect(`${baseUrl}/auth/login?p=${requestedPage}`);

}