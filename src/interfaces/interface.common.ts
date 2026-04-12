export interface ICallback {
  onSuccess: () => void;
  onError: () => void;
}

export interface ICallbackError {
  onSuccess: () => void;
  onError: (error: Error) => void;
}

export interface ICallbackResponse {
  onSuccess: (response: any, variables?: any) => void;
  onError: (error: any) => void;
}

export interface INestResponse<T> {
  statusCode: number;
  message: string;
  data: T;
}
