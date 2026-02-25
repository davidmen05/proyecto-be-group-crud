export interface Service {
  id?: number;
  name: string;
  description: string;
  price: number;
  category: string;
  active: boolean;
  createdAt?: Date;
}