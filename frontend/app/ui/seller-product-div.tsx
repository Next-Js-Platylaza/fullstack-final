"use client";
import { useState } from "react";
import { Order, Product } from "../lib/definitions";
import OrderDiv from "./order-div";
import CreateProductForm from "./forms/create-product-form";
import { deleteProductWithId, updateProduct } from "../lib/actions";
import OrderDivMinimal from "./order-div-minimal";

export default function SellerProductDiv(props: {product: Product, orders: Order[] | undefined}){
    const product = props.product;
    const orders = props.orders;
    
    let soldText: string;
    if (orders?.length == 0)
        soldText = "No orders sold yet."
    else
        soldText = `${orders?.length}  order${orders?.length == 1 ? "" : "s"} sold.`;

    const [isEditing, setIsEditing] = useState(false);
    function handleEditingToggle() {
        setIsEditing((e) => e = !e)
    }

    const [isOpen, setIsOpen] = useState(false);
    function handleOrdersToggle() {
        setIsOpen((o) => o = !o);
    }

    return <div className="border-2 p-2 w-95 my-0.5 bg-slate-100">
        {isEditing ? <>
        {/* Is Editing */}
        <CreateProductForm 
            styles=""
            action={updateProduct}
            onSubmit={handleEditingToggle}
            buttonsDiv={<div className="flex flex-row w-full">
                <button type="button" onClick={()=>{deleteProductWithId(product.id)}} className="mr-auto btn mt-2">Delete</button>
                <div className="ml-auto">
                    <button type="button" onClick={handleEditingToggle} className="btn mt-2 mr-1">Cancel</button>
                    <button type="submit" className="btn mt-2">Save</button>
                    <input type="text" name="id" value={product.id} readOnly hidden/>
                </div>
            </div>}
            product={product}
        />
        
        </> : <>
        {/* Is NOT Editing */}
        <h3>- {product.name}</h3>
        <h4>${product.price}</h4>
        <h4>{soldText}</h4>
        {orders?.length ?? 0 > 0 ? <div className="group flex flex-col items-start gap-1 rounded border-2 px-2 py-2  bg-white">
            <button className="text-left flex w-full" onClick={handleOrdersToggle}>
                Orders ({orders?.length ?? 0})
                <span className={`inline-block transition-transform duration-250 ${isOpen ? 'rotate-0' : '-rotate-90'}`}>
                    &#9662;
                </span>
                {isOpen ? null : <p className="ml-auto -mr-0.5 -mt-1 text-sm italic">
                    (collapsed)
                    </p>}
            </button>
            <div className="flex flex-col self-center">
                {isOpen ? orders?.map((order, index)=>
                    <OrderDivMinimal order={order} key={index}/>
                ) : <></>}
            </div>
        </div> 
        : null }
        
        <button onClick={handleEditingToggle} className="btn mt-2">Edit</button>
        </>}
    </div>
}