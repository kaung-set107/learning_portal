


export const Spinner = () => {
  return (
    <>
      <div style={{ backgroundColor: 'white', height: '100vh', opacity: '0.6' }}>
        <svg className='spinner' viewBox='0 0 50 50'>
          <circle className='path' cx='25' cy='25' r='20' fill='none' strokeWidth='5'>

          </circle>
        </svg>
      </div>
    </>
  )
}

export const formatDate = (originalDateStr) => {
  // Split the original date string and rearrange
  let parts = originalDateStr.split('-');
  let formattedDateStr = `${parts[2]}-${parts[1].padStart(2, '0')}-${parts[0].padStart(2, '0')}`;

  return formattedDateStr;
}