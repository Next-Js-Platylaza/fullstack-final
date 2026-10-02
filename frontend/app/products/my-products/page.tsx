"use server";

import CreateProductForm from "@/app/ui/forms/create-product-form";
import { getProductsSoldByUser, getOrders, createProduct } from "../../lib/actions";
import SellerProductDiv from "../../ui/seller-product-div";

// Add a "create new" button. When editing product, show  a delete button.
export default async function Home() {
  const products = await getProductsSoldByUser();
  const orders = await getOrders(true);
  //const products: Product[] = [{id: "0", name: "One Two Three Four", price: 12.34, sellerEmail: "1234@gmail.com", isForSale: false}]
  //const orders: Order[] = [{id: "0", productId: "0", quantity: 3, buyerEmail: "1@gmail.com", sellerEmail: "1234@gmail.com"}];
  return (<>
      <h1 className="font-bold text-2xl pt-1 py-3">Products</h1>
      <CreateProductForm
        styles="border-2 p-2 w-75 mb-5"
        action={createProduct}
        buttonsDiv={<div className="flex flex-row w-full">
            <div className="ml-auto">
                <button type="submit" className="btn">Create Product</button>
            </div>
          </div>}
        product={undefined}
      />
      <div className={`
      ${products?.length == 1 ? "grid-cols-1" : products?.length == 2 ? "grid-cols-2" : "grid-cols-3"}
      flex grid gap-2 max-lg:grid-cols-1 max-2xl:grid-cols-2`}>
      {products?.map((product) => 
        <SellerProductDiv product={product} orders={orders?.filter((order) => order.productId == product.id)} key={product.id}/>
      )}
      </div>
      {/*<SellerProductDiv product={{id: "0", name: "One Two Three Four", price: 12.34, sellerEmail: "1234@gmail.com", isForSale: false}} orders={undefined}/>*/}
    </>
  );
}