import { nanoid } from 'nanoid';
import { useState } from 'react';
import { sassTrue } from 'sass';
import styles from './App.module.scss';

// const baseUrl = 'http://localhost:4000';

export default function App() {
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

    // const response = await fetch(`${baseUrl}/guests`, {
    //   method: 'POST',
    //   headers: {
    //     'Content-Type': 'application/json',
    //   },
    //   body: JSON.stringify({ firstName,
    //     lastName,
    //     attending: false,
    //     id: nanoid(), }),
    // });

    // const newGuest = await response.json();
    setGuests([...guests, newGuest]);
    setFirstName('');
    setLastName('');
    // setId();
  };

  const clickDeleteGuest = (index) => {
    const updatedGuests = guests.filter((guest) => guest.id !== index);
    setGuests(updatedGuests);

    //     const response = await fetch(`${baseUrl}/guests/1`, { method: 'DELETE' });
    // const deletedGuest = await response.json();
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
          {/* <p>Please add the first and last name to sign up:</p> */}
          <label htmlFor={firstName}>
            <input
              placeholder="first name"
              value={firstName}
              id={firstName}
              onChange={(e) => setFirstName(e.target.value)}
              required
            />
          </label>{' '}
          <label htmlFor={lastName}>
            <input
              placeholder="last name"
              value={lastName}
              id={lastName}
              onChange={(e) => setLastName(e.target.value)}
              onKeyDown={handleEnter}
              required
            />
          </label>{' '}
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
                className={styles.removeButton}
                onClick={() => {
                  clickDeleteGuest(guest.id);
                }}
              >
                REMOVE
              </button>
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

/// AppOld.js

// import { useEffect, useState } from 'react';
// import AppTest from './App';
// import styles from './App.module.scss';
// import DataFetching from './DataFetching';

// export default function App() {
//   const baseUrl = 'http://localhost:4000';
//   const [firstName, setFirstName] = useState('');
//   const [lastName, setLastName] = useState('');
//   const [guestList, setGuestList] = useState([]);
//   const [newGuest, setNewGuest] = useState('');
//   const [isLoading, setIsLoading] = useState(true);

//   useEffect(() => {
//     async function getGuestList() {
//       const response = await fetch(`${baseUrl}/guests`);
//       const allGuests = await response.json();
//       setGuestList(allGuests);
//       setIsLoading(false);
//     }
//     getGuestList().catch((error) => {
//       console.error(error);
//     });
//   }, [newGuest]);

//   useEffect(() => {
//     async function firstRenderFetch() {
//       const response = await fetch(`${baseUrl}/guests`);
//       const data = await response.json();
//       setGuestList([data]);
//       setIsLoading(false);
//     }
//     firstRenderFetch().catch((error) => {
//       console.log(error);
//     });
//   }, []); // triggers only on first render

//   // Add a new guest
//   function handleSubmit(e) {
//     e.preventDefault();
//   }

//   async function createGuest() {
//     const response = await fetch(`${baseUrl}/guests`, {
//       method: 'POST',
//       headers: {
//         'Content-Type': 'application/json',
//       },
//       body: JSON.stringify({
//         firstName: firstName,
//         lastName: lastName,
//       }),
//     });
//     const createdGuest = await response.json();
//     setFirstName('');
//     setLastName('');
//     setNewGuest([...guestList, createdGuest]);
//   }

//   if (isLoading) {
//     return 'Loading...';
//   }
//   return (
//     <>
//       <header>
//         <h1>React Guest List</h1>
//       </header>
//       <main>
//         <form onSubmit={handleSubmit}>
//           <p>Please add the first and last name to sign up:</p>
//           <input
//             onChange={(event) => setFirstName(event.currentTarget.value)}
//             value={firstName}
//             placeholder="first name"
//           />
//           <input
//             onChange={(event) => setLastName(event.currentTarget.value)}
//             value={lastName}
//             placeholder="last name"
//           />
//           <button
//             className={styles.button}
//             onClick={async () => await createUser()}
//           >
//             ADD GUEST
//           </button>
//           <br />
//         </form>
//         <hr />
//         <section className={styles.guestList}>
//           <h2>Added guests</h2>
//           {/* <p>{handleButtonSubmit()}</p> */}
//           {/* <DataFetching /> */}

//           {guestList.map((guest) => {
//             return (
//               <div key={`guest-${guest.id}`}>
//                 {guest.firstName} {guest.lastName}
//                 <div>Attending: {guest.attending}</div>
//                 <hr />
//               </div>
//             );
//           })}
//         </section>
//       </main>
//     </>
//   );
// }

// From Codesandbox
// import { useEffect, useState } from 'react';

// export default function DataFetching() {
//   const baseUrl = 'http://localhost:4000/';
//   // Define the allData
//   const [guestList, setGuestList] = useState();
//   // Guest List input fields
//   const [firstName, setFirstName] = useState('');
//   const [lastName, setLastName] = useState('');
//   // Define newUser
//   const [newGuest, setNewGuest] = useState('');
//   const [isLoading, setIsLoading] = useState(true);

//   // Get list with all guests
//   useEffect(() => {
//     const getGuestList = async () => {
//       const response = await fetch(`${baseUrl}/guests`);
//       const guestsData = await response.json();
//       setGuestList(guestsData);
//       setIsLoading(false);
//     };
//     getGuestList().catch((error) => {
//       console.error(error);
//     });
//   }, [newGuest]);

//   function handleSubmit(e) {
//     e.preventDefault();

//     // Create a new guest with POST method
//     const addNewGuest = async () => {
//       const response = await fetch(`${baseUrl}/guests`, {
//         method: 'POST',
//         headers: {
//           'Content-Type': 'application/json',
//         },
//         body: JSON.stringify({
//           firstName: firstName,
//           lastName: lastName,
//         }),
//       });
//       const createdGuest = await response.json();
//       setFirstName('');
//       setLastName('');
//       setNewGuest(createdGuest);
//     };
//     addNewGuest().catch((error) => {
//       console.error(error);
//     });
//   }

//   // Delete guest with DELETE method
//   function handleDelete(id) {
//     const deleteGuest = async () => {
//       const response = await fetch(`${baseUrl}/guests/${id}`, {
//         method: 'DELETE',
//       });
//       const deletedUser = await response.json();
//       setNewGuest(deletedUser);
//     };
//     deleteGuest().catch((error) => {
//       console.error(error);
//     });
//   }

//   // Update guest status with PUT method
//   function handleUpdate(id) {
//     const updateGuestStatus = async () => {
//       const response = await fetch(`${baseUrl}/guests/${id}`, {
//         method: 'PATCH',
//         headers: {
//           'Content-Type': 'application/json',
//         },
//         body: JSON.stringify({ attending: true }),
//       });
//       const updatedGuest = await response.json();
//       setNewGuest(updatedGuest);
//     };
//     updateGuestStatus().catch((error) => {
//       console.error(error);
//     });
//   }

//   // Show a loading message if data is not fully fetched from the server
//   if (isLoading) {
//     return <div>Loading...</div>;
//   } else {
//     return (
//       <div data-test-id="guest">
//         <h1>GUEST LIST</h1>
//         <section>
//           <form onSubmit={handleSubmit}>
//             <label>
//               First name
//               <input
//                 value={firstName}
//                 disabled={isLoading}
//                 onChange={(event) => setFirstName(event.currentTarget.value)}
//               />
//             </label>

//             <label>
//               Last name
//               <input
//                 value={lastName}
//                 disabled={isLoading}
//                 onChange={(event) => setLastName(event.currentTarget.value)}
//               />
//             </label>

//             <button
//               type="button"
//               onClick={() => {
//                 addNewGuest(guest.id);
//               }}
//             >
//               ADD GUEST
//             </button>
//           </form>
//           <div data-test-id="guest">
//             {/* Guest list Table */}
//             <table>
//               <thead>
//                 <tr>
//                   <th>Attending</th>
//                   <th>Guest Name</th>
//                 </tr>
//               </thead>
//               <tbody>
//                 {guestList.map((guest) => {
//                   return (
//                     <tr key={guest.id}>
//                       <td>
//                         <input
//                           data-test-id="guest"
//                           type="checkbox"
//                           aria-label="Attending"
//                           defaultChecked={guest.attending}
//                           onChange={() => {
//                             handleUpdate(guest.id, guest.attending);
//                             console.log(guest);
//                           }}
//                         />
//                       </td>
//                       <td>
//                         {guest.firstName} {guest.lastName}{' '}
//                       </td>
//                       <td>
//                         <button
//                           type="button"
//                           aria-label="Remove"
//                           onClick={() => {
//                             handleDelete(guest.id);
//                           }}
//                         >
//                           REMOVE GUEST
//                         </button>
//                       </td>
//                     </tr>
//                   );
//                 })}
//               </tbody>
//             </table>
//           </div>
//         </section>
//       </div>
//     );
//   }
// }

// ///
// // From upleveled

// // import { useEffect, useState } from 'react';

// // export default function DataFetching() {
// //   const [users, setUsers] = useState([]);
// //   const [usersQuantity, setUsersQuantity] = useState(0);
// //   const [isLoading, setIsLoading] = useState(true);

// //   async function getUser() {
// //     const response = await fetch('https://randomuser.me/api/');

// //     const data = await response.json();

// //     setUsers([...users, data.results[0]]);
// //   }

// //   useEffect(() => {
// //     async function firstRenderFetch() {
// //       const response = await fetch('https://randomuser.me/api/');

// //       const data = await response.json();

// //       setUsers([data.results[0]]);

// //       setIsLoading(false);
// //     }

// //     firstRenderFetch().catch((error) => {
// //       console.log(error);
// //     });
// //   }, []); // triggers only on first render

// //   useEffect(() => {
// //     async function fetchOnChange() {
// //       const response = await fetch('https://randomuser.me/api/');

// //       const data = await response.json();

// //       setUsers([...users, data.results[0]]);
// //     }

// //     fetchOnChange().catch((error) => {
// //       console.log(error);
// //     });
// //   }, [usersQuantity]); // triggers every time the usersQuantity changes

// //   if (isLoading) {
// //     return 'Loading...';
// //   }

// //   return (
// //     <>
// //       {users.map((user) => {
// //         return (
// //           <div key={`user-profile-${user.uuid}`}>
// //             <img src={user.picture.medium} alt="profile pic" />
// //             {user.gender === 'female' ? '♀' : '♂'}
// //             <h2>
// //               {user.name.title} {user.name.first} {user.name.last}
// //             </h2>
// //             <div>
// //               Location: {user.location.city}, {user.location.country}
// //             </div>
// //             <div>Email: {user.email}</div>
// //             <hr />
// //           </div>
// //         );
// //       })}
// //       <button onClick={async () => await getUser()}>get new user</button>
// //     </>
// //   );
// // }
