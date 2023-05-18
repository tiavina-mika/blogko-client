import Box from '@mui/material/Box';
import { TextField } from '@mui/material';
import { zodResolver } from '@hookform/resolvers/zod';
import { useNavigate } from 'react-router-dom';
import { useMutation } from '@tanstack/react-query';

import { goToLogin, login } from '../../../actions/auth';
import { SubmitHandler, useForm } from 'react-hook-form';
import { LoginInput } from '../../../types/auth.type';
import { loginSchema } from '../../../utils/vaildations/auth.validation';
import Form from '../../../components/form/Form';

const Login = () => {
  const navigate = useNavigate();

  const form = useForm<LoginInput>({
    resolver: zodResolver(loginSchema),
  });

  const {
    mutate: onLogin,
    isLoading,
  } = useMutation<void, unknown, LoginInput>(login, {
    onSuccess: () => {
      navigate(goToLogin())
    },
  })

  const { handleSubmit } = form;

  const onSubmitHandler: SubmitHandler<LoginInput> = async values => {
    onLogin(values);
  };

  return (
    <Box className="flex1 stretchSelf justifyCenter">
      <Form
        form={form}
        onSubmit={handleSubmit(onSubmitHandler)}
        loading={isLoading}
        primaryButtonText="Login"
      >
        <TextField
          name="email"
          placeholder="Email"
          type="email"
          fullWidth
          required
        />
        <TextField
          name="password"
          placeholder="Password"
          type="password"
          fullWidth
          required
        />
      </Form>
    </Box>
  )
}

export default Login;