export function validateDate(dateString: string): string | undefined {
  const today: Date = new Date();
  const inputDate: Date = new Date(dateString);
  const minDate: Date = new Date();
  minDate.setFullYear(today.getFullYear() - 13);
  const minAllowedDate: Date = new Date('1900-01-01');

  if (isNaN(inputDate.getTime())) {
    return 'Enter the correct date.';
  } else if (inputDate > today) {
    return 'The date of birth cannot be in the future.';
  } else if (inputDate > minDate) {
    return 'You must be at least 13 years old.';
  } else if (inputDate < minAllowedDate) {
    return 'The date cannot be before 1900.';
  }
}
