export interface Service {
  id: number;
  name: string;
  description: string;
  price: number;
  category: string;
  active: boolean;
  createdAt: Date;
}

export const services: Service[] = [
  {
    id: 1,
    name: 'Asesoría Contable',
    description: 'Para emprendedores',
    price: 150000,
    category: 'Contable',
    active: true,
    createdAt: new Date()
  },
  {
    id: 2,
    name: 'Declaración de Renta',
    description: 'Personas naturales',
    price: 250000,
    category: 'Tributario',
    active: true,
    createdAt: new Date()
  }
];