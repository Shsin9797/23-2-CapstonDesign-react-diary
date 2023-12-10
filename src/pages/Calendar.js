import React, { useState, useEffect, useContext } from 'react';

import MyHeader from "./../components/MyHeader";
import MyButton from "./../components/MyButton";
import DiaryList from "./../components/DiaryList";

import { DiaryStateContext } from "../App";// DiaryStateContext 파일 import

const Calendar = () => {
  const diaryList = useContext(DiaryStateContext);

  const [data, setData] = useState([]);
  const [curDate, setCurDate] = useState(new Date());
  const headText = `${curDate.getFullYear()}년 ${curDate.getMonth() + 1}월`;

  useEffect(() => {
    const titleElement = document.getElementsByTagName("title")[0];
    titleElement.innerHTML = `감정 일기장: 캘린더로 보기`;
  }, []);

  useEffect(() => {
    const firstDay = new Date(curDate.getFullYear(), curDate.getMonth(), 1);
    const lastDay = new Date(curDate.getFullYear(), curDate.getMonth() + 1, 0, 23, 59, 59);

    const filteredData = diaryList.filter((it) => {
      const diaryDate = new Date(it.date);
      return diaryDate >= firstDay && diaryDate <= lastDay;
    });

    setData(filteredData);
  }, [diaryList, curDate]);

  const increaseMonth = () => {
    setCurDate(new Date(curDate.getFullYear(), curDate.getMonth() + 1));
  };

  const decreaseMonth = () => {
    setCurDate(new Date(curDate.getFullYear(), curDate.getMonth() - 1));
  };

  const handleDateClick = (date) => {
    // 클릭한 날짜에 해당하는 일기 목록을 표시하는 로직을 추가할 수 있습니다.
    console.log(`Clicked date: ${date}`);
  };

  const generateCalendar = () => {
    const firstDayOfMonth = new Date(curDate.getFullYear(), curDate.getMonth(), 1);
    const lastDayOfMonth = new Date(curDate.getFullYear(), curDate.getMonth() + 1, 0);
    const daysInMonth = lastDayOfMonth.getDate();
    const startingDay = firstDayOfMonth.getDay(); // 월의 첫 날이 무슨 요일인지
  
    const weekdays = ['일', '월', '화', '수', '목', '금', '토'];
  
    const calendar = [];
  
    // 요일 표시
    weekdays.forEach((weekday) => {
      calendar.push(
        <div key={`weekday-${weekday}`} className="calendar-weekday">
          {weekday}
        </div>
      );
    });
  
    // 빈 날짜 채우기
    for (let i = 0; i < startingDay; i++) {
      calendar.push(<div key={`empty-${i}`} className="empty-day"></div>);
    }
  
    // 실제 날짜 채우기
    for (let i = 1; i <= daysInMonth; i++) {
      const currentDate = new Date(curDate.getFullYear(), curDate.getMonth(), i);
      const isDiaryExist = data.some((it) => new Date(it.date).toDateString() === currentDate.toDateString());
  
      calendar.push(
        <div
          key={i}
          className={`calendar-day ${isDiaryExist ? 'has-diary' : ''}`}
          onClick={() => handleDateClick(currentDate)}
        >
          {i}
        </div>
      );
    }
  
    return calendar;
  };
  
  
  return (
    <div>
      <MyHeader
        headText={headText}
        leftChild={<MyButton text={"<"} onClick={decreaseMonth} />}
        rightChild={<MyButton text={">"} onClick={increaseMonth} />}
      />
      <div className="calendar-grid">
        {generateCalendar()}
      </div>
      <DiaryList diaryList={data} />
    </div>
  );
};

export default Calendar;
