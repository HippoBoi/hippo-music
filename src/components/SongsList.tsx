import "./SongList.css";
import astray from "../assets/audios/astrayinst.mp3";
import spacecart from "../assets/audios/spacecart.mp3";
import endstats from "../assets/audios/endstats.mp3";
import AudioPlayer from "./AudioPlayer";

export interface Song {
    id: number;
    name: string;
    description: string;
    URL: string;
}

const SongsList = () => {
    const songs: Song[] = [{
            id: 0,
            name: "Astray (Instrumental)", 
            description: "aaaa", 
            URL: astray
        }, {
            id: 1,
            name: "Space Cart",
            description: "cccc",
            URL: spacecart
        }, {
            id: 2,
            name: "End Stats",
            description: "bbbb",
            URL: endstats
        }
    ];

    return (
        <div className="list">
            {songs.map((song) => (
                <div className="listItem" key={song.id}>
                    <AudioPlayer song={song} />
                </div>
            ))}
        </div>
    )
}

export default SongsList;