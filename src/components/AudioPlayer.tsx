import { useRef, useState } from 'react';
import { Song } from './SongsList';
import "./AudioPlayer.css";

interface Props {
    song: Song;
}

const AudioPlayer = ({ song }: Props) => {
    const audioRef = useRef<HTMLAudioElement>(null);
    const [isPlaying, setPlaying] = useState(false);

    const togglePlay = () => {
        if (audioRef.current) {
            if (audioRef.current.paused) {
                audioRef.current.play();
                setPlaying(true);
            } 
            else {
                audioRef.current.pause();
                setPlaying(false);
            }
        }
    }

    return (
        <div className={"audio-player"}>
            <h2>{song.name}</h2>
            <audio ref={audioRef}>
                <source src={song.URL} type="audio/mp3" />
                No se pudo reproducir audio en este navegador.
            </audio>
            <button 
                className={"audio-player-button"}
                onClick={togglePlay}>
                {isPlaying ? "Pausa" : "Reproducir"}
            </button>
        </div>
    );
}

export default AudioPlayer
