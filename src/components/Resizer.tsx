import type { Header } from '@tanstack/react-table';
import type { Task } from '@/types/declarations';

export const Resizer = ({ header }: { header: Header<Task, unknown> }) => {
  return (
    <div
      onMouseDown={header.getResizeHandler()}
      onTouchStart={header.getResizeHandler()}
      onDoubleClick={() => header.column.resetSize()} 
      className={`absolute top-0 right-0 w-[8px] h-full cursor-col-resize select-none touch-none 
        opacity-0 group-hover:opacity-100 
        transition-opacity duration-200 ${
        header.column.getIsResizing() ? 'bg-Gray-400 opacity-100' : 'bg-Gray-300'
      }`}
    ></div>
  );
};
