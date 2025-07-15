import AddIcon from '@/icons/AddIcon';
import { type FooterButtonProps } from '@/types/declarations';

type FooterProps = {
  activeTab: string;
  onTabClick: (label: string) => void;
};

const buttons = [
  { label: 'All Orders' },
  { label: 'Pending' },
  { label: 'Review' },
  { label: 'Arrived' },
  { icon: <AddIcon />, isIcon: true },
];

const FooterButton = ({ label, icon, isActive, isIcon, onClick }: FooterButtonProps) => {
  const base = 'text-[16px] leading-[24px] text-Gray-500 font-medium';
  const active = 'bg-Green-50 border-t-[2px] border-Green-900 text-Green-500 font-semibold';
  const padding = isIcon ? 'py-[8px] px-[4px]' : 'py-[10px] px-[16px]';

  return (
    <button onClick={onClick} className={`cursor-pointer ${padding} ${base} ${isActive ? active : ''}`}>
      {label || icon}
    </button>
  );
};

export const Footer = ({ activeTab, onTabClick }: FooterProps) => {
  const handleAddClick = () => {
    console.log('Add new sheet clicked!');
  };
  return (
    <footer className="border-Gray-200 bg-White fixed right-0 bottom-0 left-0 flex h-[48px] items-center gap-[24px] border-t py-[4px] pr-[16px] pl-[32px]">
      {buttons.map((btn, i) => (
        <FooterButton
          key={i}
          {...btn}
          onClick={btn.label ? () => onTabClick(btn.label) : handleAddClick}
          isActive={activeTab === btn.label}
        />
      ))}
    </footer>
  );
};
