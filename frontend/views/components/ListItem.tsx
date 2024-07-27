// views/ListItem.tsx
import React from "react";

interface ListItemProps {
  name: string;
  onEdit: () => void;
  onDelete: () => void;
  onClick: () => void;
  isSelected: boolean;
}

const ListItem: React.FC<ListItemProps> = ({ name, onEdit, onDelete, onClick, isSelected }) => {
  return (
    <div 
      className={`flex justify-between items-center p-4 rounded-lg shadow-md mb-2 cursor-pointer ${isSelected ? 'bg-blue-200' : 'bg-gray-100 hover:bg-gray-200'}`} 
      onClick={onClick}
    >
      <span className="text-lg font-semibold text-blue-700">{name}</span>
      <div className="space-x-4">
        <button onClick={(e) => { e.stopPropagation(); onEdit(); }} className="text-blue-500 hover:text-blue-700">
          <i className="fas fa-edit"></i>
        </button>
        <button onClick={(e) => { e.stopPropagation(); onDelete(); }} className="text-red-500 hover:text-red-700">
          <i className="fas fa-trash"></i>
        </button>
      </div>
    </div>
  );
};

export default ListItem;
