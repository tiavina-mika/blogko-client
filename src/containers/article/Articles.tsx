import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import CircularProgress from '@mui/material/CircularProgress';
import Box from '@mui/material/Box';
import Fab from '@mui/material/Fab';
import AddIcon from '@mui/icons-material/Add';

import { Fragment, useEffect, useState } from 'react';
import { IArticle } from '../../types/article.type';
import { getArticles, goToArticleCreation } from '../../actions/articles';
import { useNavigate } from 'react-router-dom';

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

  if (loading) {
    return (
      <Box className="flexCenter flex1 stretchSelf" sx={{ height: '100%'}}>
        <CircularProgress />
      </Box>
    )
  }
  return (
    <Box className="flex1 stretchSelf justifyCenter">
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell>Title</TableCell>
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