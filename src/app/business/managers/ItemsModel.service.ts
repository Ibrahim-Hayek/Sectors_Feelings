import { result } from '../models/result';
import { Injectable } from '@angular/core';
import { IItemBase } from '../reprositories/IItemsModel';
import { SectorModel } from 'src/app/models/sectorModel';

@Injectable({
  providedIn: 'root',
})

export class SectorModelManager {

  constructor(private sectorModel: IItemBase) {
    this._sectorModel = sectorModel;
  }

  _sectorModel: IItemBase;

  async fetchSectors(): Promise<result<SectorModel | undefined>> {
    var output = new result<SectorModel | undefined>();
    output.result = await this._sectorModel.fetchSectors();
    return Promise.resolve<result<SectorModel | undefined>>(output);
  }

}
