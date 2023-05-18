import { FC, forwardRef } from 'react';

import MuiAlert, { AlertColor, AlertProps } from '@mui/material/Alert';
import MUISnackbar from '@mui/material/Snackbar';

const Alert = forwardRef<HTMLDivElement, AlertProps>(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

type Props = {
  open?: boolean;
  onClose: () => void;
  message: string;
  severity: AlertColor;
  duration?: number;
};

const SnackBar: FC<Props> = ({ open, onClose, message, duration = 6000, severity = 'success' }) => {
  const handleClose = (_?: React.SyntheticEvent | Event, reason?: string) => {
    if (reason === 'clickaway') {
      return;
    }

    onClose();
  };

  return (
    <MUISnackbar open={open} autoHideDuration={duration} onClose={handleClose}>
      <Alert
        onClose={handleClose}
        severity={severity}
        sx={{
          width: '100%',
          '& .MuiAlert-message, & .MuiAlert-icon, & .MuiButtonBase-root': {
            color: '#fff',
          },
        }}>
        {message}
      </Alert>
    </MUISnackbar>
  );
};

export default SnackBar;
