"use server"
import Link from "next/link";
import { logout } from "@/app/lib/actions";
import { getLoggedInUser, isLoggedIn as isLoggedInFunc } from "@/app/lib/session";

export default async function LoginLogoutButton(){
    const isLoggedIn: boolean = await isLoggedInFunc();
    let email = "";
    if (isLoggedIn) {
    const user = await getLoggedInUser();

    email = user.email;
    const maxLength = 28;
    if (email.length > maxLength) {
        const atIndex = email.lastIndexOf("@");

        const username = email.slice(0, atIndex);
        const domain = email.slice(atIndex); // Includes the '@'

        const allowedUserLength = maxLength - domain.length;

        // Edge case: If the domain alone is longer than maxLength, 
        if (allowedUserLength <= 3) {
            email = `${username.slice(0, maxLength - 3)}..`;
        }
        else
            email = `${username.slice(0, allowedUserLength - 3)}..${domain}`;
    }
    }

    return <div className="px-1 nav-btn">
        {isLoggedIn
            ? <form action={logout} className="flex justify-center">
                    <button type="submit">Logout<p className="-mt-1 text-xs">({email})</p></button>
                </form>
            : <Link href="/login" className="my-auto">Login</Link>
        }
    </div>
}