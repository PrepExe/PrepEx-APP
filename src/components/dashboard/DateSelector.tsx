import React, { ChangeEvent, useState } from 'react';
import { padDate, validateAssessmentDate } from '../../utils/helpers';
import { ChevronDownIcon } from '@heroicons/react/24/outline';

type DateSelectorProps = {
  setSelectedDate?: any;
  date?: Date;
};

const DateSelector = (props: DateSelectorProps) => {
  const tomorrow = new Date();
  tomorrow.setDate(tomorrow.getDate() + 1); // so assessment is not instantly due if accidentally added

  const date = props.date || tomorrow;
  const currentYear = date.getFullYear();
  const lastYear = currentYear - 1;

  const [day, setDay] = useState(date.getDate());
  const [month, setMonth] = useState(date.getMonth() + 1); // month starts from 0
  const [year, setYear] = useState(date.getFullYear());

  const createDate = (selectedDay: number, selectedMonth: number, selectedYear: number): Date => {
    return new Date(selectedYear, selectedMonth - 1, selectedDay); // month starts from 0
  };

  const daysInMonth = (selectedYear: number, selectedMonth: number) => new Date(selectedYear, selectedMonth, 0).getDate();

  const handleDayChange = (e: ChangeEvent<HTMLSelectElement>) => {
    const selectedDay = parseInt(e.target.value);
    setDay(selectedDay);

    const selectedDate = createDate(selectedDay, month, year);
    validateAssessmentDate(selectedDate, setDay, setMonth, setYear, props.setSelectedDate);
  };

  const handleMonthChange = (e: ChangeEvent<HTMLSelectElement>) => {
    const selectedMonth = parseInt(e.target.value);
    setMonth(selectedMonth);

    if (day > daysInMonth(year, selectedMonth)) {
      setDay(1);
    }

    const selectedDate = createDate(day, selectedMonth, year);
    validateAssessmentDate(selectedDate, setDay, setMonth, setYear, props.setSelectedDate);
  };

  const handleYearChange = (e: ChangeEvent<HTMLSelectElement>) => {
    const selectedYear = parseInt(e.target.value);
    setYear(selectedYear);

    if (day > daysInMonth(selectedYear, month)) {
      setDay(1);
    }

    const selectedDate = createDate(day, month, selectedYear);
    validateAssessmentDate(selectedDate, setDay, setMonth, setYear, props.setSelectedDate);
  };

  const dayOptions = Array.from({ length: daysInMonth(year, month) }, (_, i) => (
    <option key={i + 1} value={i + 1}>{padDate(i + 1)}</option>
  ));

  const monthOptions = Array.from({ length: 12 }, (_, i) => (
    <option key={i + 1} value={i + 1}>{padDate(i + 1)}</option>
  ));

  const yearOptions = Array.from({ length: 2 }, (_, i) => (
    <option key={lastYear + i + 1} value={lastYear + i + 1}>{lastYear + i + 1}</option>
  ));

  return (
    <div className='flex items-center gap-1'>
      <div className='grid w-full'>
        <ChevronDownIcon className='w-3 h-3 pointer-events-none z-10 right-2 relative col-start-1 row-start-1 self-center justify-self-end' strokeWidth={'4'} />
        <select value={day} onChange={handleDayChange} className='appearance-none w-full row-start-1 col-start-1 p-2 outline-none border border-accent rounded-md bg-primary hover:bg-lighter-accent'>
          {dayOptions}
        </select>
      </div>
      /
      <div className='grid w-full'>
        <ChevronDownIcon className='w-3 h-3 pointer-events-none z-10 right-2 relative col-start-1 row-start-1 self-center justify-self-end' strokeWidth={'4'} />
        <select value={month} onChange={handleMonthChange} className='appearance-none w-full row-start-1 col-start-1 p-2 outline-none border border-accent rounded-md bg-primary hover:bg-lighter-accent'>
          {monthOptions}
        </select>
      </div>
      /
      <div className='grid w-full'>
        <ChevronDownIcon className='w-3 h-3 pointer-events-none z-10 right-2 relative col-start-1 row-start-1 self-center justify-self-end' strokeWidth={'4'} />
        <select value={year} onChange={handleYearChange} className='appearance-none w-full row-start-1 col-start-1 p-2 outline-none border border-accent rounded-md bg-primary hover:bg-lighter-accent'>
          {yearOptions}
        </select>
      </div>
    </div>
  );
};

export default DateSelector;