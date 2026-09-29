"use client"

import { AccountFormState, createAccount } from "../../lib/actions";
import { Dispatch, SetStateAction, useActionState, useState } from "react";
import { Eye, EyeOff } from "lucide-react";
import { useSearchParams } from "next/navigation";

export default function AccountCredentialsInput(props: {formState: AccountFormState, doShowPass: boolean, setDoShowPass: Dispatch<SetStateAction<boolean>>}){
    const searchParams = useSearchParams();
    const rawCallbackUrl = searchParams.get("callbackUrl");
    
    const isSafeRedirect = rawCallbackUrl && rawCallbackUrl.startsWith("/") && !rawCallbackUrl.startsWith("//");
    const safeUrl = isSafeRedirect ? rawCallbackUrl : null;

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    return <>
            <div className="flex items-center border-1 border-black my-1 h-10 px-1">
              <label htmlFor="email">Email:</label>
              <input type="text" name="email" onChange={(e)=>setEmail(e.target.value)} value={email} className="mx-1"/>
            </div>
            <div className="flex items-center border-1 border-black my-1 h-10 px-1">
              <label htmlFor="password">Password:</label>
              <input
                type={`${props.doShowPass ? "text" : "password"}`}
                name="password"
                onChange={(e)=>setPassword(e.target.value)}
                value={password}
                className="mx-1"
                />
              <button
                type="button"
                onClick={()=>{props.setDoShowPass((s) => s = !s);}}
                aria-label="Show password button"
                className="btn"
              >
              { props.doShowPass ? (
                <EyeOff className="w-5 h-5" />
              ) : (
                <Eye className="w-5 h-5" />
              ) }
            </button>
            </div>
            {props.formState.error ? <p className="bg-red-50 border-1 text-red-600 px-2 py-2 rounded-md text-sm font-semibold mt-2 flex items-center">
              {props.formState.error}
            </p> : <></>}

            {!safeUrl ? null : <input type="text" name="callback-url" value={safeUrl} readOnly hidden/> }
          </>
}