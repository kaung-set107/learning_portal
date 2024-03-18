import Body from "./sub-detail-body";
import Nav from "./sub-detail-head";
import Footer from "../../../components/Navbar/footer";
import { useLocation } from "react-router-dom";
export default function App() {
  const location = useLocation();
  const SubData = location.state?.data;
  // console.log(SubData, "sub ii");

  return (
    <div className=''>


      <Body subData={SubData} />

      <div className=''>
        {/* <Footer /> */}
      </div>

    </div>
  );
}
