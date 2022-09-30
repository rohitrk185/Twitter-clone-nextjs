import React, { useRef, useState } from 'react'
import {
  CalendarIcon,
  EmojiHappyIcon,
  LocationMarkerIcon,
  PhotographIcon,
  SearchCircleIcon
} from '@heroicons/react/outline'
import { useSession } from 'next-auth/react';

function TweetBox() {
  	const [input, setInput] = useState<string>('');
	const [image, setImage] = useState<string>('');
	const {data: session} = useSession();
	const [imageUrlBoxIsOpen, setImageUrlBoxIsOpen] = useState<boolean>(false);
	
	const imageInputRef = useRef<HTMLInputElement>(null);

	const addImageToTweet = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
		e.preventDefault();
		if(!imageInputRef.current?.value) return;

		setImage(imageInputRef.current.value);
		imageInputRef.current.value = '';
		setImageUrlBoxIsOpen(false);
	};

  return (
    <div className='flex space-x-2 p-5'>
        <img alt=""
		src={session?.user?.image || "https://links.papareact.com/gll"} 
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
                		<PhotographIcon onClick={() => setImageUrlBoxIsOpen(!imageUrlBoxIsOpen)}
						className='h-5 w-5 cursor-pointer transition-transform duration-150 ease-out hover:scale-125'/>
                		<SearchCircleIcon className='h-5 w-5 cursor-pointer transition-transform duration-150 ease-out hover:scale-125'/>
                		<EmojiHappyIcon className='h-5 w-5 cursor-pointer transition-transform duration-150 ease-out hover:scale-125'/>
                		<CalendarIcon className='h-5 w-5 cursor-pointer transition-transform duration-150 ease-out hover:scale-125'/>
                		<LocationMarkerIcon className='h-5 w-5 cursor-pointer transition-transform duration-150 ease-out hover:scale-125'/>
              		</div>
              		<button type="submit" 
					disabled={!input || !session} 
					className='bg-twitter px-5 py-2 font-bold text-white rounded-full disabled:opacity-40'>
						Tweet
              		</button>
				</div>

				{imageUrlBoxIsOpen && (
					<form action='' 
					className='mt-5 flex rounded-lg bg-twitter/80 py-2 px-4'>
						<input type="text" ref={imageInputRef}
						placeholder="Enter Image URL..."
						className="flex-1 bg-transparent p-2 text-white outline-none placeholder:text-white"/>
						<button type='submit'
						onClick={addImageToTweet}
						className='font-bold text-white'>
							Add Image
						</button>
					</form>
				)}

				{image && (
					<img src={image} alt=""
					className='mt-10 h-40 w-full rounded-xl object-contain shadow-lg'/>
				)}
			</form>
		</div>
	</div>
  );
}

export default TweetBox;