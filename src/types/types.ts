export interface ApiResponse {
  id: number;
  title: string;
  content: string;
  lat: string;
  long: string;
  image_url: string;
  created_at: string;
  updated_at: string;
  [key: string]: string | number;
};

export interface ApiPostCall {
  id?: number;
  title: string;
  content: string;
  lat?: string;
  long?: string;
  image_url?: string;
}

export interface ApiEditCall {
  title?: string;
  content?: string;
}

type Provider<T> = React.ComponentType<{
  value: T;
  children: React.ReactNode;
}>;

export type Action = { type: string, payload: Data };
export type Dispatch = (action: Action) => void;
export type Data = {loading?: boolean, data: Array<ApiResponse>};