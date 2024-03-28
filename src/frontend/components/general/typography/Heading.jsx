/* eslint-disable react/prop-types */
const Heading = (props) => {
    let { title, className } = props
    return (
        <h3 className={`font-bold text-3xl ${className}`}>{title}</h3>
    )
}

export default Heading