import { compare, genSalt, hash } from 'bcrypt';
import { AuthUser, Entity, StorableEntity } from '@project/shared-types';
import { SALT_ROUNDS } from './user.constant';

export class UserEntity extends Entity implements StorableEntity<AuthUser> {
  public email: string;
  public fullName: string;
  public avatar?: string;
  public registerDate?: Date;
  public postsCount = 0;
  public subscribersCount = 0;
  public passwordHash: string;

  constructor(user?: AuthUser) {
    super();
    this.populate(user);
  }

  public populate(user?: AuthUser): void {
    if (!user) {
      return;
    }

    this.id = user.id ?? '';
    this.email = user.email;
    this.fullName = user.fullName;
    this.avatar = user.avatar;
  }

  public toPOJO(): AuthUser {
      return {
        id: this.id,
        email: this.email,
        fullName: this.fullName,
        avatar: this.avatar,
        registerDate: this.registerDate,
        postsCount: this.postsCount,
        subscribersCount: this.subscribersCount,
        passwordHash: this.passwordHash,
      }
  }

  public async setPassword(password: string): Promise<UserEntity> {
    const salt = await genSalt(SALT_ROUNDS);
    this.passwordHash = await hash(password, salt);
    return this;
  }

  public async checkPassword(password: string): Promise<boolean> {
    return compare(password, this.passwordHash);
  }
}
