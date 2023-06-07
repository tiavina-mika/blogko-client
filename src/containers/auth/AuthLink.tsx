import { MouseEvent } from 'react';

import Link from '@mui/material/Link';
import Typography from '@mui/material/Typography';
import { Link as RouterLink } from 'react-router-dom';

const sx = {
  link: {
    fontWeight: 600,
    letterSpacing: 1,
    textDecoration: 'none',
  },
};
type Props = {
  url?: string;
  text: string;
  label?: string;
  onClick?: () => void;
};

const AuthLink = ({ url, text, label, onClick }: Props) => {
  if (!onClick && !url) return null;

  const handleClick = (event: MouseEvent<HTMLElement>) => {
    event.preventDefault();
    onClick?.();
  };

  return (
    <Typography className="textWhite" sx={{ textAlign: { xs: 'left', lg: 'center' } }}>
      {label}&nbsp;
      {/* ------- button ------- */}
      {!!onClick && (
        <Link sx={{ cursor: 'pointer', ...sx.link }} onClick={handleClick}>
          {text}
        </Link>
      )}
      {/* ------- link ------- */}
      {url && (
        <Link component={RouterLink} to={url} sx={sx.link}>
          {text}
        </Link>
      )}
    </Typography>
  );
};

export default AuthLink;
