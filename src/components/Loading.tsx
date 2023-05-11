import CircularProgress from '@mui/material/CircularProgress';
import Box from '@mui/material/Box';


const Loading = () => {
  return (
    <Box className="flexCenter flex1 stretchSelf" sx={{ height: '100%'}}>
      <CircularProgress />
    </Box>
  )
}

export default Loading;