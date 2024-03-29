import { PropTypes } from 'prop-types'
export default function FormAction({
  handleSubmit,
  type = 'Button',
  action = 'submit',
  text
}) {
  return (
    <>
      {type === 'Button' ? (
        <button
          type={action}
          className='group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-[12px] text-white bg-[#053CFF] hover:bg-[#053bffdf] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500 mt-10'
          onSubmit={handleSubmit}
        >
          {text}
        </button>
      ) : (
        <></>
      )}
    </>
  )
}
FormAction.propTypes = {
  handleSubmit: PropTypes.string,
  type: PropTypes.string,
  action: PropTypes.string,
  text: PropTypes.string
}
