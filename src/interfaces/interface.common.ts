export interface ICallback {
  onSuccess: () => void;
  onError: () => void;
}

export interface ICallbackError {
  onSuccess: () => void;
  onError: (error: Error) => void;
}

export interface ICallbackResponse {
  onSuccess: (response: any) => void;
  onError: (error: Error) => void;
}
