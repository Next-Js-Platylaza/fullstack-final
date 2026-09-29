"use server";

import { getOrders, getProductById } from "../lib/actions";
import { Product } from "../lib/definitions";
import { isLoggedIn } from "../lib/session";
import OrdersDisplayDiv from "../ui/orders-display-div";

// start on the "Purchased Tab" and have a button to go to the "Sold Tab";
export default async function Home() {
  const userIsLoggedIn = await isLoggedIn();
  const ordersBought = userIsLoggedIn ? await getOrders(false) : [];
  const productsBought: Product[] = [];
  if (ordersBought) {
    for (let i = 0; i < ordersBought.length; i++) {
      const product = await getProductById(ordersBought[i].productId)
      if (product && !productsBought.includes(product))
        productsBought.push(product)
    }
  }

  const ordersSold = userIsLoggedIn ? await getOrders(true) : [];
  const productsSold: Product[] = [];
  if (ordersSold) {
    for (let i = 0; i < ordersSold.length; i++) {
      const product = await getProductById(ordersSold[i].productId)
      if (product && !productsSold.includes(product))
        productsSold.push(product)
    }
  }
  //const orders: Order[] = [{id: "0", productId: "0", quantity: 3, buyerEmail: "1@gmail.com", sellerEmail: "1234@gmail.com"}];
  return <OrdersDisplayDiv ordersSold={ordersSold} ordersPurchased={ordersBought} productsSold={productsSold} productsPurchased={productsBought}/> 
}