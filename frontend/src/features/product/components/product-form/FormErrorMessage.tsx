

const FormErrorMessage = ({ errorField }) => {
  return (
    <p className='field-error' style={{ padding: '5px 15px' }}>{errorField?.message}</p>
  )
}

export default FormErrorMessage