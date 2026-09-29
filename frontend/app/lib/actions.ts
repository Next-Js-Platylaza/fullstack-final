"use server";

import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";
import { Order, Product } from "./definitions";
import { getLoggedInUser } from "./session";

export async function createAccount(prevState: AccountFormState, formData: FormData) {
    const email = formData.get("email") as string;
    const password = formData.get("password");
    const callbackUrl = formData.get("callback-url") as string ?? "/products";

    try {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

        if (!email) return {error: "Email missing."};
        if (!emailRegex.test(email)) return {error: "Invalid email."};
        if (!password)  return {error: "Password missing."};

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

    // Login
    let isLoggedIn = false;
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

        if (token) isLoggedIn = true;
        else return {error: "Email or password is incorrect."};

        const cookiesStore = await cookies();
        cookiesStore.set("token", token);
    } catch (err) {
        console.log("error");
        console.log(err);
        return {error: "Failed to login, please try again later."}
    }

    if (isLoggedIn)
        redirect(callbackUrl);
    else
        redirect(`/login?callbackUrl=${callbackUrl}`);
}

export type AccountFormState = {
    error: string | null,
}
export async function login(prevState: AccountFormState, formData: FormData) {
    const email = formData.get("email") as string;
    const password = formData.get("password");
    const callbackUrl = formData.get("callback-url") as string ?? "/products";
    let isLoggedIn = false;

    try{
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

        if (!email) return {error: "Email missing."};
        if (!emailRegex.test(email)) return {error: "Invalid email."};
        if (!password)  return {error: "Password missing."};
    
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

        if (token) isLoggedIn = true;
        else return {error: "Email or password is incorrect."};

        const cookiesStore = await cookies();
        cookiesStore.set("token", token);
    } catch (err) {
        console.log("error");
        console.log(err);
        return {error: "Failed to login, please try again later."}
    }

    if (isLoggedIn)
        redirect(callbackUrl);
    else
        return {error: "Failed to login, please try again later."};
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

export async function getProductById(id: string): Promise<Product | undefined> {
    try {
        const cookieStore = await cookies();
        const token = cookieStore.get("token")?.value
        if (!token) throw new Error("Not logged in");

        const response = await fetch(`http://localhost:3000/products/${id}`, {
            method: "GET",
            headers: {
                "Authorization": `Bearer ${token}`
            }
        })

        const responseJSON = await response.json();
        return responseJSON.product;
    } catch (err) {
        console.log("error");
        console.log(err);
    }
}

export async function getProductsForSale(): Promise<Product[] | undefined> {
    try {
        const response = await fetch("http://localhost:3000/products-forsale", {
            method: "GET",
        })

        if (!response.ok) {
            // Read the error message text instead of crashing on JSON parsing
            const errorText = await response.text();
            console.error(`Backend returned server error (${response.status}):`, errorText);
            return undefined;
        }

        const responseJSON = await response.json();
        return responseJSON.products;
    } catch (err) {
        console.log("error");
        console.log(err);
    }
}

export async function getProductsSoldByUser(): Promise<Product[] | undefined> {
    try {
        const cookieStore = await cookies();
        const token = cookieStore.get("token")?.value
        if (!token) throw new Error("Not logged in");

        const response = await fetch("http://localhost:3000/products", {
            method: "GET",
            headers: {
                "Authorization": `Bearer ${token}`
            }
        })

        const responseJSON = await response.json();
        return responseJSON.products;
    } catch (err) {
        console.log("error");
        console.log(err);
    }
}

export async function createProduct(formData: FormData) {
    const name = formData.get("name");          
    const price = Number(formData.get("price"));      
    const isForSale = formData.get("is-for-sale");      

    try {
        const cookieStore = await cookies();
        const token = cookieStore.get("token")?.value
        const user = await getLoggedInUser();

        await fetch("http://localhost:3000/products", {
            method: "POST",
            headers: {
                "Authorization": `Bearer ${token}`,
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                  name,
                  price,
                  isForSale: isForSale !== null,
            })
        })
    } catch (err) {
        console.log("error");
        console.log(err);
    }

    revalidatePath("/products");
}

export async function updateProduct(formData: FormData) {
    const id = formData.get("id");          
    const name = formData.get("name");          
    const price = Number(formData.get("price"));   
    const isForSale = formData.get("is-for-sale");            

    console.log("id");
    console.log(id);

    try {
        const cookieStore = await cookies();
        const token = cookieStore.get("token")?.value
        if (!token) throw new Error("Not logged in");

        await fetch(`http://localhost:3000/products/${id}`, {
            method: "PUT",
            headers: {
                "Authorization": `Bearer ${token}`,
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                name,
                price,
                isForSale: isForSale !== null,
            })
        })
    } catch (err) {
        console.log("error");
        console.log(err);
    }

    revalidatePath("/products");
}

export async function deleteProductWithId(id: string) {
    try {
        const cookieStore = await cookies();
        const token = cookieStore.get("token")?.value
        if (!token) throw new Error("Not logged in");

        await fetch(`http://localhost:3000/products/${id}`, {
            method: "DELETE",
            headers: {
                "Authorization": `Bearer ${token}`,
                "Content-Type": "application/json"
            },
        })
    } catch (err) {
        console.log("error");
        console.log(err);
    }

    revalidatePath("/products");
}


export async function getOrders(isSeller: boolean): Promise<Order[] | undefined> {
    try {
        const cookieStore = await cookies();
        const token = cookieStore.get("token")?.value
        if (!token) throw new Error("Not logged in");

        const response = await fetch(`http://localhost:3000/orders?isSeller=${isSeller}`, {
            method: "GET",
            headers: {
                "Authorization": `Bearer ${token}`
            }
        })

        const responseJSON = await response.json();
        return responseJSON.orders;
    } catch (err) {
        console.log("error");
        console.log(err);
    }
}
export async function createOrder(formData: FormData) {
    const productId = formData.get("product-id");          
    const quantity = Number(formData.get("quantity"));      
    const sellerEmail = formData.get("seller-email");      

    try {
        const cookieStore = await cookies();
        const token = cookieStore.get("token")?.value
        const user = await getLoggedInUser();

        await fetch("http://localhost:3000/orders", {
            method: "POST",
            headers: {
                "Authorization": `Bearer ${token}`,
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                  productId,
                  quantity,
                  buyerEmail: user.email,
                  sellerEmail,
            })
        })
    } catch (err) {
        console.log("error");
        console.log(err);
    }

    redirect("/orders");
}