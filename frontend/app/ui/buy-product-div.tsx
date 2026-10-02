import { Product } from "../lib/definitions";
import { createOrder } from "../lib/actions";

export default function BuyProductDiv(props: {product: Product}){
    const product = props.product;

    return <div className="border-2 p-2 bg-gray-100 min-w-90">
        <h3>- {product.name}</h3>
        <h4>${product.price} each</h4>
        <h4>Seller: {product.sellerEmail}</h4>
        <hr className="m-2"/>
        
        <form action={createOrder} className="flex mt-3">
            <div>
                <label htmlFor="quantity">Quantity: </label>
                <input type="number" name="quantity" className="border-1 px-1" min={1} max={100} defaultValue={1}/>
            </div>
            <span className="ml-auto"/>
            <button type="submit" className="ml-auto btn">Place Order</button>

            <input type="text" value={product.id} name="product-id" readOnly hidden/>
            <input type="text" value={product.sellerEmail} name="seller-email" readOnly hidden/>
        </form>
    </div>
}