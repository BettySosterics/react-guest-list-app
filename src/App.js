import { useState } from 'react';

export default function App() {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');

  // function handleFirstNameSubmit(event) {
  //   setFirstName(event.currentTarget.value);
  // }

  // function handleLastNameSubmit(event) {
  //   setLastName(event.currentTarget.value);
  // }

  function handleButtonSubmit() {
    return `${firstName} ${lastName}`;
  }

  return (
    <>
      <header>
        <h1>React Guest List</h1>
      </header>

      <main>
        <form onSubmit={(event) => event.preventDefault()}>
          <div>
            <p>Please add the first and last name to sign up:</p>
            <input
              onChange={(event) => setFirstName(event.target.value)}
              value={firstName}
              placeholder="first name"
            />
            <br /> <br />
            <input
              onChange={(event) => setLastName(event.target.value)}
              value={lastName}
              placeholder="last name"
            />
            <br />
            <br />
            <button onClick={handleButtonSubmit}>add as a guest</button>
            <br />
            <br />
          </div>
        </form>
        <hr />
        <div>
          <section>
            <h2>Added guests</h2>
            <p>{handleButtonSubmit()}</p>
          </section>
        </div>
      </main>
    </>
  );
}
