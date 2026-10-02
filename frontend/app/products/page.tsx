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
      <h1 className="font-bold text-2xl pt-1 py-4">Products</h1>
      <div className="grid grid-cols-4 gap-2 max-sm:grid-cols-1 max-lg:grid-cols-2 max-2xl:grid-cols-3">
        {products?.map((product, index) => 
          <ProductDiv product={product} orders={orders?.filter((order, index) => order.productId == product.id)} key={index}/>
        )}
      </div>
    </>
  );
}