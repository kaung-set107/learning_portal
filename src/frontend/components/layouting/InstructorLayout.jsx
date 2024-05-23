import { Outlet } from "react-router-dom"
import { useState } from "react"
import Loading from "../general/Loading"
import Sidebar from "../../../components/Sidebar"

const InstructorLayout = () => {
    const [isLoading, setIsLoading] = useState(false)

    let content

    if (isLoading) {
        content = (<Loading />)
    }
    

    if (!isLoading) {
        content = (
            <div className="flex gap-3 relative">
                <div className="">
                    <Sidebar />
                </div>
                <div className="w-full py-12">
                    <div className="p-6">
                        <Outlet />
                    </div>
                </div>
                
                {/* this is modal */}
                <div>
                    
                </div>
            </div>
        )
    }

    return content
}

export default InstructorLayout
