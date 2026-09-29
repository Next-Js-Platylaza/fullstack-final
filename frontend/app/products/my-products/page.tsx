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
      <h1>Products</h1>
      <p>There are {orders?.length} products</p>
      <CreateProductForm
        styles="border-2 p-2 w-75 mb-2"
        action={createProduct}
        buttonsDiv={<div className="flex flex-row w-full">
            <div className="ml-auto">
                <button type="submit">Create Product</button>
            </div>
          </div>}
        product={undefined}
      />
      {products?.map((product, index) => 
        <SellerProductDiv product={product} orders={orders?.filter((order) => order.productId == product.id)} key={index}/>
      )}
      {/*<SellerProductDiv product={{id: "0", name: "One Two Three Four", price: 12.34, sellerEmail: "1234@gmail.com", isForSale: false}} orders={undefined}/>*/}
    </>
  );
}