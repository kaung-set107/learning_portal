/* eslint-disable react/prop-types */
import { Spinner } from "@nextui-org/react";
const Loading = (props) => {
  const {color, size } = props
  return (
    <div><Spinner color={color ?? 'primary'} size={size ?? 'md'}/></div>
  )
}

export default Loading