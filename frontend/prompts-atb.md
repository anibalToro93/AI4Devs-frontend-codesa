### Prompt 1
###Anibal
como desarrollado experto en frontend con angular, tu meta es es crear la interfaz "position", 
una página en la que poder visualizar y gestionar los diferentes candidatos de una posición específica.
Se ha decidido que la interfaz sea tipo kanban, mostrando los candidatos como tarjetas en diferentes columnas que representan las fases del proceso de contratación,
 y pudiendo actualizar la fase en la que se encuentra un candidato solo arrastrando su tarjeta
Algunos de los requerimientos del equipo de diseño que se pueden ver en el ejemplo son:

1-Se debe mostrar el título de la posición en la parte superior, para dar contexto
2-Añadir una flecha a la izquierda del título que permita volver al listado de posiciones
3-Deben mostrarse tantas columnas como fases haya en el proceso
4-La tarjeta de cada candidato/a debe situarse en la fase correspondiente, y debe mostrar su nombre completo y su puntuación media
5-Si es posible, debe mostrarse adecuadamente en móvil (las fases en vertical ocupando todo el ancho)

Algunas observaciones:
1-Asume que la página de posiciones la encuentras 
2-Asume que existe la estructura global de la página, la cual incluye los elementos comunes como menú superior y footer. Lo que estás creando es el contenido interno de la página.

Para implementar la funcionalidad de la página cuentas con diversos endpoints API que ha preparado el equipo de backend:

GET /positions/:id/interviewFlow
Este endpoint devuelve información sobre el proceso de contratación para una determinada posición:

1-positionName: Título de la posición
2-interviewSteps: id y nombre de las diferentes fases de las que consta el proceso de contratación

la idea de la logica que implementes lo hagas dentro de la carpeta frontend y ten encuenta buenas practicas
de programación frontend, y no se te olvide guargar los prompts que generes dentro de prompts-atb.md

**Descripción**: Crear una interfaz tipo Kanban para gestionar candidatos de una posición específica.
**Requerimientos**:
1. Mostrar título de la posición.
2. Añadir flecha para volver al listado.
3. Mostrar columnas dinámicas según las fases.
4. Implementar arrastrar y soltar para actualizar fases.
5. Diseño responsive para móviles.

**Fecha**: 28/03/2025
Para implementar la interfaz "position" con las características descritas, aquí tienes un plan de acción y el código inicial para comenzar:

Plan de Acción
Estructura del Proyecto:

Crear un componente Angular llamado PositionComponent dentro de la carpeta frontend.
Asegurarse de que el componente se integre con la estructura global de la página.
Diseño del Kanban:

Utilizar una librería como Angular CDK Drag and Drop para implementar la funcionalidad de arrastrar y soltar.
Diseñar las columnas dinámicamente según las fases del proceso de contratación.
Consumo de API:

Usar el endpoint GET /positions/:id/interviewFlow para obtener los datos necesarios.
Mostrar el título de la posición y las fases con los candidatos.
Responsive Design:

Usar CSS Grid o Flexbox para adaptar las columnas en dispositivos móviles.
Guardar Prompts:

Documentar cada prompt generado en el archivo prompts-atb.md.
import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-position',
  templateUrl: './position.component.html',
  styleUrls: ['./position.component.css']
})
export class PositionComponent implements OnInit {
  positionName: string = '';
  interviewSteps: any[] = [];
  candidates: any[] = []; // Simulación de datos de candidatos

  constructor(private http: HttpClient) {}

  ngOnInit(): void {
    const positionId = 1; // Reemplazar con el ID dinámico
    this.http.get(`/positions/${positionId}/interviewFlow`).subscribe((data: any) => {
      this.positionName = data.positionName;
      this.interviewSteps = data.interviewSteps;
    });

    // Simulación de candidatos
    this.candidates = [
      { id: 1, name: 'John Doe', score: 85, stepId: 1 },
      { id: 2, name: 'Jane Smith', score: 90, stepId: 2 },
    ];
  }

  onDrop(event: any): void {
    // Lógica para manejar el cambio de fase
    console.log('Candidato movido:', event);
  }
}
3. Plantilla HTML
<div class="position-container">
  <button class="back-button" (click)="goBack()">←</button>
  <h1>{{ positionName }}</h1>

  <div class="kanban-board">
    <div
      class="kanban-column"
      *ngFor="let step of interviewSteps"
      cdkDropList
      (cdkDropListDropped)="onDrop($event)"
    >
      <h2>{{ step.name }}</h2>
      <div
        class="kanban-card"
        *ngFor="let candidate of candidates.filter(c => c.stepId === step.id)"
        cdkDrag
      >
        <p>{{ candidate.name }}</p>
        <p>Puntuación: {{ candidate.score }}</p>
      </div>
    </div>
  </div>
</div>

4. Estilos CSS
.position-container {
  padding: 20px;
}

.back-button {
  background: none;
  border: none;
  font-size: 18px;
  cursor: pointer;
}

.kanban-board {
  display: flex;
  gap: 20px;
  overflow-x: auto;
}

.kanban-column {
  flex: 1;
  min-width: 200px;
  background: #f4f4f4;
  padding: 10px;
  border-radius: 8px;
}

.kanban-card {
  background: #fff;
  padding: 10px;
  margin-bottom: 10px;
  border-radius: 4px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  cursor: grab;
}

### Prompt 2
anibalToro93
ahora se puede seguir con los siguientes metodos GET /positions/:id/candidates Este endpoint devuelve todos los candidatos en proceso para una determinada posición, es decir, todas las aplicaciones para un determinado positionID. Proporciona la siguiente información:

name: Nombre completo del candidato current_interview_step: en qué fase del proceso está el candidato. score: La puntuación media del candidato

PUT /candidates/:id/stage Este endpoint actualiza la etapa del candidato movido. Permite modificar la fase actual del proceso de entrevista en la que se encuentra un candidato específico, a través del parámetro "new_interview_step" y proporionando el interview_step_id correspondiente a la columna en la cual se encuentra ahora el candidato.

GitHub Copilot
**Descripción**: Integrar los endpoints para gestionar candidatos en la interfaz Kanban.

Para integrar los nuevos endpoints en el componente PositionComponent, se pueden implementar los siguientes cambios:

Actualización del Componente
1. Consumir el Endpoint GET /positions/:id/candidates
Este método se usará para obtener la lista de candidatos desde el backend.

2. Implementar el Endpoint PUT /candidates/:id/stage
Este método se usará para actualizar la fase del candidato cuando se mueva de una columna a otra.
**Endpoints**:
1. `GET /positions/:id/candidates`: Obtener la lista de candidatos.
2. `PUT /candidates/:id/stage`: Actualizar la fase del candidato.

**Requerimientos**:
1. Cargar dinámicamente los candidatos desde el backend.
2. Actualizar la fase del candidato al moverlo entre columnas.

**Fecha**: 28/03/2025