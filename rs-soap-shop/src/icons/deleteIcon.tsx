function DeleteIcon() {
  return (
    <svg
      className='h-8 w-8 stroke-current text-grayLColor hover:text-accentColor dark:text-primaryColor dark:hover:text-accentColor transition cursor-pointer'
      width='30px'
      height='30px'
      viewBox='0 0 24 24'
      fill='none'
    >
      <path
        d='M9 5C9 3.89543 9.89543 3 11 3H13C14.1046 3 15 3.89543 15 5V7H9V5Z'
        strokeWidth='2'
        strokeLinecap='round'
        strokeLinejoin='round'
      />
      <path
        d='M9 5H7C5.89543 5 5 5.89543 5 7V19C5 20.1046 5.89543 21 7 21H10M15 5H17C18.1046 5 19 5.89543 19 7V12'
        strokeWidth='2'
        strokeLinecap='round'
        strokeLinejoin='round'
      />
      <path
        d='M14 16L16.5 18.5M19 21L16.5 18.5M16.5 18.5L19 16M16.5 18.5L14 21'
        strokeWidth='2'
        strokeLinecap='round'
        strokeLinejoin='round'
      />
    </svg>
  );
}

export default DeleteIcon;
