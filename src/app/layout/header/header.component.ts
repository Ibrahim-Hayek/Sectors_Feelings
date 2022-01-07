import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { HelperService } from 'src/app/core/services/helper.service';
import { Lang } from 'src/app/core/enums/languages.enum';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  constructor(
    private translate: TranslateService,
    private helperService: HelperService
  ) { }

  languages = [
    {
      img: 'assets/images/englishFlag.png',
      label: 'English',
      value: Lang.English,
    },
    {
      img: 'assets/images/swedenFlag.png',
      label: 'Swedish',
      value: Lang.Swedish,
    }
  ];
  language = '';

  @Output() navToggle: EventEmitter<any> = new EventEmitter();

  ngOnInit(): void {
    this.setDefaultLanguage();
  }

  toggleDrawer(): void {
    this.navToggle.emit(true)
  }

  changeLanguage(event: any): void {
    this.language = event.value;
    localStorage.setItem('currentLanguage', event.value);
    this.translate.use(event.value);
  }

  setDefaultLanguage(): void {
    this.language = this.helperService.getCurrentLanguage();
  }
}
