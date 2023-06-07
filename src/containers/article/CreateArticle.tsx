import { Stack, Box, Typography } from '@mui/material';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { createArticle } from '../../actions/articles';
import ArticleForm from './ArticleForm';
import { IArticle, IArticleInput } from '../../types/article.type';
import Loading from '../../components/Loading';

const CreateArticle = () => {
  const queryClient = useQueryClient();

  // just to show that the list is updated after creating a new article
  // const {  data: articles } = useQuery(['articles'], () => getArticles());

  const {
    mutate: _createArticle,
    isLoading,
  } = useMutation<IArticle | undefined, Error, IArticleInput>(createArticle, {
    onSuccess: (newArticle: IArticle | undefined) => {
      if (!newArticle) return;
      queryClient.setQueryData(
        ['articles'],
        (prev: IArticle[] | undefined): IArticle[] => prev ? [newArticle, ...prev] : [newArticle]
      );
    },
  })

  const handleSave = async (values: IArticleInput) => {
    await _createArticle(values);
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