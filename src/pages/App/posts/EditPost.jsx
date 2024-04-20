import PostForm from '../../../components/App/posts/PostForm';
import { useRouteLoaderData } from 'react-router-dom';

function EditPost() {
    const data = useRouteLoaderData('post-detail');
    return (
        <div className="flex flex-col items-center justify-center">
        <h1 className="text-2xl font-bold mb-8 pt-5">Edit Post</h1>
        <PostForm method="put" post={data.post}/>
        </div>
    );
}


export default EditPost;

