type ToolbarButtonProps = {
  icon: string;
  children: React.ReactNode;
  onClick: () => void;
  variant?: 'default' | 'primary' | 'outlined';
};

export const ToolbarButton = ({
  icon,
  children,
  onClick,
  variant = 'default',
}: ToolbarButtonProps) => {
  const baseClasses =
    'flex items-center gap-1 p-[8px] rounded-[6px] text-[14px] leading-[20px] transition-colors cursor-pointer';

  const getVariantClasses = () => {
    switch (variant) {
      case 'primary':
        return 'px-[24px] py-[8px] bg-Green-900 text-White hover:bg-Green-600 font-medium';
      case 'outlined':
        return 'border border-Gray-200 text-Gray-600  hover:bg-Gray-50 ';
      default:
        return 'text-Gray-950 hover:bg-Gray-100';
    }
  };

  return (
    <button
      onClick={onClick}
      className={`${baseClasses} ${getVariantClasses()}`}
    >
      <img src={icon} alt="" className="h-4 w-4" />
      <span>{children}</span>
    </button>
  );
};
