import { Stack, Button, Box, Typography, TextField } from '@mui/material';
import { ChangeEvent, useEffect, useState } from 'react';
import { getArticle, goToArticles, updateArticle } from '../../actions/articles';
import { IArticle, IArticleInput } from '../../types/article.type';
import { useNavigate, useParams } from 'react-router-dom';
import Loading from '../../components/Loading';
import ArticleForm from './ArticleForm';

const EditArticle = () => {
  const [loading, setLoading] = useState<boolean>(false);

  const params = useParams();
  const navigate = useNavigate();

  const [article, setArticle] = useState<IArticle | null>(null);
  // const [values, setValues] = useState<IArticleInput>({
  //   title: '',
  // });

  useEffect(() => {
    const init = async () => {
      setLoading(true)

      const _article = await getArticle((params as any).id, true);
      console.log('_article: ', _article);

      if (!_article) return;
      setArticle(_article as IArticle)
      // setValues({title: (_article as IArticle).title })
      setLoading(false)
    };

    init();
  }, [params])

  const handleSave = async (values: any) => {
    if (!params.id) return;
    await updateArticle(params.id,values);
    navigate(goToArticles());
  }

  if (loading) {
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
          Edit article {article.title}
        </Typography>
        <div>
          <ArticleForm onSave={handleSave} article={article} />
        </div>
      </Stack>
    </Box>
  )
}

export default EditArticle;