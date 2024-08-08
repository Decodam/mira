'use client';

import Image from 'next/image';
import Link from 'next/link';
import { ToggleTheme } from '../ui/toggle-theme';
import { Button } from '../ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { IconCoin, IconLogout, IconQuestionMark, IconSettings } from '@tabler/icons-react';
import { Avatar, AvatarFallback, AvatarImage } from '@radix-ui/react-avatar';
import { getInitials } from '@/utils/client/ui.utils';
import { logout } from '@/utils/server/auth.actions';
import { createClient } from '@/lib/supabase/client.supa';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';



export default function HeaderUser() {
  const [profileData, setProfileData] = useState({ full_name: '', avatar_url: '' });
  const router = useRouter();

  useEffect(() => {
    const fetchUserData = async () => {
      const supabase = createClient();
      
      // Fetch user data
      const { data: userData, error: userError } = await supabase.auth.getUser();
      if (userError || !userData?.user) {
        router.push('/login');
        return;
      }

      const userId = userData.user.id;

      // Fetch profile data
      const { data: profileData, error: profileError } = await supabase
        .from('profiles')
        .select('*')
        .eq('id', userId)
        .single();

      if (profileError) {
        console.error('Error fetching profile:', profileError.message);
        router.push('/login');
        return;
      }

      setProfileData(profileData);
    };

    fetchUserData();
  }, [router]);


  const handleLogout = async () => {
    await logout();
    router.push('/login');
  };

  return (
    <div className="flex-1 flex justify-between items-center px-5 md:px-8">
      <div>
        <Link href="/">
          <Image src="/mira.svg" height={40} alt="mira.ai" width={0} className="w-auto dark:hidden" />
          <Image src="/mira-dark.svg" height={40} alt="mira.ai" width={0} className="w-auto dark:block hidden" />
        </Link>
      </div>

      <div className="flex items-center justify-center">
        <div className="hidden md:flex items-center justify-center">
          <ToggleTheme />
          <Button variant="outline" size="icon" className="ml-2 mr-5">
            <IconQuestionMark />
          </Button>
        </div>
        <DropdownMenu>
          {profileData.full_name && (
            <DropdownMenuTrigger>
              <Avatar>
                <AvatarImage src={profileData.avatar_url || '/default-avatar.png'} />
                <AvatarFallback className='rounded-full overflow-hidden p-2 bg-muted'>{getInitials(profileData?.full_name)}</AvatarFallback>
              </Avatar>
            </DropdownMenuTrigger>
          )}
          <DropdownMenuContent className="mr-5 mt-2 w-40">
            <DropdownMenuItem className="cursor-pointer">
              <IconSettings size={18} className="mr-2" /> Settings
            </DropdownMenuItem>
            <DropdownMenuItem className="cursor-pointer">
              <IconCoin size={18} className="mr-2" /> Billing
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem onClick={handleLogout} className="cursor-pointer text-destructive">
              <IconLogout size={18} className="mr-2" /> Logout
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </div>
  );
}
