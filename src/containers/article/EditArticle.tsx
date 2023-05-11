import { useParams } from "react-router-dom";

const EditArticle = () => {
  const params = useParams()
  console.log('params: ', params);
  return (
    <h1>
      Edit article
    </h1>
  )
}

export default EditArticle;