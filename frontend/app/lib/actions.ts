"use server";

import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";

export async function createAccount(formData: FormData) {
    const email = formData.get("email");
    const password = formData.get("password");

    try {
        const result = await fetch("http://localhost:3000/signup", {
            method: "POST",
            body: JSON.stringify({
                email, 
                password
            }),
            headers: {
                "Content-Type": "application/json",
            }
        })
    } catch (err) {
        redirect("/");
    }
    
    redirect("/login");
}

export async function login(formData: FormData) {
    const email = formData.get("email");
    const password = formData.get("password");

    try{
        const result = await fetch("http://localhost:3000/login", {
            method: "POST",
            body: JSON.stringify({
                email,
                password
            }),
            headers: {
                "Content-Type": "application/json",
            },
        })

        const responseJSON = await result.json();
        const token = responseJSON.token;

        const cookiesStore = await cookies();
        cookiesStore.set("token", token);
    } catch (err) {
        console.log("error");
        console.log(err);
    }

    redirect("/products");
}

export async function logout(formData: FormData) {
    try {
        const cookiesStore = await cookies();
        cookiesStore.delete("token");
    } catch (err) {
        console.log("error");
        console.log(err);
    }

    redirect("/login");
}