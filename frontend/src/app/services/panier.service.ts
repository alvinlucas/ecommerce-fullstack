import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Produit } from './produit.service';

@Injectable({
  providedIn: 'root'
})
export class PanierService {
  private produitsDansPanier: Produit[] = [];
  private panierSubject = new BehaviorSubject<Produit[]>([]);

  panier$ = this.panierSubject.asObservable();

  ajouterProduit(produit: Produit) {
    this.produitsDansPanier.push(produit);
    this.panierSubject.next([...this.produitsDansPanier]);
  }

  retirerProduit(index: number) {
    this.produitsDansPanier.splice(index, 1);
    this.panierSubject.next([...this.produitsDansPanier]);
  }

  viderPanier() {
    this.produitsDansPanier = [];
    this.panierSubject.next([]);
  }

  getProduits() {
    return [...this.produitsDansPanier];
  }

  getTotal() {
    return this.produitsDansPanier.reduce((total, p) => total + p.prix, 0);
  }
}
