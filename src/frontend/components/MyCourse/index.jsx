import Body from "./sub-detail-body";
import Nav from "./sub-detail-head";
import Footer from "../../../components/Navbar/footer";
import { useLocation } from "react-router-dom";
export default function App() {
  const location = useLocation();
  const SubData = location.state?.data;
  console.log(SubData, "sub ii");
  //   const SubData = location.state.data;
  // const {state}=useLocation()
  //   console.log(useLocation().state.rol,'lllll')
  return (
    <div className=' flex flex-col gap-4'>
      {/* three card */}
      {/* <Nav /> */}

      <Body subData={SubData} />

      <div className=''>
        <Footer />
      </div>

    </div>
  );
}
