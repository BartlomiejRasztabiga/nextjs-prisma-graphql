/* This example requires Tailwind CSS v2.0+ */
import Navbar from "./Navbar";

export default function Layout(props) {
  return (
    <>
      <div className="min-h-full">
        <Navbar />
        <main>{props.children}</main>
      </div>
    </>
  );
}
