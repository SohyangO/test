'use client';

import Calender from '@/components/room/meeting/calender/Calender';
import ResetSchedule from '@/components/room/meeting/calender/ResetSchedule';
import { useCalendarStore } from '@/store/calendarStore';
import checkSelectedDates from '@/utils/calendar/checkSelectedDates';
import { Button, Link } from '@nextui-org/react';
import { useParams } from 'next/navigation';
import styles from './page.module.css';

const PickCalendar = () => {
  const { id } = useParams();
  const selectedDates = useCalendarStore((state) => state.selectedDates);

  return (
    <>
      <Calender />
      <div className={styles.footer}>
        <Button href={`/room/${id}/pick-place`} disabled={!checkSelectedDates(selectedDates)} as={Link}>
          다음
        </Button>
      </div>
    </>
  );
};

export default PickCalendar;
