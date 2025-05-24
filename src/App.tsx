import { ThemeProvider } from '@/components/theme-provider';
import { Toaster } from '@/components/ui/toaster';
import ResumeScreeningPage from '@/pages/ResumeScreeningPage';
import './App.css';

function App() {
  return (
    <ThemeProvider defaultTheme="light" storageKey="talynx-theme">
      <ResumeScreeningPage />
      <Toaster />
    </ThemeProvider>
  );
}

export default App;