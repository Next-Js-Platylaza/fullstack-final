"use client";
import Link from "next/link";
import { login } from "../../lib/actions";
import { useSearchParams } from "next/navigation";

export default function LoginForm(){
  const searchParams = useSearchParams();
  const rawCallbackUrl = searchParams.get("callbackUrl");
  
  const isSafeRedirect = rawCallbackUrl && rawCallbackUrl.startsWith("/") && !rawCallbackUrl.startsWith("//");
  const safeUrl = isSafeRedirect ? rawCallbackUrl : null;

    return <>
            <div className="flex flex-col gap-[32px]">
          <form className="w-full" action={login}>
            <div className="border-1 border-black my-1">
              <label htmlFor="email">Email:</label>
              <input type="text" name="email"></input>
            </div>
            <div className="border-1 border-black my-1">
              <label htmlFor="password">Password:</label>
              <input type="password" name="password"></input>
            </div>
            <button type="submit" className="w-full border-1 p-1 my-1">Login</button>
            {!safeUrl ? null : <input type="text" name="callback-url" value={safeUrl} readOnly hidden/> }
          </form>
          </div>
          <h4 className="mt-5 m-auto" >Don't have an account? <Link href="/signup" className="text-blue-600 underline hover:text-blue-800 backdrop-blur-none">Create one here.</Link></h4>
        
    </>
}