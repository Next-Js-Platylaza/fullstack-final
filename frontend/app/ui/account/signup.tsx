"use client"

import Link from "next/link";
import { AccountFormState, createAccount } from "../../lib/actions";
import { useActionState, useState } from "react";
import AccountCredentialsInput from "./account-credentials-input";
import { useSearchParams } from "next/navigation";

export default function SignupForm(){
    const searchParams = useSearchParams();
    const rawCallbackUrl = searchParams.get("callbackUrl");
    
    const isSafeRedirect = rawCallbackUrl && rawCallbackUrl.startsWith("/") && !rawCallbackUrl.startsWith("//");
    const safeUrl = isSafeRedirect ? rawCallbackUrl : null;

    const initialState: AccountFormState = {error: null};
    const [formState, formAction, isPending] = useActionState(createAccount, initialState)
    
    const [doShowPass, setDoShowPass] = useState(false);

    return <><div className="flex flex-col gap-[32px]">
      <form className="w-full flex flex-col border-2 p-4" action={formAction}>
        <AccountCredentialsInput formState={formState} doShowPass={doShowPass} setDoShowPass={setDoShowPass}/>
        <button type="submit" className="btn-w-full mt-2" onClick={()=>setDoShowPass(false)}>Create Account</button>
      </form>
    </div>
    <h4 className="mt-5 m-auto" >Already have an account? <Link href={`/login${!safeUrl ? "" : `?callbackUrl=${safeUrl}`}`} className="text-blue-600 underline hover:text-blue-800 backdrop-blur-none">Login here.</Link></h4>
  </>
}