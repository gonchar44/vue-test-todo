export const getInputClass = (isError: boolean) => {
  return isError
    ? 'border-secondary-main focus:border-secondary-main text-secondary-main'
    : 'border-primary-light focus:border-primary-dark'
}
