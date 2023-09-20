export interface IUserCard {
  userProfile: any;
  user: any;
  userId: number;
  // onUploadAvatarClick: (e: React.MouseEvent<HTMLSpanElement>) => void;
  onAvatarChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}