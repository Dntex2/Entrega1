export interface Student {
    id?: string;           // ID del documento en Firebase (opcional)
    nombre: string;        // Nombre del estudiante
    rut: string;           // RUT del estudiante
    gmail: string;         // Email del estudiante
    semestre: string;      // Semestre en el que está el estudiante
    presente: boolean;     // Estado de asistencia del estudiante
  }
  