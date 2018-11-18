import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {

  public profilePicUrl = 'https://avatars3.githubusercontent.com/u/720792?s=40&v=4';

  constructor() { }

  ngOnInit() {
  }

}
