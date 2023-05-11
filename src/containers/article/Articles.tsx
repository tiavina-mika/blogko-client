import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box';
import Fab from '@mui/material/Fab';
import AddIcon from '@mui/icons-material/Add';
import EditIcon from '@mui/icons-material/Edit';
import IconButton from '@mui/material/IconButton';
import { Stack } from '@mui/material';

import { useEffect, useState } from 'react';
import { IArticle } from '../../types/article.type';
import { getArticles, goToArticleCreation, goToArticleEdition } from '../../actions/articles';
import { useNavigate } from 'react-router-dom';
import Loading from '../../components/Loading';

const Articles = () => {
  const [loading, setLoading] = useState<boolean>(false);
  const [articles, setArticles] = useState<IArticle[]>([]);

  const navigate = useNavigate()

  useEffect(() => {
    const init = async () => {
      setLoading(true)
      const _articles = await getArticles();

      if (!_articles) return;
      setArticles(_articles as IArticle[])
      setLoading(false)
    }

    init()
  }, []);

  const _goToArticleCreation = () => {
    navigate(goToArticleCreation())
  }

  const _goToArticlePreview = () => {
    navigate(goToArticleCreation())
  }

  const _goToArticleEdition = (id: string) => {
    navigate(goToArticleEdition(id))
  }

  if (loading) {
    return <Loading />
  }

  return (
    <Box className="flex1 stretchSelf justifyCenter">
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell>Title</TableCell>
              <TableCell>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {articles.map((article: IArticle, index: number) => (
              <TableRow
                key={article.title + index}
                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
              >
                <TableCell component="th" scope="row">
                  {article.title}
                </TableCell>
                <TableCell component="th" scope="row">
                  <Stack direction="row" spacing={2}>
                    <IconButton onClick={() => _goToArticleEdition(article.objectId)}>
                      <EditIcon />
                    </IconButton>
                  </Stack>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      <Fab color="primary" aria-label="add" onClick={_goToArticleCreation} sx={{ position: "fixed", bottom: 10, right: 10 }}>
        <AddIcon />
      </Fab>
    </Box>
  )
}

export default Articles;