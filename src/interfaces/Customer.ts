export interface Customer {
  id: number;
  name: string;
  email: string;
  phone: string;
  birth: string;
  address: string;
  gender: string;
  note: string;
  radd: number;
  rsph: number;
  rcyl: number;
  raxis: number;
  rpd: number;
  ladd: number;
  lsph: number;
  lcyl: number;
  laxis: number;
  lpd: number;
  created_at: string;
  updated_at: string;
  is_delete: boolean;
}

export interface CustomerPayload {
  name: string;
  email: string;
  phone: string;
  birth: string;
  address: string;
  note: string;
  radd: number;
  rsph: number;
  rcyl: number;
  raxis: number;
  rpd: number;
  ladd: number;
  lsph: number;
  lcyl: number;
  laxis: number;
  lpd: number;
  gender: string;
}
