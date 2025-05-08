'use client';

import {Avatar, AvatarFallback} from '@/components/ui/avatar';
import authSelector from '@/redux/features/auth/authSelector';
import {useAppSelector} from '@/redux/hooks';

const UserProfileDetail = () => {
  const user = useAppSelector(authSelector.selectUser);
  return (
    user && (
      <div className="flex items-center gap-2 rounded-lg border bg-background p-4 shadow-sm">
        <Avatar className="size-16">
          <AvatarFallback className="text-xl font-bold">
            {user.name.at(0)}
          </AvatarFallback>
        </Avatar>
        <div className="flex flex-col gap-1">
          <p className="font-semibold">{user.name}</p>
          <p className="text-sm text-muted-foreground">{user.email}</p>
        </div>
      </div>
    )
  );
};

export default UserProfileDetail;
