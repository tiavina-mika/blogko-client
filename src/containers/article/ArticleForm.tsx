import { useEffect } from 'react';

import { Stack, Button, TextField } from '@mui/material';
import { ChangeEvent, useState } from 'react';
import { IArticle, IArticleInput } from '../../types/article.type';
import { articleSchema } from '../../utils/vaildations/article.validations';

type Props = {
  onSave: (values: IArticleInput) => void;
  article?: IArticle;
}
const ArticleForm = ({ onSave, article }: Props) => {
  const [values, setValues] = useState<IArticleInput>({
    title: '',
  })

  useEffect(() => {
    if (!article) return;
    setValues({ title: (article as IArticle).title })
  }, [article])


  const handleSave = (event: any) => {
    event.preventDefault();
    onSave(values)
  }

  const handleChange = async (event: ChangeEvent<HTMLInputElement>) => {
    const newValues = {
      ...values,
      [event.target.name]: event.target.value
    };
  
    const validation = await articleSchema.parseAsync(newValues)

    if (!(validation as any).success) {
      console.log('validation: ', validation);
      return;
    }

    setValues(newValues)
  };

  return (
    <form onSubmit={handleSave}>
      <Stack spacing={2}>
        <TextField name="title" label="Title" onChange={handleChange} value={values?.title} />
        <Button type="submit" variant="contained">
          Save
        </Button>              
      </Stack>
    </form>
  )
}

export default ArticleForm;