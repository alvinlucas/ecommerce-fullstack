import { Component, OnInit } from '@angular/core';
import { Produit, ProduitService } from '../../services/produit.service';
import { CommonModule } from '@angular/common';
import {PanierService} from '../../services/panier.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
  standalone: true,
  imports: [CommonModule],
})
export class HomeComponent implements OnInit {
  produits: Produit[] = [];
  produitSelectionne: Produit | null = null;
  detailsVisible = false;


  constructor(private produitService: ProduitService, private panierService: PanierService
  ) {}

  ngOnInit(): void {
    this.produitService.getProduits().subscribe((data) => {
      this.produits = data;
    });
  }

  ajouterAuPanier(produit: Produit): void {
    this.panierService.ajouterProduit(produit);
    alert(`${produit.nom} ajouté au panier !`);
  }


  ouvrirDetails(produit: Produit) {
    this.produitSelectionne = produit;
    this.detailsVisible = true;
  }

  fermerDetails() {
    this.detailsVisible = false;
    this.produitSelectionne = null;
  }
}
