
import { useMemo } from 'react';
import {type Table } from '@tanstack/react-table';

export const useColumnSizeVars =  <T>(table: Table<T>) => {
  const columnSizing = table.getState().columnSizing;
  const columnSizingInfo = table.getState().columnSizingInfo;

  const columnSizeVars = useMemo(() => {
    const headers = table.getFlatHeaders();
    const colSizes: { [key: string]: number } = {};
    
    for (let i = 0; i < headers.length; i++) {
      const header = headers[i]!;
      colSizes[`--header-${header.id}-size`] = header.getSize();
      colSizes[`--col-${header.column.id}-size`] = header.column.getSize();
    }
    
    return colSizes;
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [columnSizing, columnSizingInfo]);

  return columnSizeVars;
};