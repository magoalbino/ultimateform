import {ReactNode} from "react";

interface FormProps extends React.DetailedHTMLProps<React.FormHTMLAttributes<HTMLFormElement>, HTMLFormElement> {
  children: ReactNode;
}

export function Form({children, ...rest}: FormProps) {
  return (
    <form noValidate {...rest}>
      {children}
    </form>
  );
}