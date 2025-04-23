// src/components/learning/LessonTabs.tsx
import React from 'react';

interface Tab {
  id: string;
  label: string;
  isAvailable: boolean;
}

interface LessonTabsProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
  theme: string;
  tabs: Tab[];
}

const LessonTabs: React.FC<LessonTabsProps> = ({ activeTab, setActiveTab, theme, tabs }) => {
  return (
    <div className={`border-b ${theme === 'dark' ? 'border-gray-700' : 'border-gray-200'} mb-6`}>
      <nav className="flex -mb-px overflow-x-auto">
        {tabs.map(tab => (
          tab.isAvailable && (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`mr-8 py-4 px-1 border-b-2 font-medium text-sm whitespace-nowrap ${
                activeTab === tab.id
                  ? theme === 'dark' 
                    ? 'border-purple-500 text-purple-400' 
                    : 'border-blue-500 text-blue-600'
                  : theme === 'dark'
                    ? 'border-transparent text-gray-400 hover:text-gray-300 hover:border-gray-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
            >
              {tab.label}
            </button>
          )
        ))}
      </nav>
    </div>
  );
};

export default LessonTabs;