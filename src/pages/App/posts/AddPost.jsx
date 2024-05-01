import PostForm from '../../../components/App/posts/PostForm';

function AddPost() {
  return (
    
    <div className="flex flex-col items-center justify-center">
      <h1 className="text-2xl font-bold mb-8 pt-5">Создать Новый Пост</h1>
      <PostForm method="post"/>
      </div>);
}


export default AddPost;

