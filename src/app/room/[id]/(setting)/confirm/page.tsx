'use client';

import { useParams, useRouter } from 'next/navigation';
import { useQueryUser } from '@/hooks/useQueryUser';
import { useCalendarStore } from '@/store/calendarStore';
import { useSearchDataStore } from '@/store/placeStore';
import { sortDate } from '@/utils/sortDate';
import { Button } from '@nextui-org/react';
import styles from './page.module.css';
import { upsertRoomUser } from '@/api/room';
import { upsertSchedule } from '@/api/supabaseCSR/supabase';

const SettingConfirmPage = () => {
  const router = useRouter();
  const { id: roomId }: { id: string } = useParams();
  const { id: userId } = useQueryUser();

  const selectedDates = useCalendarStore((state) => state.selectedDates);
  const sortedDates = sortDate(selectedDates);

  const {
    location: { lat, lng },
    address
  } = useSearchDataStore((state) => state);

  const handlePrevStep = () => {
    router.push(`/room/${roomId}/pick-place`);
  };

  const handleSubmit = async () => {
    const userLocationData = {
      room_id: roomId,
      user_id: userId,
      start_location: address,
      is_admin: false,
      lat: lat.toString(),
      lng: lng.toString()
    };

    const userSchedules = sortedDates.map((date) => {
      return {
        room_id: roomId,
        created_by: userId,
        start_date: new Date(date).toDateString(),
        end_date: new Date(date).toDateString()
      };
    });

    await upsertRoomUser(userLocationData);
    await upsertSchedule(userSchedules);
    router.replace(`/room/${roomId}`);

    sessionStorage.removeItem('setting-location-storage');
    sessionStorage.removeItem('setting-calendar-storage');

    router.push(`/room/${roomId}`);
  };

  return (
    <>
      <div className={styles.box}>
        <ul>
          {sortedDates.length > 0 ? (
            sortedDates.map((date, index) => <li key={index}>{new Date(date).toLocaleDateString()}</li>)
          ) : (
            <li>선택한 일정이 없습니다</li>
          )}
        </ul>
      </div>
      <div className={styles.box}>{address}</div>
      <div className={styles.footer}>
        <Button onClick={handlePrevStep}>이전</Button>
        <Button onClick={handleSubmit}>저장</Button>
      </div>
    </>
  );
};

export default SettingConfirmPage;
