import briefcase from '@/assets/table/briefcase-icon.png';
import calender from '@/assets/table/calendar-icon.png';
import chevron from '@/assets/table/chevron-icon.png';
import person from '@/assets/table/person-icon.png';
import globe from '@/assets/table/globe-icon.png';
import emoji from '@/assets/table/emoji-icon.png';
import dropdown from '@/assets/table/dropdown-icon.svg';

export const headerIcons = {
  jobRequest: briefcase,
  submitted: calender,
  status: chevron,
  submitter: person,
  url: globe,
  assigned: emoji,
} as const;

export { dropdown };
