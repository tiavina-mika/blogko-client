import { Stack, Button, Box, Typography, TextField } from '@mui/material';
import { ChangeEvent, useState } from 'react';
import { createArticle } from '../../actions/articles';
import { IArticleInput } from '../../types/article.type';

const CreateArticle = () => {
  const [values, setValues] = useState<IArticleInput>({
    title: '',
  })

  const handleSave = async (event: any) => {
    event.preventDefault();
    await createArticle(values)
  }

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    setValues((prev) => ({
      ...prev,
      [event.target.name]: event.target.value,
    }))
  };

  return (
    <Box className="flexCenter">
      <Stack spacing={2}>
        <Typography>
          Create article
        </Typography>
        <div>
          <form onSubmit={handleSave}>
            <Stack spacing={2}>
              <TextField name="title" label="Title" onChange={handleChange} value={values?.title} />
              <Button type="submit" variant="contained">
                Save
              </Button>              
            </Stack>
          </form>
        </div>
      </Stack>
    </Box>
  )
}

export default CreateArticle;