import { Link, useSubmit, useNavigate } from 'react-router-dom';
import { useStateContext } from '../../../contexts/ContextProvider';
import { MyImage } from 'components';

function PostItem({ post, onEdit, afterArchive }) {
  const submit = useSubmit();
  const navigate = useNavigate();
  const { showToast } = useStateContext();
  
  const archivePost = () => {
    const confirmArchive = window.confirm("Вы уверены, что хотите архивировать этот пост?");
    if (confirmArchive) {
      const response = submit({ id: post.id, is_archived: !post.is_archived }, { method: "put", action: "/app/posts/" + post.id + "/edit"}).then((response) => {
        console.log(response);
        showToast({ title: 'Успех!', content: 'Сообщение успешно отправлено.', cssClass: 'e-toast-success', icon: 'e-success toast-icons' });
        navigate("/app/posts/", { replace: true, state: { key: Date.now() } });
        if(afterArchive) afterArchive(post.id);
      });
    }
  };
  console.log(post)

  return (
    <div className="max-w-md mx-auto bg-gray-200 hover:bg-gray-100 rounded-lg shadow-lg overflow-hidden my-4 flex md:flex-row flex-col">
      <MyImage className="md:flex-shrink-0 w-full md:w-48 h-48 object-cover" src={post.image_url} alt={post.title} />
      <div className="p-4 flex flex-col justify-between">
        <div>
          <h3 className="text-xl text-gray-800 font-bold">{post.title}</h3>
          <time className="text-sm text-gray-600">{post.date}</time>
          <p className="text-gray-600 mt-2">{post.description}</p>
        </div>
        <div className="flex mt-4">
          <Link to={"/app/posts/" + post.id + "/edit/"} className="text-blue-600 hover:underline mr-2">Изменить</Link>
          <button onClick={archivePost}>{ post.is_archived ? "Восстановить" : "В архив"}</button>
        </div>
      </div>
    </div>
  );
}

export default PostItem;
