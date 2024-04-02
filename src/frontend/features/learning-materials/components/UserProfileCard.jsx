/* eslint-disable react/prop-types */
import { getFile } from "../../../../util"

const UserProfileCard = (props) => {

    const {data} = props
  return (
    <div className="flex gap-3 items-center">
        {data.image ? <img src={getFile({payload: data.image})} alt="Profile image" className="w-[100px] h-[100px] rounded-full border shadow" /> : ''}
        <div className="font-semibold">
            <h3 className="font-bold text-xl">{data.name}</h3>
            <p>Code: {data.code}</p>
        </div>
    </div>
  )
}

export default UserProfileCard