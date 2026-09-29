import Link from "next/link";
import { NavLink } from "./navbar";

export default function NavButton(props: {link: NavLink, isSelected: boolean}){
    return <Link href={props.link.href} className={`nav-btn ${props.isSelected ? "selected" : ""}`}>{props.link.title}</Link>
}