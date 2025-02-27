export type RoomUser = {
  created_at: string;
  id: string;
  is_admin: boolean;
  room_id: string;
  start_location: string | null;
  lat: string | null;
  lng: string | null;
  user_id: string;
  users: {
    profile_url: string | null;
    name: string;
  } | null;
};

export type UpsertUserSchedule = {
  room_id: string;
  created_by: string;
  start_date: string;
  end_date: string;
};
