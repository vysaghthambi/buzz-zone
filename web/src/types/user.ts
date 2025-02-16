export type UserType = {
  id: string;
  email: string;
  name: string;
  role: "user" | "moderator" | "admin";
  created_at: string;
  updated_at: string;
};

export type UserResponse = {
  user: UserType;
};
