'use client';
import {Avatar, AvatarFallback, AvatarImage} from '@/components/ui/avatar';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import {SidebarTrigger} from '@/components/ui/sidebar';
import authSelector from '@/redux/features/auth/authSelector';
import {authActions} from '@/redux/features/auth/authSlice';
import {useAppDispatch, useAppSelector} from '@/redux/hooks';

const Header = () => {
  const dispatch = useAppDispatch();
  const user = useAppSelector(authSelector.selectUser);

  const logout = () => {
    dispatch(authActions.logout());
    location.href = '/quan-tri/dang-nhap';
  };

  return (
    <div className="sticky top-0 z-50 flex w-full items-center justify-between border-b bg-white p-4">
      <SidebarTrigger />
      <div className="flex items-center gap-4">
        <h2 className="text-base font-semibold md:text-2xl">
          Xin chào {user?.name || 'Quản trị viên'}!
        </h2>
        <DropdownMenu>
          <DropdownMenuTrigger>
            <Avatar className="cursor-pointer">
              <AvatarImage src="https://github.com/shadcn.png" />
              <AvatarFallback>AD</AvatarFallback>
            </Avatar>
          </DropdownMenuTrigger>
          <DropdownMenuContent
            className="w-60"
            align="end" // Aligns to the end (right) of the trigger
            alignOffset={-5} // Shifts the menu left by 5px
            sideOffset={5}>
            <DropdownMenuItem onClick={logout}>Đăng xuất</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </div>
  );
};

export default Header;
