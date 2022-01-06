import { Injectable } from '@angular/core';
import { ItemsService } from '../rest-apis/ItemsModel.service';
import { SectorModel } from 'src/app/models/sectorModel';

@Injectable({
    providedIn: 'root',
    useClass: ItemsService,
})
export abstract class IItemBase {
    abstract fetchSectors(): Promise<SectorModel | undefined>;
}
