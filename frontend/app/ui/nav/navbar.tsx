"use client";
import { JSX } from "react";
import NavButton from "./nav-button"
import { usePathname } from "next/navigation";

export type NavLink = {
    href: string,
    title: string,
    isOnRightSide: boolean
}

export default function Navbar(props: {loginLogoutBtn: JSX.Element}){
    const links: NavLink[] = [
        {
            href: "/",
            title: "Home",
            isOnRightSide: false,
        },
        {
            href: "/products/my-products",
            title: "My Products",
            isOnRightSide: false,
        },
        {
            href: "/products",
            title: "Shopping",
            isOnRightSide: false,
        },
        {
            href: "/orders",
            title: "My Orders ",
            isOnRightSide: false,
        },
    ]
    
    const pathname = usePathname();

    return <div className="flex h-18 bg-gray-400 border-5 border-gray-500">
        <div className="flex pr-1.5 bg-gray-500">
            {links.filter(link => !link.isOnRightSide).map((link, index) => (<NavButton link={link} isSelected={pathname == link.href} key={index}/>))}
        </div>
        <div className="flex ml-auto pl-1.5 bg-gray-500">
            {links.filter(link => link.isOnRightSide).map((link, index) => (<NavButton link={link} isSelected={false} key={index}/>))}
            {props.loginLogoutBtn}
        </div>
    </div>
}