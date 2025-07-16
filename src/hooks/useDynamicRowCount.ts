import { useState, useLayoutEffect, useRef, useMemo } from 'react';

export const useDynamicRowCount = <T>(filteredData: T[]) => {
  const ROW_HEIGHT = 41;
  const containerRef = useRef<HTMLDivElement | null>(null);
  const [rowCount, setRowCount] = useState(0);

  useLayoutEffect(() => {
    if (!containerRef.current) return;

    const resizeObserver = new ResizeObserver((entries) => {
      for (const entry of entries) {
        const containerHeight = entry.contentRect.height;
        const calculatedRows = Math.floor(containerHeight / ROW_HEIGHT);
        setRowCount(calculatedRows);
      }
    });

    resizeObserver.observe(containerRef.current);

    return () => resizeObserver.disconnect();
  }, []);

  const displayData = useMemo(() => {
    if (rowCount === 0) return filteredData;

    const emptyRowCount = Math.max(0, rowCount - filteredData.length);
    const emptyRows = Array.from({ length: emptyRowCount }, () => ({}) as T);
    return [...filteredData, ...emptyRows];
  }, [rowCount, filteredData]);

  return { containerRef, displayData };
};