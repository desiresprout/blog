import IComment from './comment';
import IUser from './user';

export default interface IPost {
  key: string;
  id: number;
  title: string;
  body: string;
  isDeleted: string;
  isPrivate: boolean;
  created_at: string;
  comments: IComment[];
  commentsCount: number;
  user: IUser;
}
