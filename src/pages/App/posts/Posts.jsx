import { useEffect, useState, useRef } from 'react';
import { Suspense } from 'react';
import { RightModal, PostsList, PostItem } from "../../../components";
import { Await } from 'react-router-dom';
import { useStateContext } from '../../../contexts/ContextProvider';
import { BASE_URL } from 'data/config';

function Posts({ status }) {
  const [selectedPost, setSelectedPost] = useState(null);
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(1);
  const [query, setQuery] = useState("");
  const debounceTimeout = useRef(null);
  const { rightModal, setRightModal, showToast, token } = useStateContext();

  const getTitle = (status) => {
    switch (status) {
      case 'archived': return 'Посты в архиве';
      case 'active': 
      default: return 'Активные посты';
    }
  };
  const title = getTitle(status);

  const loadPosts = async (status = 'active', token, page = 1, query = "") => {
    let url = `${BASE_URL}/crm/admin-api/posts?status=${status}&page=${page}&query=${query}`;
    setLoading(true);
    try {
      const response = await fetch(url, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Token ${token}`,
        },
      });
      if (!response.ok) {
        let message = 'Failed to load posts';
        try {
          const resData = await response.json();
          message = resData.message;
        } catch (error) {
          console.error('Failed to parse error message:', error);
        }
        throw new Error(message);
      }
      const resData = await response.json();
      return resData.response;
    } catch (error) {
      showToast({ title: 'Error!', content: error.message, cssClass: 'e-toast-danger', icon: 'e-error toast-icons' });
    } finally {
      setLoading(false);
    }
  };

  const loadMorePosts = async () => {
    const nextPage = page + 1;
    setPage(nextPage);
    const loadedPosts = await loadPosts(status, token, nextPage, query);
    if (Array.isArray(loadedPosts)) {
      setPosts((prev) => [...prev, ...loadedPosts]);
    } else {
      console.error('Loaded posts is not an array:', loadedPosts);
    }
  };

  const handleQueryChange = async (event) => {
    const newQuery = event.target.value;
    setQuery(newQuery);
    setPage(1);  // Reset to the first page for a new search
    clearTimeout(debounceTimeout.current);
    debounceTimeout.current = setTimeout(async () => {
      const loadedPosts = await loadPosts(status, token, 1, newQuery);
      setPosts(loadedPosts);
    }, 1000);
  };

  const afterArchive = (post_id) => {
    const newPosts = posts.filter((post) => post.id !== post_id);
    setPosts(newPosts);
  };

  useEffect(async () => {
    if (token) {
      const loadedPosts = await loadPosts(status, token, 1, "");
      setPosts(loadedPosts);
    }
  }, [status, token]);

  return (
    <>
      <Suspense fallback={<p className="flex flex-wrap">Loading...</p>}>
        <>
          <input
            type="text"
            value={query}
            onChange={handleQueryChange}
            placeholder="Search..."
            className="search-input float-right mb-4 p-2 border rounded-lg shadow-md"
          />
          <PostsList 
            posts={posts} 
            title={title} 
            selectHandler={(post) => {
              setSelectedPost(post);  
              setRightModal(true);
            }}
            afterArchive
          />
          <button onClick={loadMorePosts} className="load-more-button mt-4 p-2 bg-blue-500 text-white rounded-lg hover:bg-blue-700" disabled={loading}>
            {loading ? 'Загрузка...' : 'Загрузить еще'}
          </button>
        </>
      </Suspense>
      {rightModal && selectedPost &&
        <RightModal title={"Пост: " + selectedPost.title} afterClose={() => setSelectedPost(null)}>
          <Suspense fallback={<p style={{ textAlign: 'center' }}>Loading...</p>}>
            <Await resolve={selectedPost}>
              {(loadedPost) => <PostItem post={loadedPost} afterArchive/>}
            </Await>
          </Suspense>
          <h1 className="flex md:flex-row flex-col">Here will be related statistics and more info...</h1>
        </RightModal>
      }
    </>
  );
}

export default Posts;
