import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PanierService } from '../../services/panier.service';
import { Produit } from '../../services/produit.service';

@Component({
  selector: 'app-panier',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './panier.component.html',
  styleUrls: ['./panier.component.scss']
})
export class PanierComponent implements OnInit {
  produits: Produit[] = [];

  constructor(private panierService: PanierService) {}

  ngOnInit(): void {
    this.panierService.panier$.subscribe((data) => {
      this.produits = data;
    });
  }

  retirer(index: number) {
    this.panierService.retirerProduit(index);
  }

  vider() {
    this.panierService.viderPanier();
  }

  total(): string {
    const total = this.produits.reduce((acc, p) => acc + Number(p.prix), 0);
    return total.toFixed(2).replace('.', ',');
  }


}
