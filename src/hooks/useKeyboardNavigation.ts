import { useState, useCallback } from 'react';
import type { Table } from '@tanstack/react-table';
import type { Task, ActiveCell } from '@/types/declarations';

export const useKeyboardNavigation = (table: Table<Task>) => {
  const [activeCell, setActiveCell] = useState<ActiveCell>({ row: 0, col: 0 });

  const handleKeyDown = useCallback(
    (e: React.KeyboardEvent<HTMLDivElement>) => {
      if (!activeCell) return;

      const { row: currentRow, col: currentCol } = activeCell;
      let newRow = currentRow;
      let newCol = currentCol;

      switch (e.key) {
        case 'ArrowUp':
          e.preventDefault();
          newRow = Math.max(0, currentRow - 1);
          break;
        case 'ArrowDown':
          e.preventDefault();
          newRow = Math.min(table.getRowModel().rows.length - 1, currentRow + 1);
          break;
        case 'ArrowLeft':
          e.preventDefault();
          newCol = Math.max(0, currentCol - 1);
          break;
        case 'ArrowRight':
          e.preventDefault();
          newCol = Math.min(table.getVisibleLeafColumns().length - 1, currentCol + 1);
          break;
        default:
          return;
      }

      setActiveCell({ row: newRow, col: newCol });
    },
    [activeCell, table]
  );

  return { activeCell, setActiveCell, handleKeyDown };
};
