import React from 'react'
import {
    BellIcon,
    HashtagIcon,
    BookmarkIcon,
    CollectionIcon,
    DotsCircleHorizontalIcon,
    MailIcon,
    UserIcon,
    HomeIcon
} from '@heroicons/react/outline'
import SidebarRow from './SidebarRow'
import { signIn, signOut, useSession } from 'next-auth/react';


function Sidebar() {
  const {data: session} = useSession();
  return (
    <div className='flex flex-col col-span-2 items-center px-4 md:items-start'>
        <img src="https://links.papareact.com/drq" alt="twitter-icon" className='h-10 w-10 m-3'/>
        <SidebarRow 
          Icon = {HomeIcon} 
          title="Home"/>
        <SidebarRow 
          Icon = {HashtagIcon}
          title="Explore"/>
        <SidebarRow 
          Icon = {BellIcon}
          title="Notifications"/>
        <SidebarRow 
          Icon = {MailIcon} 
          title="Messages"/>
        <SidebarRow 
          Icon = {BookmarkIcon} 
          title="Bookmarks"/>
        <SidebarRow 
          Icon = {UserIcon} 
          title = {session ? 'Sign Out' : 'Sign In'}
          onClick = {session ? signOut : signIn}/>
        <SidebarRow Icon={DotsCircleHorizontalIcon} title="More"/>
    </div>
  )
}

export default Sidebar