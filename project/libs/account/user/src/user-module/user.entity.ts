import { compare, genSalt, hash } from 'bcrypt';
import { AuthUser, Entity, StorableEntity } from '@project/shared-types';

export const SALT_ROUNDS = 10;
export class UserEntity extends Entity implements StorableEntity<AuthUser> {
  public email: string;
  public fullName: string;
  public avatar?: string;
  public subscribers: string[] = [];
  public passwordHash: string;
  public createdAt: Date;

  constructor(user?: AuthUser) {
    super();
    this.populate(user);
  }

  public populate(user?: AuthUser): void {
    if (!user) {
      return;
    }

    this.id = user.id ?? undefined;
    this.email = user.email;
    this.fullName = user.fullName;
    this.avatar = user.avatar ?? undefined;
    this.passwordHash = user.passwordHash;
    this.createdAt = user.createdAt;
  }

  public toPOJO(): AuthUser {
      return {
        id: this.id,
        email: this.email,
        fullName: this.fullName,
        avatar: this.avatar,
        passwordHash: this.passwordHash,
        subscribers: this.subscribers,
        createdAt: this.createdAt,
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
