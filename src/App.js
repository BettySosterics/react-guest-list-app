import { useEffect, useState } from 'react';
import styles from './App.module.scss';
import AppTest from './AppTest';
import DataFetching from './DataFetching';

export default function App() {
  const baseUrl = 'http://localhost:4000';
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [guestList, setGuestList] = useState([]);
  const [newGuest, setNewGuest] = useState('');
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function getGuestList() {
      const response = await fetch(`${baseUrl}/guests`);
      const allGuests = await response.json();
      setGuestList(allGuests);
      setIsLoading(false);
    }
    getGuestList().catch((error) => {
      console.error(error);
    });
  }, [newGuest]);

  useEffect(() => {
    async function firstRenderFetch() {
      const response = await fetch(`${baseUrl}/guests`);
      const data = await response.json();
      setGuestList([data]);
      setIsLoading(false);
    }
    firstRenderFetch().catch((error) => {
      console.log(error);
    });
  }, []); // triggers only on first render

  // Add a new guest
  function handleSubmit(e) {
    e.preventDefault();
  }

  async function createGuest() {
    const response = await fetch(`${baseUrl}/guests`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        firstName: firstName,
        lastName: lastName,
      }),
    });
    const createdGuest = await response.json();
    setFirstName('');
    setLastName('');
    setNewGuest([...guestList, createdGuest]);
  }

  if (isLoading) {
    return 'Loading...';
  }
  return (
    <>
      <header>
        <h1>React Guest List</h1>
      </header>
      <main>
        <form onSubmit={handleSubmit}>
          <p>Please add the first and last name to sign up:</p>
          <input
            onChange={(event) => setFirstName(event.currentTarget.value)}
            value={firstName}
            placeholder="first name"
          />
          <input
            onChange={(event) => setLastName(event.currentTarget.value)}
            value={lastName}
            placeholder="last name"
          />
          <button
            className={styles.button}
            onClick={async () => await createUser()}
          >
            ADD GUEST
          </button>
          <br />
        </form>
        <hr />
        <section className={styles.guestList}>
          <h2>Added guests</h2>
          {/* <p>{handleButtonSubmit()}</p> */}
          {/* <DataFetching /> */}

          {guestList.map((guest) => {
            return (
              <div key={`guest-${guest.id}`}>
                {guest.firstName} {guest.lastName}
                <div>Attending: {guest.attending}</div>
                <hr />
              </div>
            );
          })}
        </section>
      </main>
    </>
  );
}
