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
import DeleteIcon from '@mui/icons-material/Delete';
import VisibilityIcon from '@mui/icons-material/Visibility';
import { Stack } from '@mui/material';

import { useState } from 'react';
import { deleteArticle, goToArticleCreation, goToArticleEdition, gotoArticle, onEnterArticles } from '../../actions/articles';
import Loading from '../../components/Loading';
import { useLoaderData, useNavigate } from 'react-router-dom';

const Articles = () => {
  const [loading, setLoading] = useState<boolean>(false);
  // const [articles, setArticles] = useState<IArticle[]>([]);
  const { articles } = useLoaderData() as Awaited<ReturnType<typeof onEnterArticles>>
  const navigate = useNavigate();

  // useEffect(() => {
  //   const init = async () => {
  //     setLoading(true)
  //     const _articles = await getArticles();

  //     if (!_articles) return;
  //     setArticles(_articles as IArticle[])
  //     setLoading(false)
  //   }

  //   init()
  // }, []);

  const _goToArticleCreation = () => {
    navigate(goToArticleCreation())
  }

  const _goToArticlePreview = (id: string) => {
    navigate(gotoArticle(id))
  }

  const _goToArticleEdition = (id: string) => {
    navigate(goToArticleEdition(id))
  }

  const handleDelete = async (id: string) => {
    if (!id) return;
    await deleteArticle(id);
    // const newArticles = articles.filter((article: IArticle) => article.objectId !== id);
    // setArticles(newArticles);
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
            {articles?.map((article, index: number) => (
              <TableRow
                key={article.title + index}
                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
              >
                <TableCell component="th" scope="row">
                  {article.title}
                </TableCell>
                <TableCell component="th" scope="row">
                  <Stack direction="row" spacing={2}>
                    <IconButton onClick={() => _goToArticlePreview(article.objectId)}>
                      <VisibilityIcon />
                    </IconButton>
                    <IconButton onClick={() => _goToArticleEdition(article.objectId)}>
                      <EditIcon />
                    </IconButton>
                    <IconButton onClick={() => handleDelete(article.objectId)}>
                      <DeleteIcon />
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