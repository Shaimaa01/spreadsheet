export const statusConfig = {
  'In-process': {
    bg: 'bg-Yellow-100',
    text: 'text-Yellow-800',
  },
  'Need to start': {
    bg: 'bg-Platinum-200',
    text: 'text-Platinum-600',
  },
  Complete: {
    bg: 'bg-Green-100',
    text: 'text-Green-800',
  },
  Blocked: {
    bg: 'bg-Red-100',
    text: 'text-Red-700',
  },
} as const;

export const priorityConfig = {
  High: {
    text: 'text-Red-500',
  },
  Medium: {
    text: 'text-Gold-500',
  },
  Low: {
    text: 'text-Blue-500',
  },
} as const;

export const cellSizeConfig = {
  'row-number': 'max-w-[32px]',
  jobRequest: 'max-w-[256px]',
  submitted: 'max-w-[124px] text-right',
  url: 'max-w-[124px] underline',
  priority: 'max-w-[124px] text-center font-semibold',
  dueDate: 'max-w-[124px] text-right',
  default: 'max-w-[124px]',
  estValue: 'max-w-[124px] text-right',
} as const;

export const actionGroupStyles = {
  abc: {
    bg: 'bg-Green-200',
    textColor: 'text-Gray-800',
    subBg: 'bg-Green-50',
    subTextColor: 'text-Green-700',
    iconColor: 'text-Gray-700',
  },
  answer: {
    bg: 'bg-Purple-200',
    textColor: 'text-Purple-800',
    subBg: 'bg-Purple-100',
    subTextColor: 'text-Purple-600',
    iconColor: 'text-White',
  },
  extract: {
    bg: 'bg-Peach-300',
    textColor: 'text-Brown-700',
    subBg: 'bg-Peach-100',
    subTextColor: 'text-Brown-500',
    iconColor: 'text-White',
  },
} as const;
