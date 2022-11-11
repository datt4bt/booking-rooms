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
  Request,
  Security
} from 'tsoa';
import { CreateBookingDto } from './dto/create-booking.dto';
import { BookingsService } from './bookings.service';
import { Inject } from 'typescript-ioc';
import { UpdateBookingDto } from './dto/update-bookings.dto';
import { transformResponse } from '../helpers';
import express from 'express';

@Route('/bookings')
@Tags('Bookings')
@Security('bearer', ['CUSTOMER'])
export class BookingsController extends Controller {
  @Inject
  private service: BookingsService;

  @Post('/')
  public async create(@Body() body: CreateBookingDto) {
    return await this.service.create(body);
  }

  @Get('/')
  public async getAll(
    @Query() page?: number,
    @Query() limit?: number,
    @Query() status?: string,
    @Request() req?: express.Request
  ) {
    const data = await this.service.getAll(page, limit, status, req['user']);
    return transformResponse({ data });
  }

  @Get('/:id')
  public async getOne(@Path() id: number) {
    const data = await this.service.getOne(id);
    return transformResponse({ data });
  }

  @Put('/:id')
  public async update(@Path() id: number, @Body() body: UpdateBookingDto) {
    await this.service.update(id, body);
    return transformResponse({ data: { message: 'Update Room success' } });
  }

  @Delete('/:id')
  public async cancelBooking(@Path() id: number) {
    await this.service.cancelBooking(id);
    return transformResponse({ data: { message: 'Cancel booking success' } });
  }
}
