import multer from 'multer';
import path from 'path';
import fs from 'fs';
import express from 'express';
import CreateRoomDto from '../rooms/dto/create-room.dto';
import createHttpError from 'http-errors';
import { Body } from 'tsoa';
import { isArray } from 'util';
import { transformError } from '../helpers';

const listMimetypeAccept = ['image/png', 'image/jpg', 'image/jpeg'];

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, path.join(__dirname, '../../public/images/'));
  },
  filename: function (req, file, cb) {
    cb(
      null,
      file.fieldname + '-' + Date.now() + '-' + file.originalname.trim()
    );
  }
});

export const multerArrayMiddleware = multer({
  storage: storage,
  limits: { fileSize: 5 * 1024 * 1024 }, // 5MB
  fileFilter: (req, file, cb) => {
    if (!listMimetypeAccept.includes(file.mimetype)) {
      const err = new Error('Only .png, .jpg and .jpeg format allowed!');
      err.name = 'ExtensionError';
      return cb(err);
    }
    return cb(null, true);
  }
}).array('images');
