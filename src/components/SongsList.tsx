import "./SongList.css";
import astray from "../assets/audios/astrayinst.mp3";
import spacecart from "../assets/audios/spacecart.mp3";
import endstats from "../assets/audios/endstats.mp3";
import sandtomb from "../assets/audios/sandtomb.mp3";
import AudioPlayer from "./AudioPlayer";
import SearchBar from "./SearchBar";
import { useState } from "react";

export interface Song {
    id: number;
    name: string;
    author: string;
    description: string;
    URL: string;
}

const SongsList = () => {
    const songs: Song[] = [{
            id: 0,
            name: "Astray (Instrumental)", 
            author: "HippoBoi",
            description: "This is the third iteration of this song I've made. The first one was composed for a FNF mod I've been contributing to for the last two years lol.", 
            URL: astray
        }, {
            id: 1,
            name: "Space Cart",
            author: "HippoBoi",
            description: "This song was composed for a game I'm developing with my girlfriend helping me with some designs. The game is heavily inspired by the Metroid Prime series, however this song is supposed to play on a minigame of some sort.",
            URL: spacecart
        }, {
            id: 2,
            name: "End Stats",
            author: "HippoBoi",
            description: "I often forget I made this song because it was only used for a Roblox game I made a while ago. The song is pretty hidden too, as it plays literally at the end of it.",
            URL: endstats
        }, {
            id: 3,
            name: "Sand Tomb",
            author: "HippoBoi",
            description: "I composed this song for a PvZ fangame I made. I'm pretty proud of it! I've always liked desert-like music. No idea how it's officialy named tho.",
            URL: sandtomb
        }
    ];
    const [songList, setSongList] = useState<Song[]>(songs);

    const changeSearch = (text: string) => {
        setSongList(songs.filter(song => song.name.toLowerCase().includes(text)));
    }

    return (
        <div className="list">
            <SearchBar onSearch={changeSearch} />
            {songList.map((song) => (
                <div className="listItem" key={song.id}>
                    <AudioPlayer song={song} />
                </div>
            ))}
        </div>
    )
}

export default SongsList;