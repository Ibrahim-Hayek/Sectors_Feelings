import { Component, OnInit, Input } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})

export class AppComponent implements OnInit {

  constructor(
    private translateService: TranslateService,
    private route: ActivatedRoute,
  ) {
    this.translateService.setDefaultLang('en');
    this.translateService.use('en');
  }

  title = 'sectors-feelings';

  ngOnInit(): void {
    this.checkSavedLanguage();
  }

  checkSavedLanguage(): void {
    const localLanguage = localStorage.getItem('currentLanguage') || 'en';
    localStorage.setItem('currentLanguage', localLanguage);
    this.translateService.use(localLanguage);
  }
}
