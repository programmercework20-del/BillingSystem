import React from 'react';
import Icon from '../../../components/AppIcon';

const CategoryTabs = ({ categories, activeCategory, onCategoryChange }) => {
  return (
    <div className="flex items-center gap-2 overflow-x-auto custom-scrollbar pb-2">
      {categories?.map((category) => (
        <button
          key={category?.id}
          onClick={() => onCategoryChange(category?.id)}
          className={`
            flex items-center gap-2 px-4 md:px-6 h-12 md:h-14 rounded-md
            transition-smooth touch-target flex-shrink-0 whitespace-nowrap
            ${activeCategory === category?.id
              ? 'bg-accent text-accent-foreground shadow-elevation-2'
              : 'bg-card text-muted-foreground hover:bg-muted hover:text-foreground hover-lift'
            }
          `}
        >
          <Icon name={category?.icon} size={20} />
          <span className="font-medium text-sm md:text-base">{category?.name}</span>
          <span className="text-xs opacity-75">({category?.count})</span>
        </button>
      ))}
    </div>
  );
};

export default CategoryTabs;