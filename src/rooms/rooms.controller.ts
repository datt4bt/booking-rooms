import {
  Route,
  Tags,
  Post,
  Body,
  Controller,
  Get,
  Query,
  Path,
  Delete,
  Put,
  Middlewares,
  Request
} from 'tsoa';
import CreateRoomDto from './dto/create-room.dto';
import { RoomService } from './rooms.service';
import { Inject } from 'typescript-ioc';
import { UpdateRoomDto } from './dto/update-room.dto';
import { multerArrayMiddleware } from '../middleware/upload-image.middleware';
import { transformResponse } from '../helpers';

@Route('/rooms')
@Tags('Rooms')
export class RoomsController extends Controller {
  @Inject
  private roomService!: RoomService;

  @Post('/')
  public async create(@Body() body: CreateRoomDto) {
    return await this.roomService.create(body);
  }

  @Post('/upload-images')
  @Middlewares(multerArrayMiddleware)
  public async uploadImages(@Request() req: Express.Request) {
    const files: any = req.files;
    const data: Array<object> = files.map((file: Express.Multer.File) => {
      return { path: `images/${file.filename}` };
    });
    return transformResponse({ data });
  }

  @Get('/')
  public async getAll(@Query() page?: number, @Query() limit?: number) {
    const data = await this.roomService.getAll(page, limit);
    return transformResponse({ data });
  }

  @Get('/available')
  public async getAllRoomsAvailable(@Query() date?: Date) {
    const data = await this.roomService.getAllRoomsAvailable({
      date
    });
    return transformResponse({ data });
  }

  @Get('/:id')
  public async getOne(@Path() id: number) {
    const data = await this.roomService.getOne(id);
    return transformResponse({ data });
  }

  @Put('/:id')
  public async update(@Path() id: number, @Body() body: UpdateRoomDto) {
    await this.roomService.update(id, body);
    return transformResponse({ data: { message: 'Update Room success' } });
  }

  @Delete('/:id')
  public async delete(@Path() id: number) {
    await this.roomService.delete(id);
    return transformResponse({ data: { message: 'Delete Room success' } });
  }
}
