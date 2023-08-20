export default function SuccessMessage() {
  return (
    <>
      <button
        onClick={() => {
          console.log('login and redirect')
        }}
      >
        <div className='w-full h-full bg-grayLColor opacity-30 fixed z-10 top-0 left-0'></div>
        <div className='z-20 bg-secondaryColor dark:bg-grayLColor dark:text-secondaryColor fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 rounded-normal px-sm py-big border-accentColor dark:border-secondaryColor border-8 border-double'>
          <p className='text-h4'>Yahoooo!</p>
          <p>Your account has been succefully created!</p>
        </div>
      </button>
    </>
  )
}

