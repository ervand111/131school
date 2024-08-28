import React, {useEffect} from 'react';
import Head from 'next/head';
import Image from 'next/image';
import SmallItem from '@/components/news/smallitem';
import App from '@/components/layouts/app';
import {useRouter} from 'next/router';
import {useDispatch, useSelector} from 'react-redux';
import {getNewsById, getRandNews} from '@/store/news/actions';
import {Skeleton} from 'antd';
import Link from 'next/link';
import {FacebookIcon, FacebookShareButton} from 'react-share';

const Name = () => {
  const router = useRouter();
  const {name} = router.query;
  const dispatch = useDispatch();
  const news = useSelector((state) => state?.news?.selectedNews);
  const randNews = useSelector((state) => state?.news?.news);
  const isFetching = useSelector((state) => state?.news?.isFetching);
  const pageUrl = `https://www.182dproc.am/news/${name}`;

  useEffect(() => {
    dispatch(getNewsById.request({id: name}));
    dispatch(getRandNews.request());
  }, [dispatch, name]);

  const trimmedContent = news?.content ? news.content.substring(0, 150) + '...' : '';
  if (!news?.avatar && !news?.title) {
    return (
      <>
      <h1>ok</h1></>
    )
  }

  return (
    <>
      <Head>
        <meta property="og:title" content={news.title}/>
        <meta property="og:description" content={trimmedContent}/>
        <meta property="og:image" content={process.env.IMAGE_URL+news.avatar}/>
        <meta property="og:url" content={pageUrl}/>
        <meta property="og:type" content="article"/>
      </Head>
      <App>
        <div className='w-11/12 h-max justify-between flex m-auto newsName'>
          <div className='w-2/3 h-max newsNameFirst'>
            <Skeleton loading={isFetching} active>
              <div className='w-11/12 m-auto mt-6 mb-10'>
                <p className='text-xl italic'>13/06/2024</p>
              </div>
              <div className='w-11/12 m-auto'>
                <h1 className='mb-10 text-2xl'>{news?.title}</h1>
              </div>
              <div className='w-11/12 m-auto h-3/6'>
                <Image
                  src={process.env.IMAGE_URL + news?.avatar}
                  className='w-full h-full object-cover'
                  alt={'Image'}
                  width={1000}
                  height={1000}
                />
              </div>
              <div className='w-11/12 m-auto h-auto mt-6'>
                <p dangerouslySetInnerHTML={{__html: news?.content}}></p>
              </div>
              <div className="w-11/12 mt-6 ml-10 mb-10">
                {news?.title && (
                  <div className="w-11/12 mt-6 ml-10 mb-10">
                    <FacebookShareButton
                      url={pageUrl}
                      quote={news?.title}
                      hashtag={'#kd'}
                    >
                      <FacebookIcon size={32} round={true}/>
                    </FacebookShareButton>
                  </div>
                )}
              </div>
            </Skeleton>
          </div>
          <div className='pl-10 w-2/6 h-auto smallItem'>
            <div className='mt-6 mb-10'>
              <h1 className='text-xl italic'>Վերջին նորությունները</h1>
            </div>
            <Skeleton loading={isFetching} active>
              <>
                {randNews?.map((item) => (
                  <Link key={item.id} href={`/news/${item.id}`}>
                    <SmallItem item={item}/>
                  </Link>
                ))}
              </>
            </Skeleton>
          </div>
        </div>
      </App>
    </>
  );
};

export default Name;
