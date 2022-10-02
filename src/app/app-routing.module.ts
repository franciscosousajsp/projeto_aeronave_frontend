import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ConteudoTabelaComponent } from './components/conteudo-tabela/conteudo-tabela.component';
import { CreateAeronaveComponent } from './components/create-aeronave/create-aeronave.component';
import { DeleteAeronaveComponent } from './components/delete-aeronave/delete-aeronave.component';
import { UpdateAeronaveComponent } from './components/update-aeronave/update-aeronave.component';

const routes: Routes = [
  {
    path: '',
    component: ConteudoTabelaComponent
  },
  {
    path: 'create',
    component: CreateAeronaveComponent
  },
  
  {
    path: 'delete/:id',
    component: DeleteAeronaveComponent
  },
 
  {
    path: 'update/:id',
    component: UpdateAeronaveComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
