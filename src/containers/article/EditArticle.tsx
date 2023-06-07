import { Stack, Box, Typography } from '@mui/material';
import { getArticle, goToArticles, updateArticle } from '../../actions/articles';
import { IArticle, IArticleInput } from '../../types/article.type';
import { useNavigate, useParams } from 'react-router-dom';
import Loading from '../../components/Loading';
import ArticleForm from './ArticleForm';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { IGetRouteParams } from '../../types/utils.type';

type InputProps = {
  id: string;
  values: IArticleInput
}
const EditArticle = () => {
  const params = useParams<IGetRouteParams>();
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  // const [article, setArticle] = useState<IArticle | null>(null);
  // const [values, setValues] = useState<IArticleInput>({
  //   title: '',
  // });

  const { isLoading, data: article } = useQuery(['article', params.id], () => getArticle((params as IGetRouteParams)?.id), {
    retry: 1
  });

  const {
    mutate: _updateArticle,
    // error,
    // isLoading: isUpdateArticleLoading,
  // } = useMutation(createArticle, {
  } = useMutation<IArticle | undefined, unknown, InputProps>(({ id, values }) => updateArticle(id, values), {
    onSuccess: (newArticle: IArticle | undefined) => {
      if (!newArticle) return;
      queryClient.setQueryData(
        ['articles'],
        (prev: IArticle[] | undefined = []): IArticle[] => {
          const newArticles = [];
          for (const article of prev) {
            if (article.objectId === newArticle.objectId) {
              newArticles.unshift(newArticle);
            } else {
              newArticles.push(article);
            }
          }
          return newArticles;
        }
      );
    },
  })

  // useEffect(() => {
  //   const init = async () => {
  //     if (!params.id) return;
  //     setLoading(true)

  //     const _article = await getArticle(params.id);
  //     console.log('_article: ', _article);

  //     if (!_article) return;
  //     setArticle(_article as IArticle)
  //     // setValues({title: (_article as IArticle).title })
  //     setLoading(false)
  //   };

  //   init();
  // }, [params])

  const handleSave = async (values: IArticleInput) => {
    if (!params.id) return;
    await _updateArticle({ id: params.id, values });
    navigate(goToArticles());
  }

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