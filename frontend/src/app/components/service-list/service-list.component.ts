import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { Service } from '../../models/service';
import { ServiceService } from '../../services/service.service';
import { ServiceFormComponent } from '../service-form/service-form.component';

@Component({
  selector: 'app-service-list',
  standalone: true,
  imports: [CommonModule, RouterModule, ServiceFormComponent],
  templateUrl: './service-list.component.html',
  styleUrls: ['./service-list.component.css']
})
export class ServiceListComponent implements OnInit {
  services: Service[] = [];
  selectedService: Service | null = null;
  showForm = false;

  constructor(private serviceService: ServiceService) {}

  ngOnInit(): void {
    this.loadServices();
  }

  loadServices(): void {
    this.serviceService.getServices().subscribe({
      next: (data) => {
        this.services = data;
      },
      error: (error) => {
        console.error('Error al cargar servicios', error);
      }
    });
  }

  onNew(): void {
    this.selectedService = null;
    this.showForm = true;
  }

  onEdit(service: Service): void {
    this.selectedService = { ...service };
    this.showForm = true;
  }

  onDelete(id: number): void {
    if (confirm('¿Estás seguro de eliminar este servicio?')) {
      this.serviceService.deleteService(id).subscribe({
        next: () => {
          this.loadServices();
        },
        error: (error) => {
          console.error('Error al eliminar', error);
        }
      });
    }
  }

  onFormSaved(): void {
    this.showForm = false;
    this.loadServices();
  }

  onCancel(): void {
    this.showForm = false;
    this.selectedService = null;
  }
}