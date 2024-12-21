import { Component, EventEmitter, Output, ViewChild, ElementRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, NgForm } from '@angular/forms';
import { EventService } from '../../../../shared/services/event.service';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from '../../../../core/services/auth.service';

@Component({
  selector: 'app-event-creator',
  templateUrl: './event-creator.component.html',
  styleUrls: ['./event-creator.component.css'],
  standalone: true,
  imports: [CommonModule, FormsModule]
})
export class EventCreatorComponent {
  @Output() close = new EventEmitter<void>();
  @Output() eventCreated = new EventEmitter<void>();
  @ViewChild('fileInput') fileInput!: ElementRef;

  imagePreview: string | null = null;
  selectedFile: File | null = null;
  isSubmitting = false;
  maxFileSize = 5 * 1024 * 1024; // 5MB en bytes

  constructor(
    private eventService: EventService,
    private toastr: ToastrService,
    private authService: AuthService
  ) {}

  closeEventCreator(): void {
    this.close.emit();
  }

  onImageSelected(event: any): void {
    const file = event.target.files[0];
    if (file) {
      if (!this.validateFileType(file)) {
        this.toastr.error('Por favor, selecciona un archivo de imagen válido (JPG, PNG, GIF)');
        return;
      }

      if (!this.validateFileSize(file)) {
        this.toastr.error(`La imagen no debe superar los ${this.maxFileSize / (1024 * 1024)}MB`);
        return;
      }

      this.processSelectedFile(file);
    }
  }

  private validateFileType(file: File): boolean {
    const allowedTypes = ['image/jpeg', 'image/png', 'image/gif'];
    return allowedTypes.includes(file.type);
  }

  private validateFileSize(file: File): boolean {
    return file.size <= this.maxFileSize;
  }

  private processSelectedFile(file: File): void {
    this.selectedFile = file;
    const reader = new FileReader();
    
    reader.onload = (e: any) => {
      this.imagePreview = e.target.result;
      this.validateImageDimensions(file).then(isValid => {
        if (!isValid) {
          this.toastr.warning('La imagen debe tener al menos 400x300 píxeles');
        }
      });
    };
    
    reader.onerror = () => {
      this.toastr.error('Error al leer el archivo');
      this.resetFileInput();
    };

    reader.readAsDataURL(file);
  }

  onDragOver(event: DragEvent): void {
    event.preventDefault();
    event.stopPropagation();
    const dropZone = event.target as HTMLElement;
    dropZone.classList.add('dragover');
  }

  onDragLeave(event: DragEvent): void {
    event.preventDefault();
    event.stopPropagation();
    const dropZone = event.target as HTMLElement;
    dropZone.classList.remove('dragover');
  }

  onDrop(event: DragEvent): void {
    event.preventDefault();
    event.stopPropagation();
    const dropZone = event.target as HTMLElement;
    dropZone.classList.remove('dragover');

    const files = event.dataTransfer?.files;
    if (files?.length) {
      const file = files[0];
      if (this.validateFileType(file)) {
        this.onImageSelected({ target: { files: [file] } });
      } else {
        this.toastr.error('Por favor, arrastra solo archivos de imagen (JPG, PNG, GIF)');
      }
    }
  }

  removeImage(): void {
    this.resetFileInput();
    this.toastr.info('Imagen eliminada');
  }

  private resetFileInput(): void {
    this.imagePreview = null;
    this.selectedFile = null;
    if (this.fileInput?.nativeElement) {
      this.fileInput.nativeElement.value = '';
    }
  }

  async onSubmit(form: NgForm): Promise<void> {
    if (form.invalid) {
      this.toastr.error('Por favor, completa todos los campos requeridos');
      return;
    }

    if (!this.selectedFile) {
      this.toastr.error('Por favor, selecciona una imagen para el evento');
      return;
    }

    // Verificar token antes de continuar
    const token = localStorage.getItem('jwtToken');
    if (!token) {
      this.toastr.error('No hay sesión activa. Por favor, inicia sesión.');
      this.authService.logout();
      return;
    }

    if (this.authService.isTokenExpired()) {
      this.toastr.error('Tu sesión ha expirado. Por favor, inicia sesión nuevamente.');
      this.authService.logout();
      return;
    }

    try {
      this.isSubmitting = true;
      const formData = this.createFormData(form);

      // Debug logs
      console.log('Token being used:', token);
      console.log('Form data:', {
        name: form.value.eventName,
        description: form.value.eventDescription,
        date: form.value.eventDate,
        maxAttendees: form.value.maxAttendees,
        ticketPrice: form.value.ticketPrice
      });

      const response = await this.eventService.createEvent(formData).toPromise();
      console.log('Create event response:', response);
      
      this.toastr.success('Evento creado exitosamente');
      this.eventCreated.emit();
      this.closeEventCreator();
      
    } catch (error: any) {
      console.error('Error creating event:', error);
      if (error.status === 403) {
        this.toastr.error('No tienes permisos para crear eventos');
      } else {
        this.toastr.error(error.message || 'Error al crear el evento');
      }
    } finally {
      this.isSubmitting = false;
    }
  }

  private createFormData(form: NgForm): FormData {
  const formData = new FormData();
  
  if (this.selectedFile) {
    formData.append('image', this.selectedFile);
  }

  // Asegúrate de que los nombres coincidan con los @RequestParam del backend
  formData.append('name', form.value.eventName);
  formData.append('description', form.value.eventDescription);
  formData.append('date', form.value.eventDate);
  formData.append('maxAttendees', form.value.maxAttendees.toString());
  formData.append('ticketPrice', form.value.ticketPrice.toString());

  // Debug para verificar que se están enviando todos los campos


  return formData;
}

  validateImageDimensions(file: File): Promise<boolean> {
    return new Promise((resolve) => {
      const img = new Image();
      img.src = URL.createObjectURL(file);
      
      img.onload = () => {
        const minWidth = 400;
        const minHeight = 300;
        URL.revokeObjectURL(img.src);
        resolve(img.width >= minWidth && img.height >= minHeight);
      };
      
      img.onerror = () => {
        URL.revokeObjectURL(img.src);
        resolve(false);
      };
    });
  }

  getErrorMessage(fieldName: string, form: NgForm): string {
    const control = form.form.get(fieldName);
    if (control?.errors) {
      if (control.errors['required']) {
        return 'Este campo es requerido';
      }
      if (control.errors['minlength']) {
        return `Mínimo ${control.errors['minlength'].requiredLength} caracteres`;
      }
      if (control.errors['min']) {
        return `El valor mínimo es ${control.errors['min'].min}`;
      }
    }
    return '';
  }
}