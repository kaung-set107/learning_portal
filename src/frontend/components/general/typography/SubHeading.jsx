/* eslint-disable react/prop-types */
const SubHeading = (props) => {
    let { title, className } = props
    return (
        <h3 className={`font-bold text-xl ${className}`}>{title}</h3>
    )
}

export default SubHeading