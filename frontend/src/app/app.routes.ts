import { Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import {PanierComponent} from './pages/panier/panier.component';
import {AuthComponent} from './pages/auth/auth.component';
import {CompteUtilisateurComponent} from './pages/compte-utilisateur/compte-utilisateur.component';

export const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'panier', component: PanierComponent },
  { path: 'auth', component: AuthComponent },
  { path: 'compte', component: CompteUtilisateurComponent }
];
