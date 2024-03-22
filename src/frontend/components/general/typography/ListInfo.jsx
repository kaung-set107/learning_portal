/* eslint-disable react/prop-types */
const ListInfo = ({title, className}) => {
  return (
    <div className={`font-semibold ${className}`}>{title}</div>
  )
}

export default ListInfo