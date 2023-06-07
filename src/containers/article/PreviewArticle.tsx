import { useQuery } from '@tanstack/react-query';
import { Stack, Box, Typography } from '@mui/material';
import { useParams } from 'react-router-dom';

import { getArticle } from '../../actions/articles';
import { IGetRouteParams } from '../../types/utils.type';
import Loading from '../../components/Loading';

const PreviewArticle = () => {
  const params = useParams<IGetRouteParams>();
  const { isLoading, data: article } = useQuery(['article', params.id], () => getArticle((params as IGetRouteParams)?.id), {
    retry: 1
  });

  if (isLoading) {
    return <Loading />
  }

  if (!article) {
    return (
      <h1>Article not found</h1>
    )
  }

  return (
    <Box className="flexCenter">
      <Stack spacing={2}>
        <Typography>
          Preview article
        </Typography>
        <div>
            <Stack spacing={2}>
              <Typography>  
                Title: {article?.title}           
              </Typography>             
            </Stack>
        </div>
      </Stack>
    </Box>
  )
}

export default PreviewArticle;