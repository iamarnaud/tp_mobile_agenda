import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
  //{ path: '', loadChildren: './tabs/(tabs.module#TabsPageModule)' },
  { path: 'update', loadChildren: './update/update.module#UpdatePageModule' },
// { path: '', redirectTo: 'connexion', pathMatch: 'full' },
   { path: '', loadChildren: './connexion/connexion.module#ConnexionPageModule' },
   { path: 'app', loadChildren: './tabs/tabs.module#TabsPageModule' }

  
];
@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
