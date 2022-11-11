import createError from 'http-errors';

export const transformResponse = ({ data, ...rest }) => ({
  data,
  success: true,
  ...rest
});

export const transformError = (error: string, status?: number) => {
  throw createError(status || 400, error);
};
