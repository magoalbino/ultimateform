import {Button} from "@mui/material";
import {ButtonProps} from "@mui/material/Button/Button";
import {ReactNode} from "react";

interface PrimaryButtonProps extends ButtonProps {
  children: ReactNode;
  type?: "button" | "submit" | "reset" | undefined;
}

export const PrimaryButton = ({children, type, ...rest}: PrimaryButtonProps) => {
  return (
    <Button fullWidth variant={'contained'} color={'primary'} {...rest} type={type || 'submit'}>
      {children}
    </Button>
  );
}