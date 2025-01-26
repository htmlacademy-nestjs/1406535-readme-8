import { OmitType } from '@nestjs/swagger';
import { LoggedUserRdo } from '../rdo/logged-user.rdo';

export class TokenPairRdo extends OmitType(LoggedUserRdo, ['id', 'email'] as const) {}
