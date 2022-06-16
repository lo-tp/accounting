export interface ResponseData<T=any> {
  code: number;
  error?: string;
  data?: T;
}

export function createSuccessfulResponseData <T>(data: T): ResponseData<T> { 
  return {
    code: 0,
    data,
  };
}
