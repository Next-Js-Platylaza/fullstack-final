"use server";

import { getOrders, getProductsForSale } from "../lib/actions";
import { Product } from "../lib/definitions";
import { isLoggedIn } from "../lib/session";
import ProductDiv from "../ui/product-div";

export default async function Home() {
  const products = await getProductsForSale();
  const userIsLoggedIn = await isLoggedIn();
  console.log(products?.length);
  console.log(products?.[0]);
  //const products: Product[] = [{id: "0", name: "One Two Three Four", price: 12.34, sellerEmail: "1234@gmail.com", isForSale: true}]
  const orders = userIsLoggedIn ? await getOrders(true) : [];
  return (<>
      <h1>Products</h1>
      <p>There are {products?.length} products</p>
      {products?.map((product, index) => 
        <ProductDiv product={product} orders={orders?.filter((order, index) => order.productId == product.id)} key={index}/>
      )}
    </>
  );
}