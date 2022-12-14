import { SearchIcon } from '@heroicons/react/outline'
import {TwitterTimelineEmbed} from 'react-twitter-embed'
import React from 'react'

function Widgets() {
  return (
    <div className='px-2 mx-2 col-span-2 hidden lg:inline'>
        <div className='flex items-center space-x-2 bg-gray-100 p-2 rounded-full my-2'>
            <SearchIcon className='h-5 w-5 text-gray-400'/>
            <input type="text" placeholder='Search Twitter' 
            className='bg-transparent flex-1 outline-none'/>
        </div>

        <TwitterTimelineEmbed
            sourceType="profile"
            screenName="190R0hit"
            options={{height: 1000}}
        />
    </div>
  )
}

export default Widgets