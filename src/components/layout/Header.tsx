import { Brain } from 'lucide-react';
import { Container } from './Container';
import { ModeToggle } from '@/components/ui/mode-toggle';

export function Header() {
  return (
    <header className="border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <Container>
        <div className="flex h-16 items-center justify-between">
          <div className="flex items-center gap-2">
            <Brain className="h-8 w-8 text-primary" />
            <div className="flex flex-col items-start">
              <h1 className="text-xl font-bold leading-tight tracking-tighter">
                Talynx
              </h1>
              <p className="text-xs text-muted-foreground">
                AI-Powered HR System
              </p>
            </div>
          </div>
          <div className="flex items-center gap-4">
            <ModeToggle />
          </div>
        </div>
      </Container>
    </header>
  );
}