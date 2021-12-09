import {Stack} from "@mui/material";
import {ReactNode} from "react";

interface MainContainerProps {
  children: ReactNode;
}

export function MainContainer({children}: MainContainerProps) {
  return (
    <Stack maxWidth={'xs'} sx={{marginTop: 4}} alignItems={'center'} direction={'column'}>
      {children}
    </Stack>
  );
}