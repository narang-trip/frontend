

const SubscribePage = () => {
  
  return (
    <div className="flex space-x-4 mt-8">
      <button
        onClick={() => onUserClick("user1")}
        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
      >
        User 1
      </button>
      <button
        onClick={() => onUserClick("user2")}
        className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
      >
        User 2
      </button>
    </div>
  );
};

export default SubscribePage;