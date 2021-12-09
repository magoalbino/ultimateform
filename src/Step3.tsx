import {MainContainer} from "./components/MainContainer";
import {Typography} from "@mui/material";
import {Form} from "./components/Form";
import {useNavigate} from "react-router-dom";
import {useForm} from "react-hook-form";
import {useData} from "./components/DataContext";
import {PrimaryButton} from "./components/PrimaryButton";
import {FileInput} from "./components/FileInput";

interface IStep2Form {
  files: File;
}

export function Step3() {
  const navigate = useNavigate()
  const {data, setFormValues} = useData()
  const { control, handleSubmit } = useForm<IStep2Form>({
    defaultValues: {
      files: data.files,
    }
  })

  const onSubmit = (data: IStep2Form) => {
    navigate('/result')
    setFormValues(data)
  }

  return (
    <MainContainer>
      <Typography> Step 3 </Typography>
      <Form onSubmit={handleSubmit(onSubmit)}>
        <FileInput name={'files'} control={control} />
        <PrimaryButton>
          Next
        </PrimaryButton>
      </Form>
    </MainContainer>
  );
}