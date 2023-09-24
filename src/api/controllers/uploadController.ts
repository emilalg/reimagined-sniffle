// TODO: create a controller to send the data of uploaded cat
// to the client
// data to send is described in UploadMessageResponse interface

import {Request, Response, NextFunction} from 'express';
import UploadMessageResponse from '../../interfaces/UploadMessageResponse';
import {Point} from 'geojson';
import CustomError from '../../classes/CustomError';

// This function assumes you've stored the uploaded file's metadata in req.file
// and the location data in req.body.location or similar.
export const catPost = (
  req: Request,
  res: Response,
  next: NextFunction
): void => {
  try {
    if (!req.file) {
      throw new CustomError('No file uploaded', 400);
    }

    const coordinates = res.locals.coords;

    const response: UploadMessageResponse = {
      message: 'File uploaded successfully',
      data: {
        filename: req.file.filename,
        location: coordinates,
      },
    };

    res.status(200).json(response);
  } catch (error) {
    console.error(error);
    res.status(500).json({message: 'Internal server error'});
  }
};
