import { PropTypes } from 'prop-types'
import { Button } from '@nextui-org/react'
export default function FormAction({
  handleSubmit,
  type = 'Button',
  action = 'submit',
  text
}) {
  return (
    <>
      {type === 'Button' ? (
        <Button
          type={action}
          className='group relative w-full flex justify-center py-2 px-4 border border-transparent text-lg font-medium rounded-[12px] bg-[#0B2743] text-[#fff] hover:bg-[#0e1a26] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500 mt-10'
          onSubmit={handleSubmit}
        >
          {text}
        </Button>
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
