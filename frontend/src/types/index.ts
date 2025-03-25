export interface ISong {
  _id: string;
  title: string;
  artist: string;
  imageUrl: string;
  audioUrl: string;
  duration: number;
  albumId?: string | null;
  createdAt: string;
  updatedAt: string;
}

export interface IAlbum {
  _id: string;
  title: string;
  artist: string;
  imageUrl: string;
  releaseYear: number;
  songs: ISong[];
}

export interface IStats {
  totalSongs: number;
  totalAlbums: number;
  totalUsers: number;
  totalArtists: number;
}
