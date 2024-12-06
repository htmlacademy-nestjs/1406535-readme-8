import { Expose } from 'class-transformer';

export class UserRto {
  @Expose()
  public id: string;

  @Expose()
  public email: string;

  @Expose()
  public fullName: string;

  @Expose()
  public avatar?: string;
}
