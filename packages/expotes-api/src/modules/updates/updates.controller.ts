import { Body, UploadedFile, UseInterceptors } from '@nestjs/common';
import { UpdatesService } from './updates.service';
import { FileInterceptor } from '@nestjs/platform-express';
import { Express } from 'express';
import { CreateUpdatesDto, FindAllUpdatesDto } from './updates.dto';
import { ApiController } from '@/common/decorators/api-controller.decorator';
import { TypedQuery, TypedRoute } from '@nestia/core';
import { Team } from '@/common/decorators/get-owner-decorator';

@ApiController('updates')
export class UpdatesController {
  constructor(private readonly uploadService: UpdatesService) {}

  @TypedRoute.Get('list')
  async list(
    @TypedQuery() { appId }: { appId?: string },
    @Team() teamId: string,
  ): Promise<FindAllUpdatesDto[]> {
    return this.uploadService.listUpdates({ appId, teamId });
  }

  @TypedRoute.Post('create')
  @UseInterceptors(FileInterceptor('file'))
  async create(
    @Body() body: CreateUpdatesDto,
    @UploadedFile() file: Express.Multer.File,
  ) {
    return this.uploadService.createUpdates(
      {
        appId: body.appId,
        meta: { runtimeVersion: '1' },
      },
      file,
    );
  }
}
