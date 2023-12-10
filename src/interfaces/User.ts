export interface LoginParams {
  email: string;
  password: string;
}

export interface User {
  access_token: string;
  access_token_exp: number;
  user: {
    id: number;
    name: string;
    email: string;
    verified: boolean;
    image?: string;
    admin: boolean;
    created_at: string;
    updated_at: string;
  };
}
