import { useState } from 'react';
import rectangular from '@/assets/rectangular-icon.svg';
import arrow from '@/assets/arrow-icon.svg';
import dots from '@/assets/dots-icon.svg';
import search from '@/assets/search-icon.svg';
import alert from '@/assets/alert-icon.svg';
import avatar from '@/assets/avatar.png';
import { type NotificationBadgeProps, type SearchInputProps, type UserProfileProps } from '@/types/declarations';

const NotificationBadge = ({ count }: NotificationBadgeProps) => {
  if (count === 0) return null;

  const displayCount = count > 99 ? '99+' : count.toString();

  return (
    <div className="bg-Green-900 border-White text-Gray-50 font-figtree absolute top-0 right-0 flex aspect-square min-h-[16px] items-center justify-center rounded-full border-[2px] text-[8px] leading-0 font-medium tracking-[0%]">
      {displayCount}
    </div>
  );
};

const SearchInput = ({ onSearch }: SearchInputProps) => {
  const [searchValue, setSearchValue] = useState('');

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setSearchValue(value);
    onSearch(value);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Search submitted:', searchValue);
    onSearch(searchValue);
  };

  return (
    <form onSubmit={handleSubmit} className="bg-Gray-50 flex items-center gap-[8px] rounded-[6px] p-[12px]">
      <button className="cursor-pointer" type="submit">
        <img src={search} alt="search icon" />
      </button>
      <input
        type="text"
        value={searchValue}
        onChange={handleInputChange}
        className="text-Gray-500 text-[12px] leading-[16px] tracking-[0%] outline-none"
        placeholder="Search within sheet"
      />
    </form>
  );
};

const UserProfile = ({ name, email, avatarSrc }: UserProfileProps) => {
  return (
    <div className="flex items-center gap-[8px] py-[6px] pr-[12px] pl-[8px]">
      <div className="h-[28px] w-[28px] overflow-hidden rounded-full">
        <img src={avatarSrc} alt="User Avatar" className="h-full w-full object-contain" />
      </div>
      <div className="max-w-[120px] overflow-hidden text-nowrap">
        <div className="text-Gray-950 text-[12px] leading-[16px] tracking-[0%]">{name}</div>
        <div className="text-Gray-500 max-w-[50px] truncate text-[10px] leading-[12px] tracking-[0%]">{email}</div>
      </div>
    </div>
  );
};

export const Header = () => {
  const notificationCount = 2;

  const handleActionClick = (action: string) => {
    console.log(`${action} clicked!`);
  };

  const handleSearch = (searchValue: string) => {
    console.log('Search input value:', searchValue);
  };

  return (
    <header className="border-Gray-200 flex h-[56px] w-full items-center justify-between border-b px-[16px] py-[8px]">
      {/* Left Side: Breadcrumbs */}
      <div className="flex items-center gap-[16px]">
        <img src={rectangular} alt="rectangular icon" className="h-[16px] w-[20px]" />

        <div className="text-Gray-400 flex items-center gap-[8px] text-[14px] leading-[20px] font-medium tracking-[0%]">
          <span>Workspace</span>
          <img src={arrow} alt="arrow icon" />
          <span>Folder 2</span>
          <img src={arrow} alt="arrow icon" />
          <span className="text-Gray-950">Spreadsheet 3</span>
          <button onClick={() => handleActionClick('More options')} className="hover:text-Gray-900 cursor-pointer">
            <img src={dots} alt="dots icon" />
          </button>
        </div>
      </div>

      {/* Right Side: Actions & User */}
      <div className="flex items-center gap-[4px]">
        <SearchInput onSearch={handleSearch} />

        <button onClick={() => handleActionClick('Notifications')} className="relative p-[8px]">
          <NotificationBadge count={notificationCount} />
          <img src={alert} alt="alert icon " />
        </button>

        <UserProfile name={'John Doe'} email={'john.doe@companyname.com'} avatarSrc={avatar} />
      </div>
    </header>
  );
};
