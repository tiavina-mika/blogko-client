import Box from '@mui/material/Box';
import { Stack, TextField, Typography } from '@mui/material';
import { zodResolver } from '@hookform/resolvers/zod';
import { useNavigate } from 'react-router-dom';
import { useMutation } from '@tanstack/react-query';
import { SubmitHandler, useForm } from 'react-hook-form';

import { goToLogin, signUp } from '../../actions/auth';
import { SignUpInput } from '../../types/auth.type';
import { loginSchema } from '../../utils/vaildations/auth.validation';
import Form from '../../components/form/Form';
import AuthLink from './AuthLink';
import { PATH_NAMES } from '../../utils/constants';

const SignUp = () => {
  const navigate = useNavigate();

  const form = useForm<SignUpInput>({
    resolver: zodResolver(loginSchema),
  });

  const {
    mutate: onSignUp,
    isLoading,
  } = useMutation<void, unknown, SignUpInput>(signUp, {
    onSuccess: () => {
      navigate(goToLogin());
    },
  })

  const { handleSubmit } = form;

  const onSubmitHandler: SubmitHandler<SignUpInput> = async values => {
    onSignUp(values);
  };

  return (
    <Box className="flex1 stretchSelf justifyCenter">
      <Stack spacing={2}>
        <Typography variant="h5">
          Create an account
        </Typography>
        <Form
          form={form}
          onSubmit={handleSubmit(onSubmitHandler)}
          loading={isLoading}
          primaryButtonText="Sign Up"
        >
          <TextField
            name="email"
            placeholder="Email"
            type="email"
            fullWidth
            required
          />
          <TextField
            name="firstName"
            placeholder="First name"
            fullWidth
          />
          <TextField
            name="lastName"
            placeholder="Last name"
            fullWidth
            required
          />
          <TextField
            type="password"
            name="password"
            placeholder="Password"
            fullWidth
            required
          />
          <TextField
            type="password"
            name="passwordConfirmation"
            placeholder="Confirm password"
            fullWidth
            required
          />
        </Form>
        <Box>
          <AuthLink label="Already have an account?" text="Login" url={`/${PATH_NAMES.auth.login}`} />
        </Box>
      </Stack>
    </Box>
  )
}

export default SignUp;