import { Stack, Box, Typography } from '@mui/material';
import { useEffect, useState } from 'react';
import { getArticle } from '../../actions/articles';
import { IArticle } from '../../types/article.type';
import { useParams } from 'react-router-dom';

const PreviewArticle = () => {

  const params = useParams();
  const [article, setArticle] = useState<IArticle | null>(null);

  useEffect(() => {
    const init = async () => {

      const _article = await getArticle((params as any).id, true);

      if (!_article) return;
      setArticle(_article as IArticle)
    };

    init();
  }, [params])

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