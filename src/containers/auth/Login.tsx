import Box from '@mui/material/Box';
import { Stack, Typography } from '@mui/material';
import { zodResolver } from '@hookform/resolvers/zod';
import { useNavigate, useOutletContext } from 'react-router-dom';
import { useMutation } from '@tanstack/react-query';
import { SubmitHandler, useForm } from 'react-hook-form';

import { goToLogin, login } from '../../actions/auth';
import { LoginInput } from '../../types/auth.type';
import { loginSchema } from '../../utils/vaildations/auth.validation';
import Form from '../../components/form/Form';
import AuthLink from './AuthLink';
import { PATH_NAMES } from '../../utils/constants';
import { goToHome } from '../../actions/home';
import TextField from '../../components/form/TextField';
import { ILayoutError } from '../../types/app.type';

const Login = () => {
  const navigate = useNavigate();

  const { setLayoutError } = useOutletContext<ILayoutError>();

  const form = useForm<LoginInput>({
    resolver: zodResolver(loginSchema),
  });

  const {
    mutate: onLogin,
    // error,
    isLoading,
  } = useMutation<void, unknown, LoginInput>(login, {
    onSuccess: () => {
      navigate(goToHome())
    },
    onError: (error) => {
      if (!error) return;
      // pass the error to the parent layout
      setLayoutError((error as Error).message);
    }
  });

  const { handleSubmit } = form;

  const onSubmitHandler: SubmitHandler<LoginInput> = async values => {
    onLogin(values);
  };

  return (
    <Box className="flex1 stretchSelf justifyCenter">
      <Stack spacing={2}>
        <Typography variant="h5">
          Login
        </Typography>
        <Form
          form={form}
          onSubmit={handleSubmit(onSubmitHandler)}
          loading={isLoading}
          primaryButtonText="Login"
          // error={error}
          // error={(error as Error)?.message}
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
        <Box>
          <AuthLink label="Not have an account?" text="Sign up" url={`/${PATH_NAMES.auth.signUp}`} />
        </Box>
      </Stack>
    </Box>
  )
}

export default Login;