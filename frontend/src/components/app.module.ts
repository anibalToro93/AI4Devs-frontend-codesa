import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { AppComponent } from './app.component'; // Ajusta la ruta si es necesario
import { PositionComponent } from './components/Position/position.component';
import { DragDropModule } from '@angular/cdk/drag-drop'; // Importar DragDropModule

@NgModule({
  declarations: [
    AppComponent,
    PositionComponent // Declarar el componente
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    DragDropModule // Agregar DragDropModule aquí
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {}