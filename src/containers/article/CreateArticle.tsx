import { Stack, Box, Typography } from '@mui/material';
import { createArticle } from '../../actions/articles';
import ArticleForm from './ArticleForm';

const CreateArticle = () => {
  const handleSave = async (values: any) => {
    await createArticle(values)
  }

  return (
    <Box className="flexCenter">
      <Stack spacing={2}>
        <Typography>
          Create article
        </Typography>
        <div>
          <ArticleForm onSave={handleSave} />
        </div>
      </Stack>
    </Box>
  )
}

export default CreateArticle;