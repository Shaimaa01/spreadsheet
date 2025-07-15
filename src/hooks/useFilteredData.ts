
import { useMemo, useState } from 'react';

import { mockData } from '@/data/mockData';

const statusMap = {
  'Pending': 'Need to start',
  'Review': 'In-process',
  'Arrived': 'Complete',
};

export const useFilteredData = () => {
  const [statusFilter, setStatusFilter] = useState('All Orders');

  const filteredData = useMemo(() => {
    if (statusFilter === 'All Orders') {
      return mockData;
    }
    const targetStatus = statusMap[statusFilter as keyof typeof statusMap];
    return mockData.filter(task => task.status === targetStatus);
  }, [statusFilter]);

  return {
    filteredData,
    activeTab: statusFilter,
    onTabClick: setStatusFilter,
  };
};