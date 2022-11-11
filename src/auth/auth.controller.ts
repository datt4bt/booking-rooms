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
import { SignInDto } from './dto/sign-in.dto';
import { AuthService } from './auth.service';
import { Inject } from 'typescript-ioc';
import { UpdateBookingDto } from './dto/update-bookings.dto';
import { transformResponse } from '../helpers';

@Route('/auth')
@Tags('Auth')
export class AuthController extends Controller {
  @Inject
  private service: AuthService;

  @Post('/sign-in')
  public async signIn(@Body() body: SignInDto) {
    return await this.service.signIn(body);
  }

  @Post('/sign-up')
  public async signUp(@Body() body: SignInDto) {
    return await this.service.signUp(body);
  }
}
