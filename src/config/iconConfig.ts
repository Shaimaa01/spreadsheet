import briefcase from '@/assets/briefcase-icon.png';
import calender from '@/assets/calendar-icon.png';
import chevron from '@/assets/chevron-icon.png';
import person from '@/assets/person-icon.png';
import globe from '@/assets/globe-icon.png';
import emoji from '@/assets/emoji-icon.png';
import dropdown from '@/assets/dropdown-icon.svg';

export const headerIcons = {
  jobRequest: briefcase,
  submitted: calender,
  status: chevron,
  submitter: person,
  url: globe,
  assigned: emoji,
} as const;

export { dropdown };