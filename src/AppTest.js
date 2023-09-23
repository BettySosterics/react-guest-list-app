// import { nanoid } from 'nanoid';
import { useState } from 'react';
import styles from './App.module.scss';

// const guestList = [
//   {
//     firstname: 'Billie Joe',
//     lastname: 'Armstrong',
//     attending: true,
//     uuid: '1',
//   },
//   {
//     firstname: 'Kelly',
//     lastname: 'Clarkson',
//     attending: true,
//     uuid: '2',
//   },
//   {
//     firstname: 'Michelle',
//     lastname: 'Pfeiffer',
//     attending: false,
//     uuid: '3',
//   },
// ];

export default function AppTest() {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');

  const [guests, setGuests] = useState([]);
  const [isAttending, setIsAttending] = useState(false);

  // const newUserId = guests[guests.length - 1].uuid + 1;

  const addGuest = () => {
    if (firstName.trim() === '' || lastName.trim() === '') {
      return;
    }
    const newGuest = {
      firstName,
      lastName,
      isAttending,
      // uuid: newUserId,
    };
    setGuests([...guests, newGuest]);
    setFirstName('');
    setLastName('');
  };

  const handleEnter = (e) => {
    if (e.key === 'Enter') {
      addGuest();
    }
  };

  function handleSubmit(e) {
    e.preventDefault();
  }

  return (
    <>
      <header>
        <h1>Guest List</h1>
      </header>
      <main>
        <form className="form" onSubmit={handleSubmit}>
          <p>Please add the first and last name to sign up:</p>
          <input
            placeholder="first name"
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
          />
          <input
            placeholder="last name"
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
            onKeyDown={handleEnter}
          />
          <button className={styles.button} onClick={addGuest}>
            ADD GUEST
          </button>

          <button
            className={styles.button}
            onClick={() => {
              const newGuests = [...guests];
              newGuests.pop();
              setGuests(newGuests);
            }}
          >
            DELETE GUEST
          </button>
          <br />
        </form>

        <div className="guestlist">
          {/* <p>Please check if the name is correct:</p> */}
          {/* {firstName} {lastName} */}
          <br />
          <br />
          {/* <div>
            {guests.map((guest, index) => (
              <div key={`{index-${index.id}`} data-test-id="guest">
                <p>
                  Name: {guest.firstName} {guest.lastName}
                </p>
              </div>
            ))}
          </div> */}
          {guests.map((guest, index) => {
            return (
              <div key={`{index-${index.id}`}>
                <li>
                  {guest.firstName} {guest.lastName}{' '}
                  {guest.isAttending ? 'attending' : 'not attending'}
                  <input
                    type="checkbox"
                    checked={isAttending}
                    onChange={(event) => {
                      setIsAttending(event.currentTarget.checked);
                    }}
                  />{' '}
                </li>
              </div>
            );
          })}
        </div>
      </main>
    </>
  );
}
