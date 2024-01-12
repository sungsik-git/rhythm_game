class Music {
    static id = 0;

    constructor(title, artist, thumbnailPath, musicPath, nodeFilePath){
        this.id = Music.id++;
        this.title = title;
        this.artist = artist;
        this.thumbnailPath = thumbnailPath;
        this.musicPath = musicPath;
        this.nodeFilePath = nodeFilePath;
    }
}

export default Music;
