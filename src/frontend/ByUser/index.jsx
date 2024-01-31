import Head from "./head";
import Body from "./body";
import Nav from "../home/header";
import Footer from "../../components/Navbar/footer";
import { useLocation } from "react-router-dom";
export default function App() {
  // const {state}=useLocation()
  // console.log(useLocation().state.rol,'lllll')
  return (
    <div className=' flex flex-col gap-4'>
      {/* three card */}
      <Nav />
      <Body />

      <Footer />
    </div>
  );
}
