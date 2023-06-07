import { Stack, Button, SxProps, Theme, Alert } from '@mui/material';
import { FormEvent, ReactNode } from 'react';

import { FormProvider } from 'react-hook-form';

type Props = {
  onSubmit?: (() => void) | ((event: FormEvent<HTMLFormElement>) => void);
  form?: any;
  loading?: boolean;
  children?: ReactNode;
  primaryButtonText?: string;
  error?: string;
  sx?: SxProps<Theme>;
};
const Form = ({ onSubmit, form, error, children, primaryButtonText, loading }: Props) => {
  return (
    <FormProvider {...form}>
      <form onSubmit={onSubmit}>
        {error && (
          <Alert severity="error" sx={{ mb: 1.5 }}>
            {error}
          </Alert>
        )}
        <Stack spacing={2}>
          {children}
          <Button type="submit" variant="contained">
            {loading ? '...' : primaryButtonText}
          </Button>                 
        </Stack>
      </form>
    </FormProvider>

  )
}

export default Form;