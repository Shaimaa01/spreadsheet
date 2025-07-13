import { actionGroupStyles } from '@/config/styleConfig';

export type BaseHeaderProps = {
  icon?: string;
  label: string;
  hasDropdown?: boolean;
  bgColor?: string;
  textColor?: string;
  width?: string;
};

export type ActionGroupHeaderProps = {
  action: keyof typeof actionGroupStyles;
  label: string;
  icon?: React.ReactNode;
};

export type FooterButtonProps = {
  label?: string;
  icon?: React.ReactNode;
  isActive?: boolean;
  isIcon?: boolean;
};

export type ToolbarButtonProps = {
  icon: string;
  children: React.ReactNode;
  onClick: () => void;
  variant?: 'default' | 'primary' | 'outlined';
};

export type Task = {
  jobRequest: string
  submitted: string
  status: 'In-process' | 'Need to start' | 'Complete' | 'Blocked'
  submitter: string
  url: string
  assigned: string
  priority: 'High' | 'Medium' | 'Low'
  dueDate: string
  estValue: string
}

export type NotificationBadgeProps = {
  count: number;
};

export type SearchInputProps = {
  onSearch: (value: string) => void;
};

export type UserProfileProps = {
  name: string;
  email: string;
  avatarSrc: string;
};