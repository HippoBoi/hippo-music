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
    const [expanded, setExpanded] = useState(false);
    const [isMobile, setIsMobile] = useState(false);
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
                setExpanded(true);
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
    useEffect(() => {
        const handleResize = () => {
            setIsMobile(window.innerWidth <= 768);
        };

        handleResize();
        window.addEventListener('resize', handleResize);

        return () => {
            window.removeEventListener('resize', handleResize);
        };
    })

    return (
        <div className={`audio-player ${expanded ? "expanded" : ""} ${isMobile ? "mobile" : ""}`}>
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

            <div className='description'>
                <p className='description-title'>Description</p>
                <p>{song.description}</p>
                <button onClick={() => setExpanded(false)}>Close</button>
            </div>
        </div>
    );
}

export default AudioPlayer
