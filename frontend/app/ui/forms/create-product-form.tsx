import { Product } from "@/app/lib/definitions";
import { JSX } from "react";

export default function CreateProductForm(props: {styles: string, action: (formData: FormData) => Promise<void>, onSubmit?: ()=>void, buttonsDiv: JSX.Element, product: Product | undefined}) {
    const product = props.product;
    return <form className={props.styles} action={props.action} onSubmit={props.onSubmit}>
        <div>
            <label htmlFor="name">Name: </label>
            <input type="text" name="name" className="border-1 px-1" defaultValue={product?.name} placeholder="Product Name..."/>
        </div>
        <div className="my-1">
            <label htmlFor="price">Price: </label>
            <input type="number" name="price" className="border-1 px-1" step={0.01} min={0.01} max={10000} defaultValue={product?.price ?? 1}/>
        </div>
        <div>
            <label htmlFor="is-for-sale">Is For Sale: </label>
            <input type="checkbox" name="is-for-sale" defaultChecked={product?.isForSale} className="border-1 px-1" />
        </div>
        {props.buttonsDiv}
    </form>
}