import { ItemModel } from './ItemModel';

export interface SectorModel {
    children: ItemModel[],
    node: ItemModel,
    parents: ItemModel[],
}