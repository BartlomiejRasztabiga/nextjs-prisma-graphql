import Link from "next/link";
import {signOut} from "next-auth/react";
import {useRouter} from "next/router";
import Navigation from "./Navigation";

const Layout = (props) => {
        const router = useRouter();

        function isActive(pathname) {
            return router.pathname === pathname;
        }

        return (
            <div>
                <div className="drawer">
                    <input id="my-drawer-3" type="checkbox" className="drawer-toggle"/>
                    <div className="drawer-content flex flex-col">
                        <div className="w-full navbar bg-base-300">
                            <div className="flex-none lg:hidden">
                                <label htmlFor="my-drawer-3" className="btn btn-square btn-ghost">
                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"
                                         className="inline-block w-6 h-6 stroke-current">
                                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                              d="M4 6h16M4 12h16M4 18h16"/>
                                    </svg>
                                </label>
                            </div>
                            <div className="flex-1 px-2 mx-2">Navbar Title</div>
                            <div className="flex-none hidden lg:block">
                                <nav className="menu menu-horizontal">
                                    <Navigation/>
                                </nav>
                            </div>
                        </div>
                        <div className="layout">{props.children}</div>
                    </div>
                    <div className="drawer-side">
                        <label htmlFor="my-drawer-3" className="drawer-overlay"/>
                        <nav className="menu p-4 overflow-y-auto w-80 bg-base-100">
                            <Navigation/>
                        </nav>
                    </div>
                </div>
                <style jsx global>{`
                  html {
                    box-sizing: border-box;
                  }

                  *,
                  *:before,
                  *:after {
                    box-sizing: inherit;
                  }

                  body {
                    margin: 0;
                    padding: 0;
                    font-size: 16px;
                    font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto,
                    Helvetica, Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji",
                    "Segoe UI Symbol";
                    background: rgba(0, 0, 0, 0.05);
                  }

                  input,
                  textarea {
                    font-size: 16px;
                  }

                  button {
                    cursor: pointer;
                  }
                `}</style>
                <style jsx>{`
                  .layout {
                    padding: 0 2rem;
                  }
                `}</style>
            </div>
        )
    }
;

export default Layout;
