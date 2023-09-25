import { nanoid } from 'nanoid';
import { useState } from 'react';
import styles from './App.module.scss';

export default function AppTest() {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');

  const [guests, setGuests] = useState([]);
  // const [isAttending, setIsAttending] = useState(false);
  // const [id, setId] = useState();
  // const [isCookieAccepted, setIsCookieAccepted] = useState(false);

  const addGuest = () => {
    if (firstName.trim() === '' || lastName.trim() === '') {
      return;
    }
    // const newGuestId = guests[guests.length - 1].id + 1;
    const newGuest = {
      firstName,
      lastName,
      attending: false,
      id: nanoid(),
    };
    setGuests([...guests, newGuest]);
    setFirstName('');
    setLastName('');
    // setId();
  };

  const clickDeleteGuest = (index) => {
    const updatedGuests = guests.filter((guest) => guest.id !== index);
    setGuests(updatedGuests);
  };

  const changeAttendingStatus = (index) => {
    const updateAttending = [...guests];
    updateAttending[index].attending = !updateAttending[index].attending;
    setGuests(updateAttending);
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
          <label htmlFor={firstName}>first name</label>{' '}
          <input
            placeholder="first name"
            value={firstName}
            id={firstName}
            onChange={(e) => setFirstName(e.target.value)}
          />
          <label htmlFor={lastName}>last name</label>{' '}
          <input
            placeholder="last name"
            value={lastName}
            id={lastName}
            onChange={(e) => setLastName(e.target.value)}
            onKeyDown={handleEnter}
          />
          <button className={styles.button} onClick={addGuest}>
            ADD GUEST
          </button>
          <br />
        </form>

        <div className="guestlist" data-test-id="guest">
          {guests.map((guest, index) => (
            <li key={`guest-${nanoid()}`}>
              {guest.firstName} {guest.lastName}{' '}
              {JSON.parse(
                JSON.stringify(
                  guest.attending ? 'is attending' : 'is not attending',
                ),
              )}
              <input
                aria-label="attending"
                type="checkbox"
                // checked={id.isAttending}
                checked={guest.attending}
                onChange={() => {
                  changeAttendingStatus(index);
                }}
              />{' '}
              <button
                className={styles.button}
                onClick={() => {
                  clickDeleteGuest(guest.id);
                }}
              >
                DELETE GUEST
              </button>
              <hr />
            </li>
          ))}
          {/* <hr />
          <form>
            {JSON.stringify(
              isCookieAccepted ? 'is accepted' : 'is not accepted',
            )}
            <input
              type="checkbox"
              // 2. connect the state variables to the form fields
              checked={isCookieAccepted}
              // 3. Update the state value with the event.currentTarget.checked
              onChange={(event) => {
                setIsCookieAccepted(event.currentTarget.checked);
              }}
            />
          </form> */}
          {/* {guests.map((guest) => {
            return (
              <div key={guest - id}>
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
          })} */}
        </div>
      </main>
    </>
  );
}
