import { Expose, Type, Transform, Exclude } from 'class-transformer';
import { UserSerializer } from '../serializers/user.serializer';
import * as dayjs from 'dayjs';
import { uuid } from 'uuidv4';

export class PostSerializer {
  @Expose()
  @Transform(() => uuid())
  key: string;

  @Expose()
  id: number;
  @Expose() title: string;
  @Expose() body: string;

  @Expose({ name: 'isDeleted', toPlainOnly: true })
  is_deleted: boolean;

  @Expose({ name: 'isPrivated', toPlainOnly: true })
  is_private: boolean;
  @Exclude() userId: number;

  @Expose()
  @Transform(({ value }) => dayjs(value).format('YYYY-MM-DD HH:mm:ss'), { toClassOnly: true })
  created_at: string;

  // @Expose({ name: 'commentsCount' })
  // @Transform((test) => {
  // console.log('test', test.value);
  // return test.value?.comments;
  // console.log(test.value.comments);
  // return 'hi';
  // console.log('value', value);
  // console.log('value', value);
  // return value.comments;
  // })
  // _count: any;

  @Type(() => UserSerializer)
  user: UserSerializer;

  @Expose({ name: 'commentsCount' })
  getCommentsCount() {
    return this['_count'].comments;
  }
}
