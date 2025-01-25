import { Entity, StorableEntity, Subscriber } from '@project/shared-types';

export class EmailSubscriberEntity extends Entity implements StorableEntity<Subscriber> {
  public email: string;
  public fullName: string;

  constructor (subscriber?: Subscriber) {
    super();
    this.populate(subscriber);
  }

  public populate(subscriber?: Subscriber): void {

    if (!subscriber) {
      return;
    }

    this.id = subscriber.id ?? undefined;
    this.email = subscriber.email;
    this.fullName = subscriber.fullName;
  }

  public toPOJO(): Subscriber {
    return {
      id: this.id,
      email: this.email,
      fullName: this.fullName,
    }
  }
}
