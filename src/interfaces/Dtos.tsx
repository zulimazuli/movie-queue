export interface AddedItem {
  id?: string;
  url: string;
  userId: string;
}

export interface RemovedItem {
  itemId: string;
  userId: string;
}
