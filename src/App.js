import { useEffect, useState } from 'react';
import styles from './App.module.scss';
import DataFetching from './DataFetching';

export default function App() {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');

  const [guests, setGuests] = useState([]);
  const [guestId, setGuestId] = useState(0);
  const [isLoading, setIsLoading] = useState(true);

  async function getGuests() {
    const baseUrl = 'http://localhost:4000';
    const response = await fetch(`${baseUrl}/guests`);

    const allGuests = await response.json();

    setGuestId(0);
    setGuests([...guests, allGuests.body]);
  }

  useEffect(() => {
    async function firstRenderFetch() {
      const baseUrl = 'http://localhost:4000';
      const response = await fetch(`${baseUrl}/guests`);

      const data = await response.json();

      setGuests([data.body]);

      setIsLoading(false);
    }

    firstRenderFetch().catch((error) => {
      console.log(error);
    });
  }, []); // triggers only on first render

  useEffect(() => {
    async function createGuest() {
      const baseUrl = 'http://localhost:4000';
      const response = await fetch(`${baseUrl}/guests`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          firstName: { firstName },
          lastName: { lastName },
        }),
      });
      const createdGuest = await response.json();
      console.log(createdGuest.body.firstName);

      setGuests([...guests, createdGuest.body]);
    }

    createGuest().catch((error) => {
      console.log(error);
    });
  }, [guestId]);

  if (isLoading) {
    return 'Loading...';
  }

  return (
    <>
      <header>
        <h1>React Guest List</h1>
      </header>

      <main>
        <form onSubmit={(event) => event.preventDefault()}>
          <p>Please add the first and last name to sign up:</p>
          <input
            onChange={(event) => setFirstName(event.target.value)}
            value={firstName}
            placeholder="first name"
          />

          <input
            onChange={(event) => setLastName(event.target.value)}
            value={lastName}
            placeholder="last name"
          />

          <button
            className={styles.button}
            onClick={async () => await getGuests()}
          >
            ADD GUEST
          </button>
          <br />
        </form>
        <hr />

        <section className={styles.guestList}>
          <h2>Added guests</h2>
          <DataFetching />

          {/* <p>{handleButtonSubmit()}</p> */}

          {/* <DataFetching /> */}

          {guests.map((guest) => {
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
