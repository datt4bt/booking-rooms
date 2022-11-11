import { IsDateString, IsEnum, IsNotEmpty, IsOptional } from 'class-validator';
import { STATUS_BOOKING } from '../../configs';

export class UpdateBookingDto {
  @IsDateString()
  @IsOptional()
  from_date: Date;

  @IsDateString()
  @IsOptional()
  to_date: Date;
}

export class UpdateStatusBookingDto {
  @IsEnum(Object.keys(STATUS_BOOKING))
  @IsNotEmpty()
  status: string;
}
