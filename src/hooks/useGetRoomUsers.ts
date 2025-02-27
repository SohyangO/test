import { useEffect } from 'react';
import { createClient } from '@/utils/supabase/client';
import { useQueryClient } from '@tanstack/react-query';
import { RoomUser } from '@/types/roomUser';
import { useQueryRoomUsers } from './useQueryRoomUsers';

export const useGetRoomUsers = (roomId: string, userId: string) => {
  const supabase = createClient();
  const queryClient = useQueryClient();
  const { roomUsers } = useQueryRoomUsers(roomId, userId);

  useEffect(() => {
    const subscription = supabase
      .channel('room')
      .on(
        'postgres_changes',
        { event: 'UPDATE', schema: 'public', table: 'userdata_room', filter: `room_id=eq.${roomId}` },
        (payload) => {
          const updated = payload.new as RoomUser;
          const updatedRoomUsers = roomUsers.map((user) =>
            user.user_id === updated.user_id ? { ...user, ...updated } : user
          );
          queryClient.setQueryData(['roomUsers'], updatedRoomUsers);
        }
      )
      .on(
        'postgres_changes',
        { event: 'INSERT', schema: 'public', table: 'userdata_room', filter: `room_id=eq.${roomId}` },
        (_payload) => {
          queryClient.refetchQueries({ queryKey: ['roomUsers'] });
        }
      )
      .subscribe((status, err) => {
        if (status === 'SUBSCRIBED') {
          console.log('연결됨!');
        }

        if (status === 'CHANNEL_ERROR') {
          console.error(`에러 : ${err?.message}`);
        }

        if (status === 'TIMED_OUT') {
          console.log('시간 초과');
        }

        if (status === 'CLOSED') {
          console.log('연결 끊김');
        }
      });

    return () => {
      supabase.removeChannel(subscription);
    };
  }, [supabase, roomUsers]);

  return { roomUsers };
};
