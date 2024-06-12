import './App.css'
import { UserCard } from './components/UserCard'
import { useAllUsers } from './hooks/useAllUsers';

export default function App() {
  const { getUsers, userProfiles, loading, error } = useAllUsers();

  const onClickFetchUser = () => getUsers();

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
