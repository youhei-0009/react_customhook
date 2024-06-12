import axios from 'axios';
import './App.css'
import { UserCard } from './components/UserCard'
import { User } from './types/api/user';
import { UserProfile } from './types/userProfile';
import { useState } from 'react';

export default function App() {
  const [userProfiles, setUserProfiles] = useState<Array<UserProfile>>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);

  const onClickFetchUser = () => {
    setLoading(true);
    setError(false);

    axios.get<Array<User>>("https://jsonplaceholder.typicode.com/users").then((res) => {
      const data = res.data.map((user) => ({
        id: user.id,
        name: `${user.name}(${user.username})`,
        email: user.email,
        address: `${user.address.city}${user.address.suite}${user.address.street}`
      }));
      setUserProfiles(data);
    })
    .catch(() => {
      setError(true);
    })
    .finally(() => {
      setLoading(false);
    });
  };

  return (
    <>
      <div className='App'>
        <button onClick={onClickFetchUser}>GET DATA</button>
        <br />
        {error ? (
          <p style={{ color: "red" }}>FAILURE TO GET DATA</p>
        ) : loading ? (
          <p>Loadging.......</p>
        ) : (
          <>
            {userProfiles.map((user) => (
              <UserCard key={user.id} user={user}/>
            ))}
          </>
        )}
      </div>
    </>
  );
};
