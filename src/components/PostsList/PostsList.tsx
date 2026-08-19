import React, { useEffect, useState } from 'react';
import './PostsList.scss';
import { Post } from '../../react-app-env';
import { getUserPosts, getAllPosts } from '../../api/posts';

interface Props {
  userId: string;
  postId: number | undefined;
  selectPost: (arg?: number) => void;
}

export const PostsList: React.FC<Props> = ({
  userId,
  postId,
  selectPost,
}) => {
  const [posts, setPosts] = useState<Post[]>([]);

  useEffect(() => {
    getAllPosts().then(res => setPosts(res));
  }, []);

  useEffect(() => {
    if (userId === '0') {
      getAllPosts().then(res => setPosts(res));
    } else {
      getUserPosts(userId).then(res => setPosts(res));
    }
  }, [userId]);

  return (
    <div className="PostsList">
      <h2>Posts:</h2>

      <ul className="PostsList__list" data-cy="postDetails">
        {posts.map(post => (
          <li className="PostsList__item" key={post.id}>
            <div>
              <b>
                [User #
                { post.userId }
                ]:
              </b>
              &nbsp;
              { post.body }
            </div>
            <button
              type="button"
              className="PostsList__button button"
              onClick={() => {
                if ((postId) && (postId === post.id)) {
                  selectPost(undefined);
                } else {
                  selectPost(post.id);
                }
              }}
            >
              {postId && (postId === post.id) ? 'Close' : 'Open'}
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};
