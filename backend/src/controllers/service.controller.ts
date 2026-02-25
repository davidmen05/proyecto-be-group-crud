import { Request, Response } from 'express';
import { services } from '../models/Service.model';

export class ServiceController {
  static getAll(_req: Request, res: Response) {
    return res.json(services);
  }

  static getById(req: Request, res: Response) {
    const id = Number(req.params.id);
    const service = services.find(s => s.id === id);
    
    if (!service) {
      return res.status(404).json({ mensaje: 'Servicio no encontrado' });
    }
    
    return res.json(service);
  }

  static create(req: Request, res: Response) {
    const { name, description, price, category } = req.body;
    
    const newService = {
      id: services.length + 1,
      name,
      description,
      price: Number(price),
      category,
      active: true,
      createdAt: new Date()
    };
    
    services.push(newService);
    return res.status(201).json(newService);
  }

  static update(req: Request, res: Response) {
    const id = Number(req.params.id);
    const index = services.findIndex(s => s.id === id);
    
    if (index === -1) {
      return res.status(404).json({ mensaje: 'Servicio no encontrado' });
    }
    
    services[index] = {
      ...services[index]!,  // Agregamos "!" aquí
      ...req.body,
      id: services[index]!.id  // Agregamos "!" aquí
    };
    
    return res.json(services[index]);
  }

  static delete(req: Request, res: Response) {
    const id = Number(req.params.id);
    const index = services.findIndex(s => s.id === id);
    
    if (index === -1) {
      return res.status(404).json({ mensaje: 'Servicio no encontrado' });
    }
    
    services.splice(index, 1);
    return res.json({ mensaje: 'Servicio eliminado' });
  }
}