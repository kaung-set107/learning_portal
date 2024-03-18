/* eslint-disable react/prop-types */
import { Spinner } from "@nextui-org/react";
const Loading = (props) => {
  const {color, size } = props
  return (
    <div><Spinner color={color ?? 'default'} size={size ?? 'md'}/></div>
  )
}

export default Loading