import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss']
})
export class FooterComponent implements OnInit {

  constructor() { }

  icons = [
    {
      cssClass: 'fb-ic',
      icon: 'facebook'
    },
    {
      cssClass: 'tw-ic',
      icon: 'twitter'
    },
    {
      cssClass: 'gplus-ic',
      icon: 'google-plus'
    },
    {
      cssClass: 'li-ic',
      icon: 'linkedin'
    },
    {
      cssClass: 'ins-ic',
      icon: 'instagram'
    },
    {
      cssClass: 'pin-ic',
      icon: 'pinterest'
    },
  ];

  ngOnInit(): void {
  }

}
