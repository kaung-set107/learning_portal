import Head from "./head";
import Body from "./body";
import Nav from "../home/header";
import { useLocation } from "react-router-dom";
export default function App() {
  // const {state}=useLocation()
  // console.log(useLocation().state.rol,'lllll')
  return (
    <div className=''>
      {/* three card */}
      {/* <Head /> */}
      <Body />
      <div className='flwx text-center py-2'>
        <span>
          Copyright © 2023-2024 <b>K-win Technology</b>.All rights reserved.
        </span>
      </div>
    </div>
  );
}
