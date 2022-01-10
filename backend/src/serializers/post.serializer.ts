import { Expose, Type, Transform } from 'class-transformer';
import { UserSerializer } from '../serializers/user.serializer';
import * as dayjs from 'dayjs';

export class PostSerializer {
  @Expose() id: number;
  @Expose() title: string;
  @Expose() body: string;
  @Expose() is_deleted: boolean;
  @Expose() is_private: boolean;
  @Expose()
  @Transform(({ value }) => dayjs(value).format('YYYY-MM-DD HH:mm:ss'), { toClassOnly: true })
  created_at: String;

  @Type(() => UserSerializer)
  user: UserSerializer;
}
