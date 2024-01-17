export interface AppRootState {
  picture: PictureState;
}

export interface PictureState {
  picture: Picture[];
}
export interface Picture {
  _id: string;
  data: Buffer;
  contentType: string;
}
