// render twitter profile image of logged-in user
// and disable the button to tweet if the user hasn't logged-in
import React, { 
	useRef, useState,
	Dispatch, MouseEvent,
	SetStateAction
 } from 'react'
import {
  CalendarIcon,
  EmojiHappyIcon,
  LocationMarkerIcon,
  PhotographIcon,
  SearchCircleIcon
} from '@heroicons/react/outline'
import { useSession } from 'next-auth/react';
import { Tweet, TweetBody } from '../typings';
import { fetchTweets } from '../utils/fetchTweets';
import { toast } from 'react-hot-toast';

interface Props {
	setTweets: React.Dispatch<React.SetStateAction<Tweet[]>>
};

function TweetBox( { setTweets }: Props) {
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

	const postTweet = async () => {
		const postToast = toast.loading('Posting Tweet...');

		const tweetInfo: TweetBody = {
			text: input,
			username: session?.user?.name || 'Unknown User',
			profileImg: session?.user?.image || 'https://links,papareact.com/gll',
			image: image,
		};

		const result = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/addTweet`, {
			body: JSON.stringify(tweetInfo),
			method: 'POST',
		});

		const json = result.json();

		const newTweets = await fetchTweets();
		setTweets(newTweets);
		toast.success('Tweet Posted🤘', {
			id: postToast,
		});
		return json;
	}

	const handleSubmit = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>)=> {
		e.preventDefault();
		postTweet();
		setImage('');
		setInput('');
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
					disabled={(!input || !session) && !image}
					onClick={handleSubmit} 
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