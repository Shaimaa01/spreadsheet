import { useState, useLayoutEffect, useRef } from 'react';

export const useDynamicRowCount = (rowHeight: number) => {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const [rowCount, setRowCount] = useState(0);

  useLayoutEffect(() => {
    if (!containerRef.current) return;

    const resizeObserver = new ResizeObserver((entries) => {
      for (const entry of entries) {
        const containerHeight = entry.contentRect.height;
        const calculatedRows = Math.floor(containerHeight / rowHeight);
        setRowCount(calculatedRows);
      }
    });

    resizeObserver.observe(containerRef.current);

    return () => resizeObserver.disconnect();
  }, [rowHeight]);

  return { containerRef, rowCount };
};
