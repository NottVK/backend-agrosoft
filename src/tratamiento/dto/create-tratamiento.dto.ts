export class CreateTratamientoDto {
  id_insumo: number;
  cantidad_sugerida: number;
  tipo_tratamiento: string;
  id_usuario: number;
  descripcion?: string;
  fecha_aplicacion_tratamiento: string; // Se recibe como string y se guarda como Date
  cantidad_usada: number;
}