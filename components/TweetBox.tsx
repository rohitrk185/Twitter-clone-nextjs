import React, { useState } from 'react'
import {
  CalendarIcon,
  EmojiHappyIcon,
  LocationMarkerIcon,
  PhotographIcon,
  SearchCircleIcon
} from '@heroicons/react/outline'

function TweetBox() {
  const [input, setInput] = useState<string>('');
  return (
    <div className='flex space-x-2 p-5'>
        <img src="https://links.papareact.com/gll" alt="" 
        className='h-14 w-14 object-cover rounded-full mt-4
        '/>
        
        <div className='flex flex-1 items-center pl-2'>
          	<form action="" className='flex flex-1 flex-col'>
            	<input type="text" 
            	placeholder="What's Happening?"
            	value = {input} 
				onChange={(e) => setInput(e.target.value.trimStart())}
            	className='h-20 w-full text-l outline-none placeholder:text-xl'/>
            	<div className='flex items-center'>
              		<div className='flex space-x-2 text-twitter flex-1'> 
                		<PhotographIcon className='h-5 w-5 cursor-pointer transition-transform duration-150 ease-out hover:scale-125'/>
                		<SearchCircleIcon className='h-5 w-5 cursor-pointer transition-transform duration-150 ease-out hover:scale-125'/>
                		<EmojiHappyIcon className='h-5 w-5 cursor-pointer transition-transform duration-150 ease-out hover:scale-125'/>
                		<CalendarIcon className='h-5 w-5 cursor-pointer transition-transform duration-150 ease-out hover:scale-125'/>
                		<LocationMarkerIcon className='h-5 w-5 cursor-pointer transition-transform duration-150 ease-out hover:scale-125'/>
              		</div>
              		<button type="submit" 
					disabled={!input} 
					className='bg-twitter px-5 py-2 font-bold text-white rounded-full disabled:opacity-40'>
						Tweet
              		</button>
				</div>
			</form>
		</div>
	</div>
  );
}

export default TweetBox;