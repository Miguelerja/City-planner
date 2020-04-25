interface ApiResponse {
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
  title: string;
  content: string;
  lat?: string;
  long?: string;
  image_url?: string;
}

type Provider<T> = React.ComponentType<{
  value: T;
  children: React.ReactNode;
}>;

export interface ApiDataProviderProps {
  children?: React.ReactNode;
}

export type Data = {loading?: boolean, data: Array<ApiResponse>};