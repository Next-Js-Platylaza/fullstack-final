import Link from "next/link";
import { createAccount } from "../lib/actions";

export default function SignupForm(){
    return <><div className="flex flex-col gap-[32px]">
          <form className="w-full" action={createAccount}>
            <div className="border-1 border-black my-1">
              <label htmlFor="email">Email:</label>
              <input type="text" name="email"></input>
            </div>
            <div className="border-1 border-black my-1">
              <label htmlFor="password">Password:</label>
              <input type="password" name="password"></input>
            </div>
            <button type="submit" className="w-full border-1 p-1 my-1">Create Account</button>
          </form>
          </div>
          <h4 className="mt-5 m-auto" >Already have an account? <Link href="/login" className="text-blue-600 underline hover:text-blue-800 backdrop-blur-none">Login here.</Link></h4>
        </>
}