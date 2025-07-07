import { Header } from '@/components/Header';
import { Toolbar } from '@/components/Toolbar';
export const SpreadsheetPage: React.FC = () => {
  return (
    <div className="bg-White flex h-screen flex-col font-sans">
      <Header />
      <Toolbar />
      <main className="flex-grow"></main>
    </div>
  );
};
