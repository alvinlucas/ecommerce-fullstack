import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AuthService } from '../../services/auth.service';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  standalone: true,
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.scss'],
  imports: [CommonModule, FormsModule],
})
export class AuthComponent {
  isLogin = true;
  email = '';
  password = '';
  nom = '';
  prenom = '';
  message = '';
  erreur = '';

  constructor(private auth: AuthService, private router: Router) {}

  toggle() {
    this.isLogin = !this.isLogin;
    this.message = '';
    this.erreur = '';
  }

  submit() {
    this.message = '';
    this.erreur = '';

    if (this.isLogin) {
      this.auth.login(this.email, this.password).subscribe({
        next: () => {
          this.message = "Connexion réussie.";
          this.router.navigate(['/compte']);
        },
        error: (err) => {
          this.erreur = err.error?.error || "Erreur lors de la connexion";
        }
      });
    } else {
      this.auth.register({
        email: this.email,
        password: this.password,
        nom: this.nom,
        prenom: this.prenom
      }).subscribe({
        next: (res: any) => {
          this.message = res.message || "Inscription réussie.";
          this.toggle();
        },
        error: (err) => {
          this.erreur = err.error?.error || "Erreur lors de l'inscription";
        }
      });
    }
  }
}
