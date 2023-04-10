import React, { useEffect, useState } from 'react';
import './App.scss';
import './styles/general.scss';
import { User } from './react-app-env';
import { getAllUsers } from './api/users';
import { PostsList } from './components/PostsList';
import { PostDetails } from './components/PostDetails';

const App: React.FC = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [selectedUser, setSelectedUser] = useState('0');
  const [selectedPostId, setSelectedPostId] = useState<number>();

  useEffect(() => {
    getAllUsers().then(res => setUsers(res));
  }, []);

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const onChangeUser = (event: any) => setSelectedUser(event.target.value);

  return (
    <div className="App">
      <header className="App__header">
        <label>
          Select a user: &nbsp;

          <select
            className="App__user-selector"
            value={selectedUser}
            onChange={onChangeUser}
          >
            <option value="0">All users</option>
            {users.map(user => (
              <option key={user.id} value={`${user.id}`}>
                {user.name}
              </option>
            ))}
          </select>
        </label>
      </header>

      <main className="App__main">
        <div className="App__sidebar">
          <PostsList
            userId={selectedUser}
            postId={selectedPostId}
            selectPost={setSelectedPostId}
          />
        </div>

        <div className="App__content">
          {selectedPostId && <PostDetails postId={selectedPostId} />}
        </div>
      </main>
    </div>
  );
};

export default App;
