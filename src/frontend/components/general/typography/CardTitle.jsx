/* eslint-disable react/prop-types */
const CardTitle = (props) => {
    const {title, className} = props
  return (
    <h3 className={`font-bold text-lg capitalize mb-3 ${className}`}>{title}</h3>
  )
}

export default CardTitle