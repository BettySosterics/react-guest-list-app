import { useState } from 'react';

export default function App() {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');

  function handleSubmit(e) {
    e.preventDefault();
  }
  return (
    <>
      <header>
        <h1>React Guest List</h1>
      </header>

      <main>
        <form onSubmit={handleSubmit}>
          <div>
            <p>Please add the first and last name to sign up:</p>
            <input
              onChange={() => {
                setFirstName();
              }}
              value={firstName}
              placeholder="first name"
            />
            <br /> <br />
            <input
              onChange={() => {
                setLastName();
              }}
              value={lastName}
              placeholder="last name"
            />
            <br />
            <br />
            <button onClick={() => setFirstName(firstName)}>
              add as a guest
            </button>
            <br />
            <br />
          </div>
        </form>
        <hr />
        <div>
          <h2>Added guests</h2>
          <p>
            {firstName} {lastName}
          </p>
        </div>
      </main>
    </>
  );
}
