import { Order, Product } from "../lib/definitions";

export default function OrderDiv(props: {order: Order, isSeller: boolean, product: Product | undefined}){
    const order = props.order;
    return <div className="border-1 my-0.5 px-2 bg-gray-100">
        <h2>Item Name: {props.product?.name}</h2>
        <h3>Amount: {order.quantity}</h3>
        {props.product ? (
            <h3>Cost: ${(props.product.price * order.quantity).toFixed(2)} <span className="ml-1 text-sm italic">(${props.product?.price} each)</span></h3>
        ) : <></>}
        {props.isSeller
            ? <h3>Purchased by: {order.buyerEmail}</h3>
            : <h3>Sold by: {order.sellerEmail}</h3>
        }
    </div>
}