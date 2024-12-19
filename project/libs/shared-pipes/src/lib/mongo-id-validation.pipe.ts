import { ArgumentMetadata, BadRequestException, Injectable, PipeTransform } from '@nestjs/common';
import { Types } from 'mongoose';
import { MongodbInfo, ValidationInfo } from '@project/shared-types';ß

@Injectable()
export class MongoIdValidationPipe implements PipeTransform {
  public transform(value: string, { type }: ArgumentMetadata) {
    if (type !== 'param') {
      throw new Error(ValidationInfo.PipeImproperUsage);
    }

    if (!Types.ObjectId.isValid(value)) {
      throw new BadRequestException(MongodbInfo.InvalidID);
    }

    return value;
  }
}
