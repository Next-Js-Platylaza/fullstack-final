"use client";
import Link from "next/link";
import { login } from "../../lib/actions";
import { useSearchParams } from "next/navigation";
import { useState } from "react";
import { AccountFormState } from "../../lib/actions";
import { useActionState } from "react";
import AccountCredentialsInput from "./account-credentials-input";

export default function LoginForm(){
  const searchParams = useSearchParams();
  const rawCallbackUrl = searchParams.get("callbackUrl");
  
  const isSafeRedirect = rawCallbackUrl && rawCallbackUrl.startsWith("/") && !rawCallbackUrl.startsWith("//");
  const safeUrl = isSafeRedirect ? rawCallbackUrl : null;

  const initialState: AccountFormState = {error: null};
  const [formState, formAction, isPending] = useActionState(login, initialState)

  const [doShowPass, setDoShowPass] = useState(false);

    return <>
      <div className="flex flex-col gap-[32px]">
        <form className="w-full flex flex-col border-2 p-4" action={formAction}>
          <AccountCredentialsInput formState={formState} doShowPass={doShowPass} setDoShowPass={setDoShowPass}/>
          <button type="submit" className="btn-w-full mt-2" onClick={()=>setDoShowPass(false)}>Login</button>
        </form>
      </div>
      <h4 className="mt-5 m-auto" >Don't have an account? <Link href={`/signup${!safeUrl ? "" : `?callbackUrl=${safeUrl}`}`} className="text-blue-600 underline hover:text-blue-800 backdrop-blur-none">Create one here.</Link></h4>
    </>
}