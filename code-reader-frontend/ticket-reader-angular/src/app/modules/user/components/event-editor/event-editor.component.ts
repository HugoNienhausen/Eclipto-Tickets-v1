import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, NgForm } from '@angular/forms';
import { EventService } from '../../../../shared/services/event.service';
import { environment } from '../../../../../environments/environment';
@Component({
  selector: 'app-event-editor',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './event-editor.component.html',
  styleUrls: ['./event-editor.component.css']
})
export class EventEditorComponent {
  @Input() event: any;
  @Output() close = new EventEmitter<void>();
  @Output() eventUpdated = new EventEmitter<void>();

  imagePreview: string | null = null;
  selectedFile: File | null = null;
  isSubmitting = false;
  errorMessage = '';

  constructor(private eventService: EventService) {}

  ngOnInit() {
    if (this.event?.imageUrl) {
      this.imagePreview = `${environment.apiUrl}${this.event.imageUrl}`;
    }
  }

  onImageSelected(event: any): void {
    const file = event.target.files[0];
    if (file) {
      this.selectedFile = file;
      const reader = new FileReader();
      reader.onload = () => {
        this.imagePreview = reader.result as string;
      };
      reader.readAsDataURL(file);
    }
  }

  onSubmit(form: NgForm): void {
    if (form.valid && !this.isSubmitting) {
      this.isSubmitting = true;
      
      const formData = new FormData();
      
      // Log de la imagen actual y nueva
      console.log('Imagen actual:', this.event.imageUrl);
      console.log('Nueva imagen seleccionada:', this.selectedFile);
      
      if (this.selectedFile) {
        formData.append('image', this.selectedFile);
        console.log('Añadiendo nueva imagen al FormData');
      }
      
      formData.append('name', form.value.eventName);
      formData.append('description', form.value.eventDescription);
      formData.append('date', form.value.eventDate);
      formData.append('maxAttendees', form.value.maxAttendees);
      formData.append('ticketPrice', form.value.ticketPrice);
      
      console.log('FormData enviado:', {
        name: form.value.eventName,
        description: form.value.eventDescription,
        date: form.value.eventDate,
        hasImage: !!this.selectedFile
      });
      
      this.eventService.updateEvent(this.event.id, formData).subscribe({
        next: (response) => {
          console.log('Respuesta del servidor:', response);
          this.eventUpdated.emit();
          this.close.emit();
        },
        error: (error) => {
          console.error('Error al actualizar el evento:', error);
          this.isSubmitting = false;
        }
      });
    }
  }

  private createFormData(form: NgForm): FormData {
    const formData = new FormData();
    
    // Añadir la imagen si se seleccionó una nueva
    if (this.selectedFile) {
      formData.append('image', this.selectedFile);
    }
  
    // Añadir el resto de campos del formulario
    formData.append('name', this.event.name);
    formData.append('description', this.event.description);
    formData.append('date', this.event.date);
    formData.append('maxAttendees', this.event.maxAttendees.toString());
    formData.append('ticketPrice', this.event.ticketPrice.toString());
  
    return formData;
  }
}