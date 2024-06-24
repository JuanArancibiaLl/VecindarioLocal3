/*import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})
export class HomePage implements OnInit {
user: any;

  constructor() { }

  ngOnInit() {
  }

}*/

import { Component, OnInit } from '@angular/core';
import { FirebaseService } from 'src/app/services/firebase.service';
import { User } from 'src/app/models/user.model';

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})
export class HomePage implements OnInit {
  user: User | null = null;
  loading = true;
  showReviews = false;

  constructor(private firebaseService: FirebaseService) {}

  async ngOnInit() {
    const user = this.firebaseService.getCurrentUser();
    if (user) {
      const userData = await this.firebaseService.getDocument(
        `user/${user.uid}`
      );
      this.user = userData ? (userData as User) : null;
    }
    this.loading = false;
  }

  toggleReviews() {
    this.showReviews = !this.showReviews;
  }
}
