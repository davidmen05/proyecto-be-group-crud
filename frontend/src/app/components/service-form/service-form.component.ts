import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Service } from '../../models/service';
import { ServiceService } from '../../services/service.service';

@Component({
  selector: 'app-service-form',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './service-form.component.html',
  styleUrls: ['./service-form.component.css']
})
export class ServiceFormComponent implements OnInit {
  @Input() service: Service | null = null;
  @Output() saved = new EventEmitter<void>();
  @Output() cancel = new EventEmitter<void>();

  serviceForm: FormGroup;
  categories = ['Contable', 'Tributario', 'Laboral', 'Asesoría'];

  constructor(
    private fb: FormBuilder,
    private serviceService: ServiceService
  ) {
    this.serviceForm = this.fb.group({
      name: ['', Validators.required],
      description: ['', Validators.required],
      price: ['', [Validators.required, Validators.min(1)]],
      category: ['Contable', Validators.required],
      active: [true]
    });
  }

  ngOnInit(): void {
    if (this.service) {
      this.serviceForm.patchValue(this.service);
    }
  }

  onSubmit(): void {
    if (this.serviceForm.valid) {
      if (this.service?.id) {
        this.serviceService.updateService(this.service.id, this.serviceForm.value)
          .subscribe({
            next: () => this.saved.emit(),
            error: (error) => console.error('Error al actualizar', error)
          });
      } else {
        this.serviceService.createService(this.serviceForm.value)
          .subscribe({
            next: () => this.saved.emit(),
            error: (error) => console.error('Error al crear', error)
          });
      }
    }
  }

  onCancel(): void {
    this.cancel.emit();
  }
}