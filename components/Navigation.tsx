import Link from "next/link";
import {useRouter} from "next/router";
import {signOut} from "next-auth/react";

const Header = () => {
    const router = useRouter();

    function isActive(pathname) {
        return router.pathname === pathname;
    }


    return (
        <div className={"flex items-stretch space-x-4"}>
            <Link href="/">
                <a className="bold" data-active={isActive("/")}>
                    Blog
                </a>
            </Link>
            <Link href="/drafts">
                <a data-active={isActive("/drafts")}>Drafts</a>
            </Link>
            <Link href="/signup">
                <a data-active={isActive("/signup")}>Signup</a>
            </Link>
            <Link href="/create">
                <a data-active={isActive("/create")}>+ Create draft</a>
            </Link>
            <button onClick={() => signOut()}>Sign out</button>
        </div>
    );
};

export default Header;
