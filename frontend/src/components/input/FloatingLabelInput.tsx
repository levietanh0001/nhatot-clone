import clsx from 'clsx';
import { useController, useFormContext } from 'react-hook-form';
import styles from './FloatingLabelInput.module.scss';
import useId from '@mui/material/utils/useId';

const FloatingLabelInput = (props) => {

  const {
    label = '',
    name = '',
    inputType = 'input',
    required = false,

    wrapperClass = '',
    contentClass = '',
    footerClass = '',
    labelClass = '',
    inputClass = '',

    inputValue = '',
    onInputValueChange = () => null,
    ...rest
  } = props;

  const id = useId();
  const { control, formState } = useFormContext();
  const { errors } = formState;
  const { field } = useController({ name, control });

  const handleChange = (event) => {
    field.onChange(event.target.value); // data send back to hook form
    onInputValueChange(event);
  }

  return (
    <div className={clsx(styles['field-wrapper'], wrapperClass)}>

      <div className={clsx(styles['field-content'], contentClass)}>
        <label className={clsx('sr-only', styles['floating-label'], labelClass)} htmlFor={id}>{label}</label>

        <Input
          inputType={inputType}
          className={clsx(styles['field-input'], inputClass)}
          id={id}
          placeholder=' '
          
          {...field}
          {...rest}
          value={inputValue}
          onChange={handleChange} // send value to hook form 
        />

        <span
          className={clsx(styles['floating-label'], {
            [styles['float-up']]: inputValue,
            required: required,
          })}
        >{label}</span>

      </div>
      
      <div className={clsx(styles['field-footer'], footerClass)}>
        {errors?.[name] && <p className={styles['error']}>{errors?.[name]?.message}</p>}
      </div>

    </div>
  );
};

const Input = ({ inputType, ...rest }) => {
  return (
    <>
      { inputType === 'input' && <input {...rest} /> }
      { inputType === 'textarea' && <textarea {...rest} /> }
    </>
  );
}

export default FloatingLabelInput;
