import { IsOptional, IsPort, IsString, validateOrReject } from 'class-validator';
import { Default } from '@project/shared-types';

export class MongoConfiguration {
  @IsString()
  public name: string;

  @IsString()
  public host: string;

  @IsPort()
  @IsOptional()
  public port: number = Default.MongoDefaultPort;

  @IsString()
  public user: string;

  @IsString()
  public password: string;

  @IsString()
  public authBase: string;

  public async validate(): Promise<void> {
    await validateOrReject(this);
  }
}
