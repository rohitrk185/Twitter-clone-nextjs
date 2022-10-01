import React, { useEffect, useState } from 'react'
import {Tweet, Comment, CommentBody} from '../typings'
import { useSession } from 'next-auth/react'
import { toast, Toast } from 'react-hot-toast'
import TimeAgo from 'react-timeago'
import {
	ChatAlt2Icon, HeartIcon,
	SwitchHorizontalIcon, UploadIcon
} from '@heroicons/react/outline'
import { fetchComments } from '../utils/fetchComments'


interface Props {
    tweet: Tweet
}

function Tweet({tweet}: Props) {
	if(!tweet.profileImg) {
		tweet.profileImg = "https://links.papareact.com/gll";
	}
	const [comments, setComments] = useState<Comment[]>([]);
	const [commentBoxVisible, setCommentBoxVisible] = useState<boolean>(false);
	const [input, setInput] = useState<string>('');

	const { data: session } = useSession();
	
	const refreshComments = async () => {
		const comments: Comment[] = await fetchComments(tweet._id);
		setComments(comments);
	};

	useEffect(() => {
		refreshComments();
	}, [])
	
	// console.log(comments);


	const handleSubmit = async (e : React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();

		const commentToast = toast.loading('Adding Comment...');
		//Posting Comment Logic
		const comment: CommentBody = {
			comment: input,
			tweetId: tweet._id,
			username: session?.user?.name || 'Unknown User',
			profileImage: session?.user?.image || 'https://links.papareact.com/gll',
		}

		const result = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/addComment`, {
			body: JSON.stringify(comment),
			method: 'POST',
		});

		toast.success('Comment Posted!', {
			id: commentToast,
		})

		setInput(''),
		setCommentBoxVisible(false);
		refreshComments();
	};

  return (
    <div className='flex flex-col space-x-3 border-y p-5 border-gray-100'>
        <div className='flex space-x-3'>
            <img alt="Profile Image"
				src={tweet.profileImg}
				className='h-10 w-10 rounded-full object-cover' />
        
            <div>
                <div className='flex items-center space-x-1'>
                    <p className='mr-1 font-bold'> {tweet.username} </p>
                    <p className='hidden text-sm text-gray-500 sm:inline'> @{tweet.username.replace(/\s+/g, '').toLowerCase()}. </p>
					{/* <span>
						<TimeAgo date={tweet._createdAt}
                        	className='text-sm text-gray-500'/>
					</span> */}
                </div>

					 <p className='pt-1'>{tweet.text}</p>

					 {tweet.image && (
						<img 
						src={tweet.image}
						alt="Tweet Image"
						className='m-5 ml-0 mb-1 max-h-60 rounded-lg object-cover shadow-sm'/>
					 )}
            </div>
        </div>

		<div className='flex justify-between mt-5'> 
			<div onClick={() => session && setCommentBoxVisible(!commentBoxVisible)}
			className='flex cursor-pointer items-center space-x-3 text-gray-400'>
				<ChatAlt2Icon className='h-5 w-5'/>
				<p>{comments?.length}</p>
			</div>
			<div className='flex cursor-pointer items-center space-x-3 text-gray-400'>
				<SwitchHorizontalIcon className='h-5 w-5'/>
			</div>
			<div className='flex cursor-pointer items-center space-x-3 text-gray-400'>
				<HeartIcon className='h-5 w-5'/>
			</div>
			<div className='flex cursor-pointer items-center space-x-3 text-gray-400'> 
				<UploadIcon className='h-5 w-5'/>
			</div>
		</div>

		{/* Comment Box Logic */}
		{commentBoxVisible && (
			<form onSubmit={handleSubmit} className='mt-3 flex space-x-3'>
				<input type="text" placeholder='Write a comment...'
				value={input}
				onChange={e => setInput(e.target.value.trimStart())}				className='flex-1 rounded-lg outline-none bg-gray-100 p-2'/>
				<button type="submit" disabled={!input}
				className='text-twitter disabled:text-gray-200'>Add Comment</button>
			</form>
		)}

		{comments?.length > 0 && (
			<div className='my-2 mt-5 max-h-44 space-y-5 overflow-y-scroll border-t border-gray-100 p-5 scrollbar-hide'>
				{comments.map(comment => (
					<div key={comment._id} className='relative flex space-x-2'>
						<hr className='absolute left-5 top-10 h-8 border-x border-twitter/30'/>
						<img src={comment.profileImage} 
						alt="Commentor's Profile Image"
						className='mt-2 h-7 w-7 rounded-full object-cover' />
						<div>
							<div className='flex items-center space-x-1'>
								<p className='mr-1 font-bold'>{comment.username}</p>
								<p className='hidden text-sm text-gray-500 lg:inline'>
									@{comment.username.replace(/\s+/g, '').toLowerCase()}.
								</p>
							
								<TimeAgo
                        		className='text-sm text-gray-500'
                    	    	date={comment._createdAt} />
							</div>
							<p>{comment.comment}</p>
						</div>
					</div>
				))}
			</div>
		)}
    </div>
  )
}

export default Tweet