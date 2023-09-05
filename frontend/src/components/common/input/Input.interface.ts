
export interface ISelectInput {
  children: React.ReactNode;

  name?: string;
  label?: string;
  required?: boolean;
  wrapperClass?: string;
  labelClass?: string;
  inputWrapperClass?: string;

  inputValue?: string;
  onInputValueChange?: React.ChangeEventHandler<HTMLSelectElement>;

  [x:string]: any;
}
