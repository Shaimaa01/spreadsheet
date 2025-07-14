import { Header } from '@/components/Header';
import { Toolbar } from '@/components/Toolbar';
import { SpreadsheetGrid } from '@/components/SpreadsheetGrid';

export const SpreadsheetPage: React.FC = () => {
  return (
    <div className="bg-White flex h-screen w-full flex-col font-sans">
      <Header />
      <Toolbar />
      <SpreadsheetGrid />
    </div>
  );
};
