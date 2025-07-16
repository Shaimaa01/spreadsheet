import { actionGroupStyles } from '@/config/styleConfig';
import type { Header } from '@tanstack/react-table';

export type BaseHeaderProps = {
  header: Header<Task, unknown>;
  icon?: string;
  label: string;
  hasDropdown?: boolean;
  bgColor?: string;
  textColor?: string;
  width?: string;
};

export type ActionGroupHeaderProps = {
  header: Header<Task, unknown>;
  action: keyof typeof actionGroupStyles;
  label: string;
  icon?: React.ReactNode;
};

export type Task = {
  jobRequest: string;
  submitted: string;
  status: 'In-process' | 'Need to start' | 'Complete' | 'Blocked';
  submitter: string;
  url: string;
  assigned: string;
  priority: 'High' | 'Medium' | 'Low';
  dueDate: string;
  estValue: string;
};

export type ActiveCell = {
  row: number;
  col: number;
} | null;
