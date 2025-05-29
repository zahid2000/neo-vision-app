import { Routes } from '@angular/router';

export const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: 'home', loadComponent: () => import('./components/home/home.component').then(m => m.HomeComponent) },
  { path: 'about', loadComponent: () => import('./components/about/about.component').then(m => m.AboutComponent) },
  { path: 'how-it-works', loadComponent: () => import('./components/how-it-works/how-it-works.component').then(m => m.HowItWorksComponent) },
  { path: 'references', loadComponent: () => import('./components/references/references.component').then(m => m.ReferencesComponent) },
  { path: 'contact', loadComponent: () => import('./components/contact/contact.component').then(m => m.ContactComponent) },
  { path: 'galery', loadComponent: () => import('./components/galery/galery.component').then(m => m.GaleryComponent) },
  { path: 'download-center', loadComponent: () => import('./components/download-center/download-center.component').then(m => m.DownloadCenterComponent) },
  { path: '**', redirectTo: 'home', pathMatch: 'full' },
];
