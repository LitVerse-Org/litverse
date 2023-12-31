import React, { useEffect, useState } from 'react';
import PostButton from '@/components/CreatePost/PostButton'

function LikeButton({ postId }) {
  const [liked, setLiked] = useState(false);

  const toggleLike = () => {
    const url = `/api/postOperations/${liked ? 'unlikePost' : 'likePost'}`;
    fetch(url, {
      method: liked ? 'DELETE' : 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ userId: 1, postId }), // Replace userId: 1 with the actual user ID
    })
    .then((res) => res.json())
    .then((data) => {
      if (data.message) {
        setLiked(!liked);
      }
    })
    .catch((error) => console.error('Error toggling like:', error));
  };

  return (
    <div>  <button onClick={toggleLike} style={{ backgroundColor: '#007bff', color: 'white', padding: '5px 10px', borderRadius: '5px' }}>
    {liked ? 'Unlike' : 'Like'}
  </button><PostButton/></div>
    
   
  );
}

function UserPosts() {
  const [posts, setPosts] = useState([]);
  const [uid, setUid] = useState('');
  const [searchUsername, setSearchUsername] = useState('');
  const [visiblePosts, setVisiblePosts] = useState(3);
  const [userSearchResults, setUserSearchResults] = useState([]);
  const [likesForPost, setLikesForPost] = useState({});

  const fetchLikesForPost = (postId) => {
    fetch(`/api/postOperations/getLikesForPost?postId=${postId}`)
      .then((response) => response.json())
      .then((data) => {
        setLikesForPost((prevLikes) => ({
          ...prevLikes,
          [postId]: data,
        }));
      })
      .catch((error) => console.error('Error fetching likes:', error));
  };

  const fetchPosts = () => {
    if (!uid) return;

    fetch(`/api/postOperations/getUserPosts?uid=${uid}`)
      .then((response) => response.json())
      .then((data) => {
        if (Array.isArray(data)) {
          setPosts(data);
        }
      })
      .catch((error) => console.error('Error fetching posts:', error));
  };

  const searchByUsername = () => {
    if (!searchUsername) return;

    fetch(`/api/userOperations/searchUserByUsername?username=${searchUsername}`)
      .then((response) => response.json())
      .then((data) => {
        if (data && data.userId) {
          setUid(data.userId);
        }
      })
      .catch((error) => console.error('Error searching user:', error));
  };

  const handleUserSearch = (e) => {
    const query = e.target.value;
    setSearchUsername(query);
    
    if (query.length > 0) {
      fetch(`/api/userOperations/searchUsers?query=${query}`)
        .then((response) => response.json())
        .then((data) => {
          setUserSearchResults(data);
        })
        .catch((error) => console.error('Error searching users:', error));
    } else {
      setUserSearchResults([]);
    }
  };

  const selectUsername = (username) => {
    setSearchUsername(username);
    setUserSearchResults([]);
  };

  const showMorePosts = () => {
    setVisiblePosts(prevVisiblePosts => prevVisiblePosts + 3);
  };

  useEffect(() => {
    fetchPosts();
  }, [uid]);

  return (
    <div>
      <h1>User Posts</h1>
      <div>
        <input
          type="text"
          placeholder="Enter Username"
          value={searchUsername}
          onChange={handleUserSearch}
          style={{ color: 'black' }}
        />
        {userSearchResults.length > 0 && (
          <div style={{ border: '1px solid #ccc', maxHeight: '100px', overflow: 'auto' }}>
            {userSearchResults.map((user, index) => (
              <div key={index} onClick={() => selectUsername(user.username)}>
                {user.username}
              </div>
            ))}
          </div>
        )}
        <button onClick={searchByUsername} style={{ backgroundColor: '#007bff', color: 'white', padding: '5px 10px', borderRadius: '5px' }}>
          Search by Username
        </button>
      </div>
      <ul>
        {Array.isArray(posts) && posts.slice(0, visiblePosts).map((post, index) => (
          <li key={index}>
            {post.content.length > 20 ? post.content.substring(0, 20) + '...' : post.content}
            <LikeButton postId={post.id} />
            <button onClick={() => fetchLikesForPost(post.id)} style={{ backgroundColor: '#007bff', color: 'white', padding: '5px 10px', borderRadius: '5px' }}>
              Show Likes
            </button>
            {likesForPost[post.id] && (
              <div>
                Liked by: {likesForPost[post.id].map((user) => user.username).join(', ')}
              </div>
            )}
          </li>
        ))}
      </ul>
      {visiblePosts < posts.length && (
        <button onClick={showMorePosts} style={{ backgroundColor: '#007bff', color: 'white', padding: '5px 10px', borderRadius: '5px' }}>
          Show More
        </button>
      )}
    </div>
  );
}

export default UserPosts;
