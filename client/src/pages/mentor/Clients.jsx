import React from 'react';

// Assuming userList is an array of user objects containing user details
const userList = [
  {
    id: 1,
    name: 'John Doe',
    title: 'Software Engineer',
    profilePic: 'https://www.gravatar.com/avatar/2c7d99fe281ecd3bcd65ab915bac6dd5?s=250',
    // Other user details
  },
  {
    id: 2,
    name: 'Jane Smith',
    title: 'UX Designer',
    profilePic: 'https://i.pravatar.cc/250?u=mail@ashallendesign.co.uk',
    // Other user details
  },
  {
    id: 2,
    name: 'Jane Smith',
    title: 'UX Designer',
    profilePic: 'https://i.pravatar.cc/250?u=mail@ashallendesign.co.uk',
    // Other user details
  },
  {
    id: 2,
    name: 'Jane Smith',
    title: 'UX Designer',
    profilePic: 'https://i.pravatar.cc/250?u=mail@ashallendesign.co.uk',
    // Other user details
  },
  {
    id: 2,
    name: 'Jane Smith',
    title: 'UX Designer',
    profilePic: 'https://i.pravatar.cc/250?u=mail@ashallendesign.co.uk',
    // Other user details
  },
  {
    id: 2,
    name: 'Jane Smith',
    title: 'UX Designer',
    profilePic: 'https://i.pravatar.cc/250?u=mail@ashallendesign.co.uk',
    // Other user details
  },
  // Add more user objects as needed
];

const Clients = () => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
      {userList.map(user => (
        <div key={user.id} className="bg-white rounded-lg shadow-md p-4">
          <img src={user.profilePic} alt={user.name} className="w-24 h-24 rounded-full mx-auto" />
          <div className="text-center mt-4">
            <h2 className="text-lg font-semibold">{user.name}</h2>
            <p className="text-gray-600">{user.title}</p>
            <button className='mt-1 px-4 py-1 border-cyan-600 border-2 rounded-lg text-cyan-600'>Start Chat</button>
            {/* You can display additional user details here */}
          </div>
        </div>
      ))}
    </div>
  );
};

export default Clients;
