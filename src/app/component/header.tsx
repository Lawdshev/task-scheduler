import React from "react";

const Header = ({ onAddTask }: { onAddTask: Function }) => {
  return (
    <header className="bg-blue-600 p-4 w-full flex flex-col md:flex-row items-center justify-between">
      <div className="flex flex-col md:flex-row items-center w-full md:w-auto">
        <div className="text-white text-lg font-bold mb-2 md:mb-0 md:mr-12">
          Schedule Me
        </div>
        <div className="flex-grow w-full md:max-w-[300px] mb-2 md:mb-0 mx-4">
          <input
            type="text"
            placeholder="Search for tasks..."
            className="w-full px-4 py-2 rounded-lg border-2 border-blue-400 focus:outline-none focus:ring-2 focus:ring-blue-200"
          />
        </div>
        <button
          className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-400 focus:outline-none focus:ring-2 focus:ring-blue-200 md:min-w-[150px]"
          onClick={() => onAddTask()}
        >
          Schedule Task
        </button>
      </div>

      <div className="flex items-center self-end md:ml-4 mt-2 md:mt-0">
        <img
          src="https://via.placeholder.com/40"
          alt="User Avatar"
          className="w-10 h-10 rounded-full mr-2"
        />
        <span className="text-white font-medium">Okunade Sherif</span>
      </div>
    </header>
  );
};

export default Header;
