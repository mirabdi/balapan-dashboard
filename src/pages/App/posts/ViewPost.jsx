import { Suspense, useState } from 'react';
import {
  useRouteLoaderData,
  Await,
} from 'react-router-dom';
// import { BASE_URL } from '../../utils/vars';
import {PostItem, PostForm}  from '../../../components';

function ViewPost() {
  const { post } = useRouteLoaderData('post-detail');
  const [ editMode, setEditMode ] = useState(false);
  return (
    editMode ? 
      <div className="flex flex-col items-center justify-center">
        <h1 className="text-2xl font-bold mb-8 pt-5">Edit Post</h1>
        <PostForm method="put" post={post}/>
      </div>
        
    : <>
      <Suspense fallback={<p style={{ textAlign: 'center' }}>Loading...</p>}>
        <Await resolve={post}>
          {(loadedPost) => <PostItem post={loadedPost} onEdit={()=>setEditMode(true)}/>}
        </Await>
      </Suspense>
      <h1 className="flex md:flex-row flex-col">Here will be related statistics and more info...</h1>
    </> 



  );
}

export default ViewPost;