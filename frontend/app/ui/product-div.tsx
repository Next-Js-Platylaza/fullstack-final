import Link from "next/link";
import { Order, Product } from "../lib/definitions";

export default function ProductDiv(props: {product: Product, orders: Order[] | undefined}){
    const product = props.product;
    const orders = props.orders;

    let soldText: string;
    if (orders?.length == 0)
        soldText = "No orders sold yet."
    else
        soldText = `${orders?.length}  order${orders?.length == 1 ? "" : "s"} sold.`;

    return <div className="border-2 p-2 my-0.5 bg-slate-100">
        <h3>- {product.name}</h3>
        <h4>${product.price} each</h4>
        <h4>{soldText}</h4>
        <h4>Seller: {product.sellerEmail}</h4>
        <Link href={`/products/${product.id}`} className="btn">Place Order</Link>
    </div>
}