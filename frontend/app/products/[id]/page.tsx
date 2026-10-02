"use server";

import BuyProductDiv from "@/app/ui/buy-product-div";
import { getOrders, getProductById } from "@/app/lib/actions";
import { Product } from "@/app/lib/definitions";
import { isLoggedIn } from "@/app/lib/session";
import ProductDiv from "@/app/ui/product-div";
import Link from "next/link";

interface PageProps {
  params: Promise<{ id: string }>;
}

export default async function Home({ params }: PageProps) {
  const { id: productId } = await params;

  const userIsLoggedIn = await isLoggedIn();
  const product = userIsLoggedIn && productId ? await getProductById(productId) : null;
  
  //const product: Product = {id: "0", name: "One Two Three Four", price: 12.34, sellerEmail: "1234@gmail.com", isForSale: true}
  return (<>
      {
        !userIsLoggedIn ? (
          <p>You must be logged in to purchase a product.</p> 
         ) : !product ? (
          <p>Could not find product.</p> 
        ) : (
          <BuyProductDiv product={product}/>
      )}
        
      <Link href="/products" className="btn mt-10">Cancel and return to products.</Link>
    </>
  );
}