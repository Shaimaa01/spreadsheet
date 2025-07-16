import { useState } from 'react';
import { ToolbarButton } from './ToolbarButton';
import toolbarArrowsIcon from '@/assets/toolbar/toolbar-arrows-icon.svg';
import eye from '@/assets/toolbar/eye-icon.svg';
import sort from '@/assets/toolbar/sort-icon.svg';
import filter from '@/assets/toolbar/filter-icon.svg';
import cellView from '@/assets/toolbar/cellView-icon.svg';
import importIcon from '@/assets/toolbar/import-icon.svg';
import exportIcon from '@/assets/toolbar/export-icon.svg';
import share from '@/assets/toolbar/share-icon.svg';
import { ArrowSplitIcon } from '@/icons/ArrowSplitIcon';

const leftButtons = [
  { label: 'Hide fields', icon: eye, action: 'Hide fields' },
  { label: 'Sort', icon: sort, action: 'Sort' },
  { label: 'Filter', icon: filter, action: 'Filter' },
  { label: 'Cell view', icon: cellView, action: 'Cell view' },
];

const rightButtons = [
  { label: 'Import', icon: importIcon, action: 'Import' },
  { label: 'Export', icon: exportIcon, action: 'Export' },
  { label: 'Share', icon: share, action: 'Share' },
];

export const Toolbar = () => {
  const [isToolbarOpen, setIsToolbarOpen] = useState(true);

  const handleToolbarToggle = () => {
    setIsToolbarOpen(!isToolbarOpen);
    console.log(`Toolbar toggled: ${!isToolbarOpen ? 'Open' : 'Closed'}`);
  };
  const handleClick = (action: string) => console.log(`${action} clicked!`);

  return (
    <nav className="border-Gray-200 flex items-center justify-between border-b px-[8px] py-[6px]">
      {/* Left Side */}
      <div className="flex items-center gap-[8px]">
        <button
          onClick={handleToolbarToggle}
          className="text-Gray-950 hover:bg-Gray-50 flex cursor-pointer items-center gap-[4px] rounded-[4px] p-[8px] text-[14px] leading-[20px]"
        >
          <span>Tool bar</span>
          <img src={toolbarArrowsIcon} alt="Toolbar Arrows Icon" />
        </button>
        <div className="bg-Gray-200 h-[24px] w-px" />
        {isToolbarOpen && (
          <>
            {leftButtons.map((button) => (
              <ToolbarButton key={button.action} onClick={() => handleClick(button.action)} icon={button.icon}>
                {button.label}
              </ToolbarButton>
            ))}
          </>
        )}
      </div>

      {/* Right Side */}
      <div className="flex items-center gap-[8px]">
        {rightButtons.map((button) => (
          <ToolbarButton
            key={button.action}
            onClick={() => handleClick(button.action)}
            icon={button.icon}
            variant="outlined"
          >
            {button.label}
          </ToolbarButton>
        ))}

        <ToolbarButton onClick={() => handleClick('New Action')} icon={<ArrowSplitIcon />} variant="primary">
          New Action
        </ToolbarButton>
      </div>
    </nav>
  );
};
