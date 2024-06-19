import React, { useEffect, useRef, useState } from 'react';
import { Song } from './SongsList';
import playButton from "../assets/images/playbutton.png";
import pauseButton from "../assets/images/pausebutton.png";
import "./AudioPlayer.css";

interface Props {
    song: Song;
}

const AudioPlayer = ({ song }: Props) => {
    const audioRef = useRef<HTMLAudioElement>(null);
    const [isPlaying, setPlaying] = useState(false);
    const [progress, setProgress] = useState(0);
    const [songTime, setSongTime] = useState(0);
    const [songLength, setSongLength] = useState(0);
    const [buttonImg, setButtonImg] = useState(playButton);

    const togglePlay = () => {
        if (audioRef.current) {
            if (audioRef.current.paused) {
                audioRef.current.play();
                setPlaying(true);
                setButtonImg(pauseButton);
            } 
            else {
                audioRef.current.pause();
                setPlaying(false);
                setButtonImg(playButton);
            }
        }
    }

    const updateProgress = () => {
        if (audioRef.current) {
            setProgress((audioRef.current.currentTime / audioRef.current.duration) * 100);
            setSongTime(audioRef.current.currentTime);
            setSongLength(audioRef.current.duration);
        }
    };
    const onSongEnd = () => {
        setPlaying(false);
        setButtonImg(playButton);
    }
    const onBarClick = (event: React.MouseEvent<HTMLDivElement>) => {
        if (audioRef.current) {
            const progressContainer = event.currentTarget;
            const rect = progressContainer.getBoundingClientRect();
            const offsetX = event.clientX - rect.left;
            const newProgress = (offsetX / rect.width) * audioRef.current.duration;
            audioRef.current.currentTime = newProgress;
            updateProgress();
        }
    }

    const formatTime = (time: number) => {
        const minutes = Math.floor(time / 60);
        const seconds = Math.floor(time % 60);
        return(`0${minutes}:${seconds < 10 ? "0" : ""}${seconds}`);
    }

    useEffect(() => {
        if (audioRef.current) {
            audioRef.current.addEventListener("timeupdate", updateProgress);
            audioRef.current.addEventListener("ended", onSongEnd);

            return () => {
                audioRef.current?.removeEventListener("timeupdate", updateProgress);
                audioRef.current?.removeEventListener("ended", onSongEnd);
            };
        }
    }, []);

    return (
        <div className="audio-player">
            <h2>{song.name}</h2>

            <audio ref={audioRef}>
                <source src={song.URL} type="audio/mp3" />
                No se pudo reproducir audio en este navegador.
            </audio>

            <button
                onClick={togglePlay}>
                <img 
                    className={isPlaying ? "pause-image" : "play-image"} 
                    src={buttonImg} />
            </button>

            <div className='progress-bar-container' onClick={onBarClick}>
                <div 
                    className="progress-bar"
                    style={{ width: `${progress}%` }}>
                </div>
            </div>

            <div className='time-container'>
                <span>
                    {formatTime(songTime) + " / " + formatTime(songLength)}
                </span>
            </div>
        </div>
    );
}

export default AudioPlayer
