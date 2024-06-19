import "./SongList.css";
import astray from "../assets/audios/astrayinst.mp3";
import spacecart from "../assets/audios/spacecart.mp3";
import endstats from "../assets/audios/endstats.mp3";
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
    const [search, setSearch] = useState("");
    const songs: Song[] = [{
            id: 0,
            name: "Astray (Instrumental)", 
            author: "HippoBoi",
            description: "aaaa", 
            URL: astray
        }, {
            id: 1,
            name: "Space Cart",
            author: "HippoBoi",
            description: "cccc",
            URL: spacecart
        }, {
            id: 2,
            name: "End Stats",
            author: "HippoBoi",
            description: "bbbb",
            URL: endstats
        }
    ];
    const [songList, setSongList] = useState<Song[]>(songs);

    const changeSearch = (text: string) => {
        setSearch(text);
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