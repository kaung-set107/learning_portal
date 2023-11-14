
import Head from './head'
import Body from './addBody'
import Nav from '../home/header'
export default function App() {

  return (
    <div className=''>
    <Nav/>
    {/* three card */}
<Head />
<Body/>
<div className='flwx text-center py-2'>
  <span>Copyright © 2023-2024 <b>K-win Technology</b>.All rights reserved.</span>
</div>
    </div>
    
  );
}
