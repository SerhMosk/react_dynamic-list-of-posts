import React, { FormEvent, useState } from 'react';
import './NewCommentForm.scss';
import { Comment } from '../../react-app-env';
import { postComment } from '../../api/comments';

type Props = {
  postId: number;
  comments: Comment[] | undefined;
  setComments: (arg:Comment[]) => void;
};

export const NewCommentForm: React.FC<Props> = ({
  postId,
  comments,
  setComments,
}) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [body, setBody] = useState('');
  const [error, setError] = useState(false);

  const resetForm = () => {
    setError(false);
    setName('');
    setEmail('');
    setBody('');
  };

  const addComment = (newComment: Comment) => {
    setComments([...comments || [], newComment]);
    resetForm();
  };

  const onSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (name && email && body && comments) {
      postComment(postId, name, email, body).then((res) => addComment(res));
    } else {
      setError(true);
    }
  };

  return (
    <form className="NewCommentForm" onSubmit={onSubmit}>
      <div className="form-field">
        <input
          type="text"
          name="name"
          placeholder="Your name"
          className="NewCommentForm__input"
          value={name}
          onChange={(event) => {
            setName(event.target.value);
          }}
        />
      </div>

      <div className="form-field">
        <input
          type="text"
          name="email"
          placeholder="Your email"
          className="NewCommentForm__input"
          value={email}
          onChange={(event) => {
            setEmail(event.target.value);
          }}
        />
      </div>

      <div className="form-field">
        <textarea
          name="body"
          placeholder="Type comment here"
          className="NewCommentForm__input"
          value={body}
          onChange={(event) => {
            setBody(event.target.value);
          }}
        />
      </div>
      {error && (
        <div style={{ color: 'red' }}>
          Invalid form data
        </div>
      )}

      <button
        type="submit"
        className="NewCommentForm__submit-button button"
      >
        Add a comment
      </button>
    </form>
  );
};
