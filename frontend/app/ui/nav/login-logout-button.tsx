"use server"
import Link from "next/link";
import { logout } from "@/app/lib/actions";
import { isLoggedIn as isLoggedInFunc } from "@/app/lib/session";

export default async function LoginLogoutButton(){
    const isLoggedIn: boolean = await isLoggedInFunc();
    return <div className="flex justify-center bg-gray-300 w-30 h-full m-auto border-5 border-gray-700">
        {isLoggedIn
            ? <form action={logout} className="flex justify-center">
                    <button type="submit">Logout</button>
                </form>
            : <Link href="/login" className="my-auto">Login</Link>
        }
    </div>
}