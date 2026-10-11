import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber, IsString, IsOptional, MaxLength } from 'class-validator';

export class AddNotificationDto {
  @ApiProperty({ example: 1, description: 'Target user ID' })
  @IsNotEmpty()
  @IsNumber()
  user_id: number;

  @ApiProperty({ example: 'Assignment Reminder', description: 'Notification title' })
  @IsNotEmpty()
  @IsString()
  @MaxLength(200)
  title: string;

  @ApiProperty({ example: 'Your Math assignment is due tomorrow at 5 PM.', description: 'Notification message text' })
  @IsNotEmpty()
  @IsString()
  message: string;

  @ApiPropertyOptional({ example: 'info', description: 'Type of notification (e.g., info, warning, alert)' })
  @IsOptional()
  @IsString()
  @MaxLength(50)
  type?: string;
}

export class UpdateNotificationDto {
  @ApiProperty({ example: 1, description: 'Notification ID' })
  @IsNotEmpty()
  @IsNumber()
  id: number;

  @ApiProperty({ example: 'Updated Assignment Reminder', description: 'Updated notification title' })
  @IsNotEmpty()
  @IsString()
  @MaxLength(200)
  title: string;

  @ApiProperty({ example: 'Your Math assignment submission time has been extended.', description: 'Updated message' })
  @IsNotEmpty()
  @IsString()
  message: string;

  @ApiPropertyOptional({ example: 'info', description: 'Notification type' })
  @IsOptional()
  @IsString()
  @MaxLength(50)
  type?: string;
}

export class MarkAsReadDto {
  @ApiProperty({ example: 1, description: 'Notification ID to mark as read' })
  @IsNotEmpty()
  @IsNumber()
  id: number;
}

export class MarkAllAsReadDto {
  @ApiProperty({ example: 1, description: 'User ID whose notifications to mark as read' })
  @IsNotEmpty()
  @IsNumber()
  user_id: number;
}
