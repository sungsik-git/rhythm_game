class Music {
    static id = 0;

    constructor(title, artist, thumbnailPath, musicPath){
        this.id = Music.id++;
        this.title = title;
        this.artist = artist;
        this.thumbnailPath = thumbnailPath;
        this.musicPath = musicPath;
    }
}

export default Music;
