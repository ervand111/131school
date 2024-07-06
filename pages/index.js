import Header from "@/components/header-footer/header";
import Footer from "@/components/header-footer/footer";
import CarouselComponent from "@/components/carousel/CarouselComponent";
import React, {useEffect} from "react";
import Event from "@/components/events/event";
import {news, events, carouselComponents, brands} from "@/utility/db";
import Discover from "@/components/discover/discover";
import Contact from "@/components/contact/contact";
import Running from "@/components/runningline/runningline";
import News from "@/components/news/news";
import {useDispatch, useSelector} from "react-redux";
import {getSlides} from "@/store/slides/actions";
import {getEvents} from "@/store/events/actions";
import {getLastNews, getNews} from "@/store/news/actions";
import {getBrands} from "@/store/brands/actions";

export default function Home() {

  const dispatch = useDispatch();
  const slides = useSelector(state => state.slide.slides)
  const events = useSelector(state => state.event.events)
  const news = useSelector(state => state.news.news)
  const brands = useSelector(state => state.brands.brands)

  useEffect(() => {
    dispatch(getSlides.request());
    dispatch(getEvents.request());
    dispatch(getLastNews.request());
    dispatch(getBrands.request());

  }, [dispatch]);

  return (
    <>
      <div>
        <Header/>
      </div>
      <div>
        <CarouselComponent data={slides}/>
      </div>
      <div>
        <Discover/>
      </div>
      <div>
        <Event heading={"Միջոցառումներ"} data={events}/>
      </div>
      <div className='mb-20'>
        <News heading={"Նորություններ"} data={news}/>
      </div>
      <div>
        <Contact/>
      </div>
      <div>
        <Running data={brands}/>
      </div>
      <div>
        <Footer/><
       /div>
    </>
  );
}
