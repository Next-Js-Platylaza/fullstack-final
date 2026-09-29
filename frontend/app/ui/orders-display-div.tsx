"use client"
import { useState } from "react";
import { Order, Product } from "../lib/definitions";
import OrderDiv from "./order-div";

export default function OrdersDisplayDiv(props: {ordersSold: Order[] | undefined, ordersPurchased: Order[] | undefined, productsSold: Product[], productsPurchased: Product[]}){
    const ordersSold = props.ordersSold;
    const ordersPurchased = props.ordersPurchased;
    const productsSold = props.productsSold;
    const productsPurchased = props.productsPurchased;

    const [isBuyerView, setIsBuyerView] = useState(true);
    function handleViewToggle() {
        setIsBuyerView((b) => b = !b);
    }


    return   (<>
      <h1>{isBuyerView ? "Purchased" : "Sold"} Orders</h1>
      <button className="border-1 px-1" onClick={handleViewToggle}>Click for {isBuyerView ? "sold" : "purchased"} orders</button>
      {isBuyerView ? <>
        <p>There are {ordersPurchased?.length} orders</p>
        {ordersPurchased?.map((order, index) => 
            <OrderDiv order={order} key={index} isSeller={!isBuyerView} product={productsPurchased.filter((p)=>p.id == order.productId)[0]} />
        )}
      </> : <>
        <p>There are {ordersSold?.length} orders</p>
        {ordersSold?.map((order, index) => 
            <OrderDiv order={order} key={index} isSeller={!isBuyerView} product={productsSold.filter((p)=>p.id == order.productId)[0]} />
        )}
      </>}
    </>
  );
}