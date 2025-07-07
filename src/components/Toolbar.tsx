import { ToolbarButton } from './ToolbarButton';
import toolbarArrowsIcon from '@/assets/toolbar-arrows-icon.svg';
import eye from '@/assets/eye-icon.svg';
import sort from '@/assets/sort-icon.svg';
import filter from '@/assets/filter-icon.svg';
import cellView from '@/assets/cellView-icon.svg';
import importIcon from '@/assets/import-icon.svg';
import exportIcon from '@/assets/export-icon.svg';
import share from '@/assets/share-icon.svg';
import arrowSplit from '@/assets/arrow-split-icon.svg';

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
  const handleClick = (action: string) => console.log(`${action} clicked!`);

  return (
    <nav className="border-Gray-200 flex items-center justify-between border-b px-[8px] py-[6px]">
      {/* Left Side */}
      <div className="flex items-center gap-[8px]">
        <button
          onClick={() => handleClick('Tool bar')}
          className="text-Gray-950 flex items-center gap-[4px] rounded-[4px] p-[8px] text-[14px] leading-[20px]"
        >
          <span>Tool bar</span>
          <img src={toolbarArrowsIcon} alt="Toolbar Arrows Icon" />
        </button>
        <div className="bg-Gray-200 h-[24px] w-px" />

        {leftButtons.map((button, index) => (
          <ToolbarButton
            key={index}
            onClick={() => handleClick(button.action)}
            icon={button.icon}
          >
            {button.label}
          </ToolbarButton>
        ))}
      </div>

      {/* Right Side */}
      <div className="flex items-center gap-[8px]">
        {rightButtons.map((button, index) => (
          <ToolbarButton
            key={index}
            onClick={() => handleClick(button.action)}
            icon={button.icon}
            variant="outlined"
          >
            {button.label}
          </ToolbarButton>
        ))}

        <ToolbarButton
          onClick={() => handleClick('New Action')}
          icon={arrowSplit}
          variant="primary"
        >
          New Action
        </ToolbarButton>
      </div>
    </nav>
  );
};
