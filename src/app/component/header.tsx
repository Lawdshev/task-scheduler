import React from "react";

const Header = ({ onAddTask }: { onAddTask: Function }) => {
  return (
    <header className="bg-blue-600 p-4 w-full flex items-center justify-between">
      <div className="flex items-center ">
        <div className="text-white text-lg font-bold mr-12">Schedule Me</div>
        <div className="flex-grow max-w-[300px] mx-4">
          <input
            type="text"
            placeholder="Search for tasks..."
            className="w-full px-4 py-2 rounded-lg border-2 border-blue-400 focus:outline-none focus:ring-2 focus:ring-blue-200"
          />
        </div>
        
        <button className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-400 focus:outline-none focus:ring-2 focus:ring-blue-200" onClick={() => onAddTask()} >
          Schedule Task
        </button>
      </div>

      <div className="flex items-center self-end ml-4">
     
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
