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
      attending: false,
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
          {guests.map((guest) => {
            return (
              <div key="guest-list-id">
                <li>
                  {guest.firstName} {guest.lastName}
                  <input
                    type="checkbox"
                    checked={isAttending}
                    onChange={(event) => {
                      setIsAttending(event.currentTarget.checked);
                    }}
                  />{' '}
                  attending?
                  {/* {guest.attending ? 'Attending' : 'Not Attending'}{' '} */}
                  {/* {guest.attending === isAttending
                    ? 'attending'
                    : 'not attending'} */}
                </li>
              </div>
            );
          })}

          {/* {isAttending ? 'attending' : 'not attending'} */}
        </div>
      </main>
    </>
  );
}

// const people = [
//   {
//     name: {
//       first: '',
//       last: '',
//     },
//     uuid: '0',
//   },
//   {
//     name: {
//       first: '',
//       last: '',
//     },
//     uuid: '1',
//   },
// ];

// export default function ExampleArrayOfObjectsInReact() {
//   const [users, setUsers] = useState(people);
//   return (
//     <div>
//       {users.map((user) => {
//         return (
//           <div key={`user-profile-${user.uuid}`}>
//             <h2>
//               {user.name.first} {user.name.last}
//             </h2>

//             <hr />
//           </div>
//         );
//       })}
//       <button
//         onClick={() => {
//           const newUserId = users[users.length - 1].uuid + 1;
//           const newUser = {
//             name: {
//               first: 'Derek',
//               last: 'Gonzales',
//             },
//             uuid: newUserId,
//           };
//           // // 1. Create a copy of the current state
//           const newPeople = [...users]; // spread operator
//           // // 2. Update the copy created in step 1
//           newPeople.push(newUser);
//           // // 3. Set the state to the old state
//           setUsers(newPeople);
//           setUsers([...users, newUser]);
//         }}
//       >
//         Add new user
//       </button>

//       <button
//         onClick={() => {
//           const newPeople = [...users];
//           newPeople.pop();
//           setUsers(newPeople);
//         }}
//       >
//         Delete last user
//       </button>
//       {/* <h2>
//         {users.name.title} {users.name.first} {users.name.last}
//       </h2>
//       <div>
//         Location: {users.location.city}, {users.location.country}
//       </div>
//       <div>Email: {users.email}</div> */}
//     </div>
//   );
// }
