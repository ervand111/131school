import React, {useEffect} from 'react';
import App from "@/components/layouts/app";
import EventItem from "@/components/events/eventItem";
import {useDispatch, useSelector} from "react-redux";
import {getAchievements} from "@/store/achievements/actions";

const Index = () => {

  const dispatch = useDispatch();
  const achievements = useSelector(state => state.achievement.achievements)
  useEffect(() => {
    dispatch(getAchievements.request());
  }, [dispatch]);
  return (
    <div>
      <App>
        <div className="w-11/12 m-auto mb-20 event">
          <h2 className='text-center text-amber-900 p-10 tracking-wider animate-fade-in-up text-4xl'>Ձեռքբերումներ</h2>
          <div className='flex flex-wrap justify-between'>
            {achievements?.map((item) => (
              <EventItem key={item.id} text={item.title} image={item.avatar}/>
            ))}
          </div>
        </div>
      </App>
    </div>
  );
};

export default Index;