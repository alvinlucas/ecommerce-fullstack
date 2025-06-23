import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-compte-utilisateur',
  standalone: true,
  imports: [CommonModule, FormsModule],
  styleUrls: ['./compte-utilisateur.component.scss'],
  templateUrl: './compte-utilisateur.component.html',
})
export class CompteUtilisateurComponent implements OnInit {
  utilisateur: any = {};
  commandes: any[] = [];

  constructor(private auth: AuthService, private http: HttpClient) {}

  ngOnInit() {
    const nom = this.auth.getUserNom();
    if (!nom) return;

    this.http.get(`http://localhost:3000/utilisateurs/nom/${nom}`).subscribe((data: any) => {
      this.utilisateur = data;
      this.chargerCommandes(data.id);
    });
  }

  mettreAJourInfos() {
    this.http.put(`http://localhost:3000/utilisateurs/${this.utilisateur.id}`, this.utilisateur)
      .subscribe(() => alert("Informations mises à jour"));
  }

  chargerCommandes(utilisateurId: number) {
    this.http.get<any[]>(`http://localhost:3000/commandes/utilisateur/${utilisateurId}`)
      .subscribe(data => this.commandes = data);
  }
}
