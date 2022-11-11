/* tslint:disable */
/* eslint-disable */
// WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
import {
  Controller,
  ValidationService,
  FieldErrors,
  ValidateError,
  TsoaRoute,
  HttpStatusCodeLiteral,
  TsoaResponse,
  fetchMiddlewares
} from '@tsoa/runtime';
// WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
import { AuthController } from './../auth/auth.controller';
// WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
import { BookingsController } from './../bookings/bookings.controller';
// WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
import { RoomsController } from './../rooms/rooms.controller';
import { expressAuthentication } from './../middleware/auth.middleware';
// @ts-ignore - no great way to install types from subpackage
const promiseAny = require('promise.any');
import type { RequestHandler } from 'express';
import * as express from 'express';

// WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

const models: TsoaRoute.Models = {
  SignInDto: {
    dataType: 'refObject',
    properties: {
      email: { dataType: 'string', required: true },
      password: { dataType: 'string', required: true }
    },
    additionalProperties: false
  },
  // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
  BookDetailDto: {
    dataType: 'refObject',
    properties: {
      room_id: { dataType: 'double', required: true },
      from_date: { dataType: 'datetime', required: true },
      to_date: { dataType: 'datetime', required: true }
    },
    additionalProperties: false
  },
  // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
  CreateBookingDto: {
    dataType: 'refObject',
    properties: {
      data: {
        dataType: 'array',
        array: { dataType: 'refObject', ref: 'BookDetailDto' },
        required: true
      }
    },
    additionalProperties: false
  },
  // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
  UpdateBookingDto: {
    dataType: 'refObject',
    properties: {
      from_date: { dataType: 'datetime', required: true },
      to_date: { dataType: 'datetime', required: true }
    },
    additionalProperties: false
  },
  // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
  ImagesDto: {
    dataType: 'refObject',
    properties: {
      path: { dataType: 'string', required: true }
    },
    additionalProperties: false
  },
  // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
  CreateRoomDto: {
    dataType: 'refObject',
    properties: {
      name: { dataType: 'string', required: true },
      type: { dataType: 'string', required: true },
      description: { dataType: 'string', required: true },
      images: {
        dataType: 'array',
        array: { dataType: 'refObject', ref: 'ImagesDto' },
        required: true
      },
      price: { dataType: 'double', required: true },
      quantity: { dataType: 'double', required: true }
    },
    additionalProperties: false
  },
  // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
  UpdateRoomDto: {
    dataType: 'refObject',
    properties: {
      name: { dataType: 'string' },
      type: { dataType: 'string' },
      description: { dataType: 'string' },
      images: {
        dataType: 'array',
        array: { dataType: 'refObject', ref: 'ImagesDto' }
      },
      price: { dataType: 'double' },
      quantity: { dataType: 'double' }
    },
    additionalProperties: false
  }
  // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
};
const validationService = new ValidationService(models);

// WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

export function RegisterRoutes(app: express.Router) {
  // ###########################################################################################################
  //  NOTE: If you do not see routes for all of your controllers in this file, then you might not have informed tsoa of where to look
  //      Please look into the "controllerPathGlobs" config option described in the readme: https://github.com/lukeautry/tsoa
  // ###########################################################################################################
  app.post(
    '/api/v1/auth/sign-in',
    ...fetchMiddlewares<RequestHandler>(AuthController),
    ...fetchMiddlewares<RequestHandler>(AuthController.prototype.signIn),

    function AuthController_signIn(request: any, response: any, next: any) {
      const args = {
        body: { in: 'body', name: 'body', required: true, ref: 'SignInDto' }
      };

      // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

      let validatedArgs: any[] = [];
      try {
        validatedArgs = getValidatedArgs(args, request, response);

        const controller = new AuthController();

        const promise = controller.signIn.apply(
          controller,
          validatedArgs as any
        );
        promiseHandler(controller, promise, response, undefined, next);
      } catch (err) {
        return next(err);
      }
    }
  );
  // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
  app.post(
    '/api/v1/auth/sign-up',
    ...fetchMiddlewares<RequestHandler>(AuthController),
    ...fetchMiddlewares<RequestHandler>(AuthController.prototype.signUp),

    function AuthController_signUp(request: any, response: any, next: any) {
      const args = {
        body: { in: 'body', name: 'body', required: true, ref: 'SignInDto' }
      };

      // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

      let validatedArgs: any[] = [];
      try {
        validatedArgs = getValidatedArgs(args, request, response);

        const controller = new AuthController();

        const promise = controller.signUp.apply(
          controller,
          validatedArgs as any
        );
        promiseHandler(controller, promise, response, undefined, next);
      } catch (err) {
        return next(err);
      }
    }
  );
  // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
  app.post(
    '/api/v1/bookings',
    authenticateMiddleware([{ bearer: ['CUSTOMER'] }]),
    ...fetchMiddlewares<RequestHandler>(BookingsController),
    ...fetchMiddlewares<RequestHandler>(BookingsController.prototype.create),

    function BookingsController_create(request: any, response: any, next: any) {
      const args = {
        body: {
          in: 'body',
          name: 'body',
          required: true,
          ref: 'CreateBookingDto'
        }
      };

      // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

      let validatedArgs: any[] = [];
      try {
        validatedArgs = getValidatedArgs(args, request, response);

        const controller = new BookingsController();

        const promise = controller.create.apply(
          controller,
          validatedArgs as any
        );
        promiseHandler(controller, promise, response, undefined, next);
      } catch (err) {
        return next(err);
      }
    }
  );
  // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
  app.get(
    '/api/v1/bookings',
    authenticateMiddleware([{ bearer: ['CUSTOMER'] }]),
    ...fetchMiddlewares<RequestHandler>(BookingsController),
    ...fetchMiddlewares<RequestHandler>(BookingsController.prototype.getAll),

    function BookingsController_getAll(request: any, response: any, next: any) {
      const args = {
        page: { in: 'query', name: 'page', dataType: 'double' },
        limit: { in: 'query', name: 'limit', dataType: 'double' },
        status: { in: 'query', name: 'status', dataType: 'string' },
        req: { in: 'request', name: 'req', dataType: 'object' }
      };

      // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

      let validatedArgs: any[] = [];
      try {
        validatedArgs = getValidatedArgs(args, request, response);

        const controller = new BookingsController();

        const promise = controller.getAll.apply(
          controller,
          validatedArgs as any
        );
        promiseHandler(controller, promise, response, undefined, next);
      } catch (err) {
        return next(err);
      }
    }
  );
  // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
  app.get(
    '/api/v1/bookings/:id',
    authenticateMiddleware([{ bearer: ['CUSTOMER'] }]),
    ...fetchMiddlewares<RequestHandler>(BookingsController),
    ...fetchMiddlewares<RequestHandler>(BookingsController.prototype.getOne),

    function BookingsController_getOne(request: any, response: any, next: any) {
      const args = {
        id: { in: 'path', name: 'id', required: true, dataType: 'double' }
      };

      // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

      let validatedArgs: any[] = [];
      try {
        validatedArgs = getValidatedArgs(args, request, response);

        const controller = new BookingsController();

        const promise = controller.getOne.apply(
          controller,
          validatedArgs as any
        );
        promiseHandler(controller, promise, response, undefined, next);
      } catch (err) {
        return next(err);
      }
    }
  );
  // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
  app.put(
    '/api/v1/bookings/:id',
    authenticateMiddleware([{ bearer: ['CUSTOMER'] }]),
    ...fetchMiddlewares<RequestHandler>(BookingsController),
    ...fetchMiddlewares<RequestHandler>(BookingsController.prototype.update),

    function BookingsController_update(request: any, response: any, next: any) {
      const args = {
        id: { in: 'path', name: 'id', required: true, dataType: 'double' },
        body: {
          in: 'body',
          name: 'body',
          required: true,
          ref: 'UpdateBookingDto'
        }
      };

      // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

      let validatedArgs: any[] = [];
      try {
        validatedArgs = getValidatedArgs(args, request, response);

        const controller = new BookingsController();

        const promise = controller.update.apply(
          controller,
          validatedArgs as any
        );
        promiseHandler(controller, promise, response, undefined, next);
      } catch (err) {
        return next(err);
      }
    }
  );
  // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
  app.delete(
    '/api/v1/bookings/:id',
    authenticateMiddleware([{ bearer: ['CUSTOMER'] }]),
    ...fetchMiddlewares<RequestHandler>(BookingsController),
    ...fetchMiddlewares<RequestHandler>(
      BookingsController.prototype.cancelBooking
    ),

    function BookingsController_cancelBooking(
      request: any,
      response: any,
      next: any
    ) {
      const args = {
        id: { in: 'path', name: 'id', required: true, dataType: 'double' }
      };

      // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

      let validatedArgs: any[] = [];
      try {
        validatedArgs = getValidatedArgs(args, request, response);

        const controller = new BookingsController();

        const promise = controller.cancelBooking.apply(
          controller,
          validatedArgs as any
        );
        promiseHandler(controller, promise, response, undefined, next);
      } catch (err) {
        return next(err);
      }
    }
  );
  // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
  app.post(
    '/api/v1/rooms',
    ...fetchMiddlewares<RequestHandler>(RoomsController),
    ...fetchMiddlewares<RequestHandler>(RoomsController.prototype.create),

    function RoomsController_create(request: any, response: any, next: any) {
      const args = {
        body: { in: 'body', name: 'body', required: true, ref: 'CreateRoomDto' }
      };

      // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

      let validatedArgs: any[] = [];
      try {
        validatedArgs = getValidatedArgs(args, request, response);

        const controller = new RoomsController();

        const promise = controller.create.apply(
          controller,
          validatedArgs as any
        );
        promiseHandler(controller, promise, response, undefined, next);
      } catch (err) {
        return next(err);
      }
    }
  );
  // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
  app.post(
    '/api/v1/rooms/upload-images',
    ...fetchMiddlewares<RequestHandler>(RoomsController),
    ...fetchMiddlewares<RequestHandler>(RoomsController.prototype.uploadImages),

    function RoomsController_uploadImages(
      request: any,
      response: any,
      next: any
    ) {
      const args = {
        req: { in: 'request', name: 'req', required: true, dataType: 'object' }
      };

      // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

      let validatedArgs: any[] = [];
      try {
        validatedArgs = getValidatedArgs(args, request, response);

        const controller = new RoomsController();

        const promise = controller.uploadImages.apply(
          controller,
          validatedArgs as any
        );
        promiseHandler(controller, promise, response, undefined, next);
      } catch (err) {
        return next(err);
      }
    }
  );
  // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
  app.get(
    '/api/v1/rooms',
    ...fetchMiddlewares<RequestHandler>(RoomsController),
    ...fetchMiddlewares<RequestHandler>(RoomsController.prototype.getAll),

    function RoomsController_getAll(request: any, response: any, next: any) {
      const args = {
        page: { in: 'query', name: 'page', dataType: 'double' },
        limit: { in: 'query', name: 'limit', dataType: 'double' }
      };

      // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

      let validatedArgs: any[] = [];
      try {
        validatedArgs = getValidatedArgs(args, request, response);

        const controller = new RoomsController();

        const promise = controller.getAll.apply(
          controller,
          validatedArgs as any
        );
        promiseHandler(controller, promise, response, undefined, next);
      } catch (err) {
        return next(err);
      }
    }
  );
  // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
  app.get(
    '/api/v1/rooms/available',
    ...fetchMiddlewares<RequestHandler>(RoomsController),
    ...fetchMiddlewares<RequestHandler>(
      RoomsController.prototype.getAllRoomsAvailable
    ),

    function RoomsController_getAllRoomsAvailable(
      request: any,
      response: any,
      next: any
    ) {
      const args = {
        date: { in: 'query', name: 'date', dataType: 'datetime' }
      };

      // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

      let validatedArgs: any[] = [];
      try {
        validatedArgs = getValidatedArgs(args, request, response);

        const controller = new RoomsController();

        const promise = controller.getAllRoomsAvailable.apply(
          controller,
          validatedArgs as any
        );
        promiseHandler(controller, promise, response, undefined, next);
      } catch (err) {
        return next(err);
      }
    }
  );
  // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
  app.get(
    '/api/v1/rooms/:id',
    ...fetchMiddlewares<RequestHandler>(RoomsController),
    ...fetchMiddlewares<RequestHandler>(RoomsController.prototype.getOne),

    function RoomsController_getOne(request: any, response: any, next: any) {
      const args = {
        id: { in: 'path', name: 'id', required: true, dataType: 'double' }
      };

      // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

      let validatedArgs: any[] = [];
      try {
        validatedArgs = getValidatedArgs(args, request, response);

        const controller = new RoomsController();

        const promise = controller.getOne.apply(
          controller,
          validatedArgs as any
        );
        promiseHandler(controller, promise, response, undefined, next);
      } catch (err) {
        return next(err);
      }
    }
  );
  // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
  app.put(
    '/api/v1/rooms/:id',
    ...fetchMiddlewares<RequestHandler>(RoomsController),
    ...fetchMiddlewares<RequestHandler>(RoomsController.prototype.update),

    function RoomsController_update(request: any, response: any, next: any) {
      const args = {
        id: { in: 'path', name: 'id', required: true, dataType: 'double' },
        body: { in: 'body', name: 'body', required: true, ref: 'UpdateRoomDto' }
      };

      // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

      let validatedArgs: any[] = [];
      try {
        validatedArgs = getValidatedArgs(args, request, response);

        const controller = new RoomsController();

        const promise = controller.update.apply(
          controller,
          validatedArgs as any
        );
        promiseHandler(controller, promise, response, undefined, next);
      } catch (err) {
        return next(err);
      }
    }
  );
  // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
  app.delete(
    '/api/v1/rooms/:id',
    ...fetchMiddlewares<RequestHandler>(RoomsController),
    ...fetchMiddlewares<RequestHandler>(RoomsController.prototype.delete),

    function RoomsController_delete(request: any, response: any, next: any) {
      const args = {
        id: { in: 'path', name: 'id', required: true, dataType: 'double' }
      };

      // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

      let validatedArgs: any[] = [];
      try {
        validatedArgs = getValidatedArgs(args, request, response);

        const controller = new RoomsController();

        const promise = controller.delete.apply(
          controller,
          validatedArgs as any
        );
        promiseHandler(controller, promise, response, undefined, next);
      } catch (err) {
        return next(err);
      }
    }
  );
  // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

  // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

  // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

  function authenticateMiddleware(security: TsoaRoute.Security[] = []) {
    return async function runAuthenticationMiddleware(
      request: any,
      _response: any,
      next: any
    ) {
      // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

      // keep track of failed auth attempts so we can hand back the most
      // recent one.  This behavior was previously existing so preserving it
      // here
      const failedAttempts: any[] = [];
      const pushAndRethrow = (error: any) => {
        failedAttempts.push(error);
        throw error;
      };

      const secMethodOrPromises: Promise<any>[] = [];
      for (const secMethod of security) {
        if (Object.keys(secMethod).length > 1) {
          const secMethodAndPromises: Promise<any>[] = [];

          for (const name in secMethod) {
            secMethodAndPromises.push(
              expressAuthentication(request, name, secMethod[name]).catch(
                pushAndRethrow
              )
            );
          }

          // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

          secMethodOrPromises.push(
            Promise.all(secMethodAndPromises).then((users) => {
              return users[0];
            })
          );
        } else {
          for (const name in secMethod) {
            secMethodOrPromises.push(
              expressAuthentication(request, name, secMethod[name]).catch(
                pushAndRethrow
              )
            );
          }
        }
      }

      // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

      try {
        request['user'] = await promiseAny(secMethodOrPromises);
        next();
      } catch (err) {
        // Show most recent error as response
        const error = failedAttempts.pop();
        error.status = error.status || 401;
        next(error);
      }

      // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    };
  }

  // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

  function isController(object: any): object is Controller {
    return (
      'getHeaders' in object && 'getStatus' in object && 'setStatus' in object
    );
  }

  function promiseHandler(
    controllerObj: any,
    promise: any,
    response: any,
    successStatus: any,
    next: any
  ) {
    return Promise.resolve(promise)
      .then((data: any) => {
        let statusCode = successStatus;
        let headers;
        if (isController(controllerObj)) {
          headers = controllerObj.getHeaders();
          statusCode = controllerObj.getStatus() || statusCode;
        }

        // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

        returnHandler(response, statusCode, data, headers);
      })
      .catch((error: any) => next(error));
  }

  // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

  function returnHandler(
    response: any,
    statusCode?: number,
    data?: any,
    headers: any = {}
  ) {
    if (response.headersSent) {
      return;
    }
    Object.keys(headers).forEach((name: string) => {
      response.set(name, headers[name]);
    });
    if (
      data &&
      typeof data.pipe === 'function' &&
      data.readable &&
      typeof data._read === 'function'
    ) {
      data.pipe(response);
    } else if (data !== null && data !== undefined) {
      response.status(statusCode || 200).json(data);
    } else {
      response.status(statusCode || 204).end();
    }
  }

  // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

  function responder(
    response: any
  ): TsoaResponse<HttpStatusCodeLiteral, unknown> {
    return function (status, data, headers) {
      returnHandler(response, status, data, headers);
    };
  }

  // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

  function getValidatedArgs(args: any, request: any, response: any): any[] {
    const fieldErrors: FieldErrors = {};
    const values = Object.keys(args).map((key) => {
      const name = args[key].name;
      switch (args[key].in) {
        case 'request':
          return request;
        case 'query':
          return validationService.ValidateParam(
            args[key],
            request.query[name],
            name,
            fieldErrors,
            undefined,
            { noImplicitAdditionalProperties: 'throw-on-extras' }
          );
        case 'path':
          return validationService.ValidateParam(
            args[key],
            request.params[name],
            name,
            fieldErrors,
            undefined,
            { noImplicitAdditionalProperties: 'throw-on-extras' }
          );
        case 'header':
          return validationService.ValidateParam(
            args[key],
            request.header(name),
            name,
            fieldErrors,
            undefined,
            { noImplicitAdditionalProperties: 'throw-on-extras' }
          );
        case 'body':
          return validationService.ValidateParam(
            args[key],
            request.body,
            name,
            fieldErrors,
            undefined,
            { noImplicitAdditionalProperties: 'throw-on-extras' }
          );
        case 'body-prop':
          return validationService.ValidateParam(
            args[key],
            request.body[name],
            name,
            fieldErrors,
            'body.',
            { noImplicitAdditionalProperties: 'throw-on-extras' }
          );
        case 'formData':
          if (args[key].dataType === 'file') {
            return validationService.ValidateParam(
              args[key],
              request.file,
              name,
              fieldErrors,
              undefined,
              { noImplicitAdditionalProperties: 'throw-on-extras' }
            );
          } else if (
            args[key].dataType === 'array' &&
            args[key].array.dataType === 'file'
          ) {
            return validationService.ValidateParam(
              args[key],
              request.files,
              name,
              fieldErrors,
              undefined,
              { noImplicitAdditionalProperties: 'throw-on-extras' }
            );
          } else {
            return validationService.ValidateParam(
              args[key],
              request.body[name],
              name,
              fieldErrors,
              undefined,
              { noImplicitAdditionalProperties: 'throw-on-extras' }
            );
          }
        case 'res':
          return responder(response);
      }
    });

    if (Object.keys(fieldErrors).length > 0) {
      throw new ValidateError(fieldErrors, '');
    }
    return values;
  }

  // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
}

// WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
