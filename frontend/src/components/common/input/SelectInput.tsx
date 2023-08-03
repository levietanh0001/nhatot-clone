import clsx from 'clsx';
import styles from './SelectInput.module.scss';
import useId from '@mui/material/utils/useId';
import { useController, useFormContext } from 'react-hook-form';


interface ISelectInput {
  children: React.ReactNode;

  name?: string;
  label?: string;
  required?: boolean;
  wrapperClass?: string;
  labelClass?: string;
  inputWrapperClass?: string;

  inputValue?: string;
  onInputValueChange?: React.ChangeEventHandler<HTMLSelectElement>,
}


export const SelectInput: React.FC<ISelectInput> = (props) => {

  const id = useId();
  
  const {
    children,

    name = '',
    label,
    required = false,
    wrapperClass = '',
    labelClass = '',
    inputWrapperClass = '',

    inputValue,
    onInputValueChange = () => null,

    ...rest
  } = props;

  const { control, formState } = useFormContext();
  const { errors } = formState;
  const { field } = useController({ name, control });

  const handleChange = (event) => {
    field.onChange(event.target.value); // data send back to hook form
    onInputValueChange(event);
  }

  return (
    <div className={clsx(styles['wrapper'], wrapperClass)}>

      {label && <label className={clsx({'required': required}, styles['label'], labelClass)} htmlFor={id}>{label}</label>}
      
      <div className={clsx(styles['input-wrapper'], inputWrapperClass)}>
        
        <select
          id={id}
          // name={name}

          {...field}
          value={inputValue}
          onChange={handleChange}
          {...rest}
        >{children}</select>

        <span className={styles['dropdown-icon']}>
          <svg xmlns='http://www.w3.org/2000/svg' height='1em' viewBox='0 0 320 512'><path d='M137.4 374.6c12.5 12.5 32.8 12.5 45.3 0l128-128c9.2-9.2 11.9-22.9 6.9-34.9s-16.6-19.8-29.6-19.8L32 192c-12.9 0-24.6 7.8-29.6 19.8s-2.2 25.7 6.9 34.9l128 128z' /></svg>
        </span>
      </div>

    </div>
  )
}

export const SelectOption = (props) => {

  const {
    value = '',
    label = '',
    inputOptionClass = ''
  } = props;

  return (
    <option className={inputOptionClass} value={value}>{label}</option>
  )
}