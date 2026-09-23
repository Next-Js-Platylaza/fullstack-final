import Link from "next/link";
import { NavLink } from "./navbar";

export default function NavButton(props: {link: NavLink}){
    return <div className="flex justify-center bg-gray-300 w-30 h-full m-auto border-5 border-gray-700">
        <Link href={props.link.href} className="my-auto">{props.link.title}</Link>
    </div>
}