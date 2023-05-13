import { Stack, Button, TextField } from '@mui/material';
import { zodResolver } from '@hookform/resolvers/zod';

import { IArticle, IArticleInput } from '../../types/article.type';
import { articleSchema } from '../../utils/vaildations/article.validations';
import { useForm, Controller, SubmitHandler} from 'react-hook-form';

const getInitialValues = (article: IArticle | null | undefined) => {
  // edition
  if (article) {
    return {
      title: article.title
    }
  }

  // creation
  return {
    title: ''
  }
}
type Props = {
  onSave: (values: IArticleInput) => void;
  article?: IArticle;
}
const ArticleForm = ({ onSave, article }: Props) => {
  // const [values, setValues] = useState<IArticleInput>({
  //   title: '',
  // })

  const { handleSubmit, control, formState: { errors } } = useForm({
    resolver: zodResolver(articleSchema),
    defaultValues: getInitialValues(article)
  });

  // useEffect(() => {
  //   if (!article) return;
  //   setValues({ title: (article as IArticle).title })
  // }, [article])


  // const handleSave = (event: any) => {
  //   event.preventDefault();
  //   onSave(values)
  // }

  // const handleChange = async (event: ChangeEvent<HTMLInputElement>) => {
  //   const newValues = {
  //     ...values,
  //     [event.target.name]: event.target.value
  //   };
  
  //   const validation = await articleSchema.parseAsync(newValues)

  //   if (!(validation as any).success) {
  //     console.log('validation: ', validation);
  //     return;
  //   }

  //   setValues(newValues)
  // };

  const onSubmit: SubmitHandler<IArticleInput> = async values => {
    onSave(values)
  }

  return (
    <form onSubmit={handleSubmit(onSubmit as any)}>
      <Stack spacing={2}>
        {/* <TextField name="title" label="Title" onChange={handleChange} value={values?.title} /> */}
        <Controller
          name="title"
          control={control}
          render={({ field }: any) => <TextField {...field} label="Title" />}
        />
       {errors.title && <p>{(errors as any).title?.message}</p>}
        <Button type="submit" variant="contained">
          Save
        </Button>              
      </Stack>
    </form>
  )
}

export default ArticleForm;