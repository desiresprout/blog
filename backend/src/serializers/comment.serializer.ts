import { Expose, Transform, Exclude } from 'class-transformer';
import * as dayjs from 'dayjs';
import { uuid } from 'uuidv4';

export class CommentSerializer {
  @Expose()
  @Transform(() => uuid())
  key: string;

  @Expose()
  id: number;

  @Expose()
  comment: string;

  @Expose()
  depth: number;

  @Exclude()
  is_deleted: boolean;

  @Expose({ name: 'isPrivate', toPlainOnly: true })
  is_private: boolean;

  @Exclude()
  userId: number;

  @Exclude()
  postId: number;

  @Expose()
  @Transform(({ value }) => dayjs(value).format('YYYY-MM-DD HH:mm:ss'), { toClassOnly: true })
  created_at: string;
}
