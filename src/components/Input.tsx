import {forwardRef} from "react";
import {TextField} from "@mui/material";
import {TextFieldProps} from "@mui/material/TextField/TextField";

export const Input = forwardRef((props: TextFieldProps, ref) => {
  return <TextField variant={'outlined'} margin={'normal'} inputRef={ref} fullWidth {...props} />
})