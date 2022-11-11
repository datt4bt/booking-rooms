import { IsNotEmpty, IsDateString } from 'class-validator';

export class AvailableRoomDto {
  @IsDateString()
  @IsNotEmpty()
  public date: Date;
}
