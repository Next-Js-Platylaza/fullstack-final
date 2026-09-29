import { Order } from "../lib/definitions";

export default function OrderDivMinimal(props: {order: Order}){
    const order = props.order;
    return <div className="border-1 my-0.5 px-2">
        <h3>Amount: {order.quantity}</h3>
        <h3>Purchased by: {order.buyerEmail}</h3>
    </div>
}