import { Exclude, Expose, Type } from 'class-transformer';

export class UserSerializer {
  @Expose() email: string;
  @Expose() userName: string;
  @Exclude() password: string;
}
