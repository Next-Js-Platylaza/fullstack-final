import LoginLogoutButton from "./login-logout-button"
import NavButton from "./nav-button"

export type NavLink = {
    href: string,
    title: string,
    isOnRightSide: boolean
}

export default function Navbar(){
    const links: NavLink[] = [
        {
            href: "/",
            title: "Home",
            isOnRightSide: false,
        },
        {
            href: "/products",
            title: "Products",
            isOnRightSide: false,
        },
        {
            href: "/orders",
            title: "Orders",
            isOnRightSide: false,
        },
    ]

    return <div className="flex h-18 bg-gray-400 border-5 border-gray-500">
        <div className="flex">
            {links.filter(link => !link.isOnRightSide).map((link, index) => (<NavButton link={link} key={index}/>))}
        </div>
        <div className="flex ml-auto">
            {links.filter(link => link.isOnRightSide).map((link, index) => (<NavButton link={link} key={index}/>))}
            <LoginLogoutButton/>
        </div>
    </div>
}