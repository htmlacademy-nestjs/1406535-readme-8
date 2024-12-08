import { NotFoundException } from '@nestjs/common';
import { Document, Model } from 'mongoose';
import { Entity, EntityFactory, MongodbInfo, StorableEntity } from '@project/shared-types';
import { Repository } from './repository.interface';

export abstract class BaseMongoRepository<T extends Entity & StorableEntity<ReturnType<T['toPOJO']>>,
  DocumentType extends Document> implements Repository<T> {

  constructor(
    protected entityFactory: EntityFactory<T>,
    protected readonly model: Model<DocumentType>,
  ) {}


  protected createEntityFromDocument(document: DocumentType): T | null {
    if (!document) {
      return null;
    }

    const plainObject = document.toObject({ versionKey: false }) as ReturnType<T['toPOJO']>;
    return this.entityFactory.create(plainObject);
  }

  public async findById(id: T['id']): Promise<T> {
    const document = await this.model.findById(id).exec();
    return this.createEntityFromDocument(document);
  }

  public async save(entity: T): Promise<void> {
    const newEntity = new this.model(entity.toPOJO());
    await newEntity.save();

    // Здесь добавляем свойство id и потом все методы оперируют с ним???
    entity.id = newEntity._id.toString();
  }

  public async update(entity: T): Promise<void> {
    const updatedDocument = await this.model.findByIdAndUpdate(
      entity.id,
      entity.toPOJO(),
      { new: true }
    )
      .exec();

    if (!updatedDocument) {
      throw new NotFoundException(`${MongodbInfo.EntityNotFound}. ID: ${entity.id}`);
    }
  }

  public async deleteById(id: T['id']): Promise<void> {
    const deletedDocument = await this.model.findByIdAndDelete(id).exec();

    if (!deletedDocument) {
      throw new NotFoundException(`${MongodbInfo.EntityNotFound}. ID: ${id}`);
    }
  }
}
