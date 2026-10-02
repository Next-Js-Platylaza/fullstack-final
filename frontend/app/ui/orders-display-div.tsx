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

    const ordersIsPlural = ordersPurchased?.length != 1

    return   (<div className="mb-auto mt-10 flex flex-col items-center">
    <div className="flex flex-col items-center mb-10">

      <h1 className="text-2xl">{isBuyerView ? "Purchased" : "Sold"} Orders:</h1>
      <button className="btn mt-3" onClick={handleViewToggle}>{isBuyerView ? "Sold" : "Purchased"} orders</button>
    </div>
      {isBuyerView ? <>
        <p className="my-2 text-lg">There {ordersIsPlural ? "are" : "is"} {ordersPurchased?.length } order{ordersIsPlural ? "s" : ""}</p>
        <div className="flex flex-col max-w-200 min-w-75">
          {ordersPurchased?.map((order, index) => 
              <OrderDiv order={order} key={index} isSeller={!isBuyerView} product={productsPurchased.filter((p)=>p.id == order.productId)[0]} />
          )}
        </div>
      </> : <>
        <p>There are {ordersSold?.length} orders</p>
        <div className="flex flex-col max-w-200 min-w-75">
          {ordersSold?.map((order, index) => 
              <OrderDiv order={order} key={index} isSeller={!isBuyerView} product={productsSold.filter((p)=>p.id == order.productId)[0]} />
          )}
        </div>
      </>}
    </div>
  );
}