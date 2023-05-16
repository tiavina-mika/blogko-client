import { Stack, Box, Typography } from '@mui/material';
import { createArticle, getArticles } from '../../actions/articles';
import ArticleForm from './ArticleForm';
import { IArticle, IArticleInput } from '../../types/article.type';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import Loading from '../../components/Loading';
import { Attributes } from 'react';

const CreateArticle = () => {
  const queryClient = useQueryClient()
  const {  data: articles } = useQuery(['articles'], () => getArticles());
  console.log('articles 1: ', articles);

  const {
    mutate: _createArticle,
    isError,
    error,
    isLoading,
  // } = useMutation(createArticle, {
  } = useMutation(createArticle, {
    onSuccess: (newArticle: IArticle | undefined) => {
      if (!newArticle) return;
      queryClient.setQueryData(
        ['articles'],
        (prev: IArticle[] | undefined): IArticle[] => prev ? [newArticle, ...prev] : [newArticle]
      );
    },
  })

  const handleSave = async (values: IArticleInput) => {
    await _createArticle(values as IArticleInput)
  }

  return (
    <Box className="flexCenter">
      <Stack spacing={2}>
        <Typography>
          Create article
        </Typography>
        <div>
          {isLoading && <Loading />}
          {/* {isLoading && <Loading />} */}
          <ArticleForm onSave={handleSave} />
        </div>
      </Stack>
    </Box>
  )
}

export default CreateArticle;