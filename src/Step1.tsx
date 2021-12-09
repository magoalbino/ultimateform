import {useForm} from "react-hook-form";
import {useNavigate} from "react-router-dom";
import {MainContainer} from "./components/MainContainer";
import {Form} from "./components/Form";
import {Input} from "./components/Input";
import {PrimaryButton} from "./components/PrimaryButton";
import {Typography} from "@mui/material";
import * as yup from 'yup'
import {yupResolver} from "@hookform/resolvers/yup";
import {useData} from "./components/DataContext";

interface IStep1Form {
  firstName: string;
  lastName: string;
}

// const useYupValidationResolver = validationSchema =>
//   useCallback(
//     async data => {
//       try {
//         const values = await validationSchema.validate(data, {
//           abortEarly: false
//         });
//
//         return {
//           values,
//           errors: {}
//         };
//       } catch (errors) {
//         return {
//           values: {},
//           errors: errors.inner.reduce(
//             (allErrors, currentError) => ({
//               ...allErrors,
//               [currentError.path]: {
//                 type: currentError.type ?? "validation",
//                 message: currentError.message
//               }
//             }),
//             {}
//           )
//         };
//       }
//     },
//     [validationSchema]
//   );

const schema = yup.object().shape({
  firstName: yup.string().required('First name is a required').matches(/^([^0-9]*)$/, 'First name should not contain numbers'),
  lastName: yup.string().required('Last name is a required field').matches(/^([^0-9]*)$/, 'Last name should not contain numbers')
})

export function Step1() {
  const { data, setFormValues} = useData()
  const {register, handleSubmit, formState: {errors}} = useForm<IStep1Form>({
    defaultValues: {firstName: data.firstName, lastName: data.lastName},
    mode: 'onBlur',
    resolver: yupResolver(schema)
  })
  const navigate = useNavigate()

  const onSubmit = (data: IStep1Form) => {
    console.log(data);
    setFormValues(data)
    navigate('/step2')
  }

  return (
    <MainContainer>
      <Typography variant={'h5'}>Step 1</Typography>
      <Form onSubmit={handleSubmit(onSubmit)}>
        <Input type="text" placeholder={'First Name'} {...register('firstName')} error={!!errors.firstName}
               helperText={errors?.firstName?.message}/>
        <Input type="text" placeholder={'Last Name'} {...register('lastName')} error={!!errors.lastName}
               helperText={errors?.lastName?.message}/>
        <PrimaryButton type={'submit'}>Next</PrimaryButton>
      </Form>
    </MainContainer>
  );
}