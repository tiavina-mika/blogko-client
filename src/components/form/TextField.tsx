import { FC } from 'react';

import { Stack, SxProps, Theme, FormHelperText } from '@mui/material';
import MUITextField, { TextFieldProps } from '@mui/material/TextField';
import { Controller, useFormContext } from 'react-hook-form';

type Props = {
  name: string;
  sx?: SxProps<Theme>;
  errorMessage?: string;
} & TextFieldProps;

const TextField: FC<Props> = ({
  name,
  sx,
  errorMessage,
  ...inputProps
}) => {
  // hooks
  const {
    control,
    formState: { errors },
  } = useFormContext();

  return (
    <Controller
      control={control}
      name={name}
      defaultValue=""
      render={({ field }) => (
        <Stack>
          <MUITextField
            {...field}
            {...inputProps}
            sx={sx}
            error={!!errors[name] || !!errorMessage}
          />
          {errors[name] && (
            <FormHelperText error>
              {(errors as any)[name].message}
            </FormHelperText>
          )}
        </Stack>
      )}
    />
  );
};

export default TextField;
