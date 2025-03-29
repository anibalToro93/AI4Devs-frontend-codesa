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
  candidates: any[] = [];

  constructor(private http: HttpClient) {}

  ngOnInit(): void {
    const positionId = 1; // Reemplazar con el ID dinámico
    this.loadPositionData(positionId);
    this.loadCandidates(positionId);
  }

  loadPositionData(positionId: number): void {
    this.http.get(`/positions/${positionId}/interviewFlow`).subscribe(
      (data: any) => {
        console.log('Datos de la posición:', data);
        this.positionName = data.positionName;
        this.interviewSteps = data.interviewSteps;
      },
      (error) => {
        console.error('Error al cargar los datos de la posición:', error);
      }
    );
  }

  loadCandidates(positionId: number): void {
    this.http.get(`/positions/${positionId}/candidates`).subscribe(
      (data: any) => {
        console.log('Datos de los candidatos:', data);
        this.candidates = data.map((candidate: any) => ({
          id: candidate.id,
          name: candidate.name,
          score: candidate.score,
          stepId: candidate.current_interview_step
        }));
      },
      (error) => {
        console.error('Error al cargar los candidatos:', error);
      }
    );
  }

  onDrop(event: any, newStepId: number): void {
    console.log('Evento de arrastre:', event);
    const candidateId = event.item.data.id;
    this.http.put(`/candidates/${candidateId}/stage`, { new_interview_step: newStepId }).subscribe(
      () => {
        const candidate = this.candidates.find(c => c.id === candidateId);
        if (candidate) {
          candidate.stepId = newStepId;
        }
      },
      (error) => {
        console.error('Error al actualizar la fase del candidato:', error);
      }
    );
  }
}