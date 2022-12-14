import type { GetServerSideProps, GetStaticProps, NextPage } from 'next'
import Head from 'next/head'
import Sidebar from '../components/Sidebar'
import Feed from '../components/Feed'
import Widgets from '../components/Widgets'
import { Tweet } from '../typings'
import { fetchTweets } from '../utils/fetchTweets'
import { Toaster } from 'react-hot-toast'

interface Props {
  tweets: Tweet[]
}

const Home = ({tweets}: Props) => {
  // console.log(tweets);

  return (
    <div className="lg:max-w-6xl mx-auto max-h-screen">
      <Head>
        <title>Twitter 2.0</title>
      </Head>

      <Toaster/>

      <main className='grid grid-cols-9'>
        <Sidebar/>
        <Feed tweets={tweets}/>
        <Widgets/>
      </main>

    </div>
  )
}

export default Home

export const getStaticProps: GetStaticProps = async (context) => {
  // context.res.setHeader(
  //   'Cache-Control',
  //   'public, s-maxage=10, stale-while-revalidate=59'
  // )
  const tweets = await fetchTweets();
  return {
    props: {
      tweets,
    },
    // revalidate: 10,
  };
};