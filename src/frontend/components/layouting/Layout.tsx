import * as React from 'react';
import Footer from './Footer';
import Navbar from './Navbar';

interface ILayoutProps {
    children: React.ReactNode,
    color:string
}


const Layout: React.FunctionComponent<ILayoutProps> = ({ children,color }: ILayoutProps) => {
    return (
        <>
            <Navbar/>
            <div>
            {children}
            </div>
            <Footer color={color}/>
        </>
    )
};

export default Layout;