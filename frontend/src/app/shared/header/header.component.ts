import {Component, OnInit} from '@angular/core';
import {CommonModule} from '@angular/common';
import {Router, RouterModule} from '@angular/router';
import {AuthService} from '../../services/auth.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
  standalone: true,
  imports: [CommonModule, RouterModule],
})
export class HeaderComponent {

  constructor(public auth: AuthService, private router: Router) {}

  logout() {
    const confirmation = window.confirm("Voulez-vous vraiment vous déconnecter ?");
    if (confirmation) {
      this.auth.logout();
      this.router.navigate(['/']);
    }
  }

  get isLoggedIn(): boolean {
    return this.auth.isLoggedIn();
  }

}
