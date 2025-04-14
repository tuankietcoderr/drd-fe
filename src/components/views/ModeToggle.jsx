'use client';

import {Check, Moon, Sun} from 'lucide-react';
import {useTheme} from 'next-themes';

import {Button} from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import {cn} from '@/lib/utils';

const mapThemeToTitle = {
  light: 'Sáng',
  dark: 'Tối',
  system: 'Hệ thống',
};

const ModeToggle = () => {
  const {theme: currentTheme, themes, setTheme} = useTheme();

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" size="icon">
          <Sun className="h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all dark:absolute dark:-rotate-90 dark:scale-0 dark:bg-red-200" />
          <Moon className="absolute h-[1.2rem] w-[1.2rem] rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
          <span className="sr-only">Toggle theme</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        {themes.map(theme => (
          <DropdownMenuItem key={theme} onClick={() => setTheme(theme)}>
            <span className="flex-1">{mapThemeToTitle[theme]}</span>
            <Check
              size={18}
              className={cn({
                invisible: currentTheme !== theme,
              })}
            />
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
export default ModeToggle;
