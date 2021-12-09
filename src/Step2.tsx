import {MainContainer} from "./components/MainContainer";
import {Checkbox, FormControlLabel, Typography} from "@mui/material";
import {Form} from "./components/Form";
import {Input} from "./components/Input";
import {useForm} from "react-hook-form";
import {useNavigate} from "react-router-dom";
import {useData} from "./components/DataContext";
import * as yup from 'yup'
import {yupResolver} from "@hookform/resolvers/yup";
import {PrimaryButton} from "./components/PrimaryButton";

interface IStep2Form {
  email: string;
  hasPhone: boolean;
  phoneNumber?: string;
}


const normalizePhoneNumber = (event: { currentTarget: { maxLength: number; value: any; }; }) => {
  //return value.replace(/\s/g, "").match(/.{1,4}/g)?.join(" ").substring(0, 10) || ""
  event.currentTarget.maxLength = 14;
  let value = event.currentTarget.value;
  if (!value.match(/^(\d{3}).(\d{3}).(\d{3})-(\d{2})$/)) {
    value = value.replace(/\D/g, "");
    value = value.replace(/(\d{3})(\d)/, "$1.$2");
    value = value.replace(/(\d{3})(\d)/, "$1.$2");
    value = value.replace(/(\d{3})(\d{2})$/, "$1-$2");
    event.currentTarget.value = value;
  }
  return event
}

const schema = yup.object().shape({
  email: yup.string().email('Email should have correct format').required('Email is a required field'),
  hasPhone: yup.boolean(),
  phoneNumber: yup.number()
})

export function Step2() {
  const {data, setFormValues} = useData()
  const navigate = useNavigate()
  const {register, handleSubmit, watch, formState: {errors}} = useForm<IStep2Form>({
    defaultValues: {
      email: data.email,
      hasPhone: data.hasPhone,
      phoneNumber: data.phoneNumber
    },
    mode: 'onBlur',
    resolver: yupResolver(schema)
  })

  const hasPhone = watch('hasPhone')

  const onSubmit = (data: IStep2Form) => {
    navigate('/step3')
    setFormValues(data)
  }

  return (
    <MainContainer>
      <Typography>
        Step 2
      </Typography>
      <Form onSubmit={handleSubmit(onSubmit)}>
        <Input type={'email'} label={'Email'} required {...register('email')}
               error={!!errors.email}
               helperText={errors?.email?.message}/>

        <FormControlLabel control={
          <Checkbox defaultValue={data.hasPhone} defaultChecked={data.hasPhone}
                    color={'primary'} {...register('hasPhone')} />
        } label="Do you have a Phone"
        />

        {hasPhone &&
        <Input type={'tel'} label={'Phone Number'} placeholder={'000.000.000-00'}
               id={'phoneNumber'} {...register('phoneNumber')}
               onChange={normalizePhoneNumber}
        />}

        <PrimaryButton type={'submit'}>
          Next
        </PrimaryButton>
      </Form>
    </MainContainer>
  );
}