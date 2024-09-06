import { Routes } from '@angular/router';
import { ReadAllComponent } from './componentes/read-all/read-all.component';
import { FinalizadosComponent } from './componentes/finalizados/finalizados.component';
import { CreateComponent } from './componentes/create/create.component';
import { UpdateComponent } from './componentes/update/update.component';

export const routes: Routes = [
  {

    path: '',
    component: ReadAllComponent




  },

  {

    path: 'finalizados',
    component: FinalizadosComponent


  },

  {

    path: 'create',
    component: CreateComponent


  },

  {

    path: 'update/:id',
    component: UpdateComponent

  }




];
