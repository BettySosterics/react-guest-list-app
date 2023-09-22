import { nanoid } from 'nanoid';
import { useState } from 'react';
import styles from './App.module.scss';

const guestList = [
  {
    firstname: 'Billie Joe',
    lastname: 'Armstrong',
    attending: true,
    uuid: '1',
  },
  {
    firstname: 'Kelly',
    lastname: 'Clarkson',
    attending: true,
    uuid: '2',
  },
  {
    firstname: 'Michelle',
    lastname: 'Pfeiffer',
    attending: false,
    uuid: '3',
  },
];

export default function AppTest() {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');

  const [guests, setGuests] = useState(guestList);
  const [isAttending, setIsAttending] = useState(false);

  function handleSubmit(e) {
    e.preventDefault();
  }
  function handleFirstNameChange(e) {
    setFirstName(e.target.value);
  }
  function handleLastNameChange(e) {
    setLastName(e.target.value);
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
            onChange={handleFirstNameChange}
          />
          <input
            placeholder="last name"
            value={lastName}
            onChange={handleLastNameChange}
          />
          <button
            className={styles.button}
            onClick={() => {
              const newUserId = guests[guests.length - 1].uuid + 1;
              const newGuest = {
                firstname: 'Mike',
                lastname: 'Dirnt',
                attending: true,
                uuid: newUserId,
              };

              const newGuests = [...guestList];
              newGuests.push(newGuest);
              setGuests(newGuests);
              setGuests([...guests, newGuest]);
            }}
          >
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
          {firstName} {lastName}
          <br />
          <br />
          {guests.map((guest) => {
            return (
              <div key={`guest-list-${guest.uuid}`}>
                <h3>
                  {guest.firstname} {guest.lastname}{' '}
                  {guest.attending === isAttending
                    ? 'attending'
                    : 'not attending'}
                </h3>
              </div>
            );
          })}
          <input
            type="checkbox"
            checked={isAttending}
            onChange={(event) => {
              setIsAttending(event.currentTarget.checked);
            }}
          />
          {isAttending ? 'attending' : 'not attending'}
        </div>
      </main>
    </>
  );
}

{
  /* from jose */
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
