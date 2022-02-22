import { Menu } from 'semantic-ui-react'
import { useRouter } from "next/router"
import Link from 'next/link'
export default function Gnb() {
    const router = useRouter()
    let activeItem
    if (router.pathname === '/'){
        activeItem = "home"
    }else if (router.pathname === '/about'){
        activeItem = "about"
    }else if (router.pathname === '/a'){
        activeItem = "error"
    }

    return(
        <Menu>
            <Link href = "/">
            <Menu.Item
                name='home'
                active={activeItem == 'home'}
            >
                Home
            </Menu.Item>
            </Link>
            <Link href={"/about"}>
            <Menu.Item
                name='about'
                active={activeItem == 'about'}
            >
                About
            </Menu.Item>
            </Link>
            <Link href={"/a"}>
                <Menu.Item
                    name='error'
                    active={activeItem == 'error'}
                >
                    Error
                </Menu.Item>
            </Link>
        </Menu>
    )
}