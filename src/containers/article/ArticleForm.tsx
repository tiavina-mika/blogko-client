import { Stack, Button } from '@mui/material';
import { zodResolver } from '@hookform/resolvers/zod';

import { IArticle, IArticleInput } from '../../types/article.type';
import { articleSchema } from '../../utils/vaildations/article.validations';
import { useForm, FormProvider, SubmitHandler} from 'react-hook-form';
import TextField from '../../components/form/TextField';

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

  const form = useForm({
    resolver: zodResolver(articleSchema),
    defaultValues: getInitialValues(article)
  });

  const { handleSubmit } = form;

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
    <FormProvider {...form}>
    {/* <FormProvider form={form}> */}
      <form onSubmit={handleSubmit(onSubmit as any)}>
        <Stack spacing={2}>
          {/* <TextField name="title" label="Title" onChange={handleChange} value={values?.title} /> */}
          {/* <Controller
            name="title"
            control={control}
            render={({ field }: any) => <TextField {...field} label="Title" />}
          /> */}
          <TextField name="title" label="Title" />
          {/* <TextField name="description" label="description" /> */}
          <Button type="submit" variant="contained">
            Save
          </Button>              
        </Stack>
      </form>
    </FormProvider>

  )
}

export default ArticleForm;