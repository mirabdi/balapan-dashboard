import React, { useState } from 'react';
import { ChevronDown, ChevronRight, Folder } from 'lucide-react';

const FolderItem = ({ item, level, onSelect }) => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleOpen = (e) => {
    e.stopPropagation();
    setIsOpen(!isOpen);
  };

  const handleSelect = (e) => {
    e.stopPropagation();
    onSelect(item);
  };

  return (
    <div className="select-none">
      <div 
        className={`flex items-center p-2 hover:bg-gray-100 cursor-pointer ${level > 0 ? `ml-${level * 4}` : ''}`}
        onClick={handleSelect}
      >
        {item.subassortments && item.subassortments.length > 0 ? (
          <div onClick={toggleOpen}>
            {isOpen ? <ChevronDown className="w-4 h-4 mr-2" /> : <ChevronRight className="w-4 h-4 mr-2" />}
          </div>
        ) : (
          <div className="w-4 h-4 mr-2" />
        )}
        <Folder className="w-5 h-5 mr-2 text-blue-500" />
        <span>{item.title}</span>
      </div>
      {isOpen && item.subassortments && item.subassortments.length > 0 && (
        <div className={`ml-${(level + 1) * 4}`}>
          {item.subassortments.map((subItem, index) => (
            <FolderItem 
              key={index} 
              item={subItem} 
              level={level + 1} 
              onSelect={onSelect}
            />
          ))}
        </div>
      )}
    </div>
  );
};

const BrowseHierarchy = ({ hierarchy, onSelect }) => {
  // Placeholder hierarchy for testing
  const placeholderHierarchy = {
    title: "Root Folder",
    subassortments: [
      {
        title: "Documents",
        subassortments: [
          { 
            title: "Work",
            subassortments: [
              { title: "Project A", subassortments: [] },
              { title: "Project B", subassortments: [] }
            ]
          },
          { 
            title: "Personal",
            subassortments: [
              { title: "Finances", subassortments: [] },
              { title: "Recipes", subassortments: [] }
            ]
          }
        ]
      },
      {
        title: "Pictures",
        subassortments: [
          { title: "Vacation 2023", subassortments: [] },
          { title: "Family", subassortments: [] }
        ]
      },
      {
        title: "Music",
        subassortments: [
          { title: "Rock", subassortments: [] },
          { title: "Jazz", subassortments: [] },
          { title: "Classical", subassortments: [] }
        ]
      }
    ]
  };

  const handleSelect = (selectedFolder) => {
    console.log("Selected folder:", selectedFolder);
    if (onSelect) {
      onSelect(selectedFolder);
    }
  };

  return (
    <div className="w-full max-w-md border border-gray-200 rounded-lg overflow-hidden">
      <div className="bg-gray-50 p-4 border-b border-gray-200">
        <h2 className="text-lg font-semibold">Browse Folders</h2>
      </div>
      <div className="p-4">
        <FolderItem item={hierarchy || placeholderHierarchy} level={0} onSelect={handleSelect} />
      </div>
    </div>
  );
};

export default BrowseHierarchy;