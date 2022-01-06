
import { Injectable } from '@angular/core';
import { HelperService } from 'src/app/core/services/helper.service';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';
import { SectorModel } from 'src/app/models/sectorModel';
import { IItemBase } from '../reprositories/IItemsModel';

@Injectable()
export class ItemsService implements IItemBase {

  constructor(
    private helperService: HelperService,
    private http: HttpClient
  ) {
  }

  baseUrl = environment.baseUrl;

  async fetchSectors(): Promise<SectorModel | undefined> {
    var _sectors: SectorModel | undefined;
    var url = `taxonomy/nace/node/10.00`;
    this.helperService.startLoader();
    await this.http.get<SectorModel>(this.baseUrl + url).toPromise().then(response => {
      _sectors = response;
      this.helperService.stopLoader();
    }, error => {
      console.log(error);
      this.helperService.stopLoader();
    });
    return Promise.resolve<SectorModel | undefined>(_sectors);
  }
}
