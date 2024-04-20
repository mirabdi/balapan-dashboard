import { useState } from 'react';
// import PostsList from "../../../components/App/posts/PostsList";
import { Suspense} from 'react';
import { RightModal, PostsList, PostItem } from "../../../components";
import { useLoaderData, Await } from 'react-router-dom';
import { useStateContext} from '../../../contexts/ContextProvider';

function Posts() {
  let title = "Активные посты";
  const url = new URL(window.location.href);
  const lastSegment = url.pathname.split('/').pop();
  const [selectedPost, setSelectedPost] = useState(null);
  const { rightModal, setRightModal, showToast} = useStateContext();
  if(lastSegment === 'archived'){
    title = "Посты в архиве";
  }
  const { posts } = useLoaderData();
  return (
    <>
      <Suspense fallback={<p className="flex flex-wrap">Loading...</p>}>
        <Await resolve={posts}>
          {posts => <PostsList posts={posts} title={title} selectHandler={(post)=>{setSelectedPost(post);  setRightModal(true);}}/>}
        </Await>
      </Suspense>
      {rightModal && selectedPost &&
        <RightModal title={"Пост: "+selectedPost.title} afterClose={()=>setSelectedPost(null)}>
          <Suspense fallback={<p style={{ textAlign: 'center' }}>Loading...</p>}>
            <Await resolve={selectedPost}>
              {(loadedPost) => <PostItem post={loadedPost} />}
            </Await>
          </Suspense>
          <h1 className="flex md:flex-row flex-col">Here will be related statistics and more info...</h1>
        </RightModal>
        }
    </>   
  );
}

export default Posts;


