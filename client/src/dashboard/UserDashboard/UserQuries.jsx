import React from 'react';

const UserQuires = ({ goto }) => (
  <div className="bg-white rounded-lg shadow p-6">
    <div className="flex justify-between items-center">
      <h2 className="text-xl font-bold mb-4">My Work</h2>
      <button type="button" onClick={goto} className="ml-3 inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">Create Work</button>
    </div>
    {/* Add your work grid here */}
  </div>
);

export default UserQuires;
