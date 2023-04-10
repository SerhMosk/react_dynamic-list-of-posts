import React, { useEffect, useState } from 'react';
import { NewCommentForm } from '../NewCommentForm';
import './PostDetails.scss';
import { Post, Comment } from '../../react-app-env';
import { getPostDetails } from '../../api/posts';
import { getPostComments, removeComment } from '../../api/comments';

type Props = {
  postId: number;
};

export const PostDetails: React.FC<Props> = ({ postId }) => {
  const [postDetails, setPostDetails] = useState<Post>();
  const [comments, setComments] = useState<Comment[] | undefined>([]);
  const [visibleComments, setVisibleComments] = useState(false);

  useEffect(() => {
    getPostDetails(postId).then(res => setPostDetails(res));
    getPostComments(postId).then(res => setComments(res));
  }, [postId]);

  const deleteComment = async (id: number) => {
    if (comments) {
      removeComment(id).then(() => {
        getPostComments(postId).then(res => setComments(res));
      });
    }
  };

  return (
    <div className="PostDetails">
      <h2>Post details:</h2>
      {postId !== 0 && (
        <>
          <section className="PostDetails__post">
            <p>{postDetails?.title}</p>
          </section>

          <section className="PostDetails__comments">
            <button
              type="button"
              className="button"
              onClick={() => {
                setVisibleComments(!visibleComments);
              }}
            >
              {comments && ((visibleComments)
                ? `Show ${comments.length} comments`
                : `Hide ${comments.length} comments`)}
            </button>

            <ul
              className={`PostDetails__list${visibleComments ? ' hide' : ''}`}
              data-cy="postList"
            >
              {comments && comments.map(comment => (
                <li className="PostDetails__list-item" key={comment.id}>
                  <button
                    type="button"
                    className="PostDetails__remove-button button"
                    onClick={() => {
                      deleteComment(comment.id);
                    }}
                  >
                    X
                  </button>
                  <p>{comment.body}</p>
                </li>
              ))}
            </ul>
          </section>

          <section>
            <div className="PostDetails__form-wrapper">
              <NewCommentForm
                postId={postId}
                comments={comments}
                setComments={setComments}
              />
            </div>
          </section>
        </>
      )}
    </div>
  );
};
