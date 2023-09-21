// From Codesandbox
import { useEffect, useState } from 'react';

export default function DataFetching() {
  const baseUrl = 'http://localhost:4000/';
  // Define the allData
  const [guestList, setGuestList] = useState();
  // Guest List input fields
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  // Define newUser
  const [newGuest, setNewGuest] = useState('');
  const [isLoading, setIsLoading] = useState(true);

  // Get list with all guests
  useEffect(() => {
    const getGuestList = async () => {
      const response = await fetch(`${baseUrl}/guests`);
      const guestsData = await response.json();
      setGuestList(guestsData);
      setIsLoading(false);
    };
    getGuestList().catch((error) => {
      console.error(error);
    });
  }, [newGuest]);

  function handleSubmit(e) {
    e.preventDefault();

    // Create a new guest with POST method
    const addNewGuest = async () => {
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
      setNewGuest(createdGuest);
    };
    addNewGuest().catch((error) => {
      console.error(error);
    });
  }

  // Delete guest with DELETE method
  function handleDelete(id) {
    const deleteGuest = async () => {
      const response = await fetch(`${baseUrl}/guests/${id}`, {
        method: 'DELETE',
      });
      const deletedUser = await response.json();
      setNewGuest(deletedUser);
    };
    deleteGuest().catch((error) => {
      console.error(error);
    });
  }

  // Update guest status with PUT method
  function handleUpdate(id) {
    const updateGuestStatus = async () => {
      const response = await fetch(`${baseUrl}/guests/${id}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ attending: true }),
      });
      const updatedGuest = await response.json();
      setNewGuest(updatedGuest);
    };
    updateGuestStatus().catch((error) => {
      console.error(error);
    });
  }

  // Show a loading message if data is not fully fetched from the server
  if (isLoading) {
    return <div>Loading...</div>;
  } else {
    return (
      <div data-test-id="guest">
        <h1>GUEST LIST</h1>
        <section>
          <form onSubmit={handleSubmit}>
            <label>
              First name
              <input
                value={firstName}
                disabled={isLoading}
                onChange={(event) => setFirstName(event.currentTarget.value)}
              />
            </label>

            <label>
              Last name
              <input
                value={lastName}
                disabled={isLoading}
                onChange={(event) => setLastName(event.currentTarget.value)}
              />
            </label>

            <button
              type="button"
              onClick={() => {
                addNewGuest(guest.id);
              }}
            >
              ADD GUEST
            </button>
          </form>
          <div data-test-id="guest">
            {/* Guest list Table */}
            <table>
              <thead>
                <tr>
                  <th>Attending</th>
                  <th>Guest Name</th>
                </tr>
              </thead>
              <tbody>
                {guestList.map((guest) => {
                  return (
                    <tr key={guest.id}>
                      <td>
                        <input
                          data-test-id="guest"
                          type="checkbox"
                          aria-label="Attending"
                          defaultChecked={guest.attending}
                          onChange={() => {
                            handleUpdate(guest.id, guest.attending);
                            console.log(guest);
                          }}
                        />
                      </td>
                      <td>
                        {guest.firstName} {guest.lastName}{' '}
                      </td>
                      <td>
                        <button
                          type="button"
                          aria-label="Remove"
                          onClick={() => {
                            handleDelete(guest.id);
                          }}
                        >
                          REMOVE GUEST
                        </button>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </section>
      </div>
    );
  }
}

///
// From upleveled

// import { useEffect, useState } from 'react';

// export default function DataFetching() {
//   const [users, setUsers] = useState([]);
//   const [usersQuantity, setUsersQuantity] = useState(0);
//   const [isLoading, setIsLoading] = useState(true);

//   async function getUser() {
//     const response = await fetch('https://randomuser.me/api/');

//     const data = await response.json();

//     setUsers([...users, data.results[0]]);
//   }

//   useEffect(() => {
//     async function firstRenderFetch() {
//       const response = await fetch('https://randomuser.me/api/');

//       const data = await response.json();

//       setUsers([data.results[0]]);

//       setIsLoading(false);
//     }

//     firstRenderFetch().catch((error) => {
//       console.log(error);
//     });
//   }, []); // triggers only on first render

//   useEffect(() => {
//     async function fetchOnChange() {
//       const response = await fetch('https://randomuser.me/api/');

//       const data = await response.json();

//       setUsers([...users, data.results[0]]);
//     }

//     fetchOnChange().catch((error) => {
//       console.log(error);
//     });
//   }, [usersQuantity]); // triggers every time the usersQuantity changes

//   if (isLoading) {
//     return 'Loading...';
//   }

//   return (
//     <>
//       {users.map((user) => {
//         return (
//           <div key={`user-profile-${user.uuid}`}>
//             <img src={user.picture.medium} alt="profile pic" />
//             {user.gender === 'female' ? '♀' : '♂'}
//             <h2>
//               {user.name.title} {user.name.first} {user.name.last}
//             </h2>
//             <div>
//               Location: {user.location.city}, {user.location.country}
//             </div>
//             <div>Email: {user.email}</div>
//             <hr />
//           </div>
//         );
//       })}
//       <button onClick={async () => await getUser()}>get new user</button>
//     </>
//   );
// }
