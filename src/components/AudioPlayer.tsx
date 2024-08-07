import React, { useEffect, useRef, useState } from 'react';
import { Song } from './SongsList';
import playButton from "../assets/images/playbutton.png";
import pauseButton from "../assets/images/pausebutton.png";
import audioIcon from "../assets/images/audio.png";
import playBW from "../assets/images/playb&w.webp";
import "./AudioPlayer.css";
import BeatSync from './Decoration/BeatSync';
import TextToBeat from './Decoration/TextToBeat';

interface Props {
    song: Song;
}

const AudioPlayer = ({ song }: Props) => {
    const [currentBPM, setBPM] = useState(0);
    const audioRef = useRef<HTMLAudioElement>(null);
    const [expanded, setExpanded] = useState(false);
    const [isMobile, setIsMobile] = useState(false);
    const [isPlaying, setPlaying] = useState(false);
    const [progress, setProgress] = useState(0);
    const [songTime, setSongTime] = useState(0);
    const [songLength, setSongLength] = useState(0);
    const [volume, setVolume] = useState(0);
    const [buttonImg, setButtonImg] = useState(playButton);

    const togglePlay = () => {
        if (audioRef.current) {
            if (audioRef.current.paused) {
                audioRef.current.play();
                setBPM(song.BPM);
                setPlaying(true);
                setExpanded(true);
                setButtonImg(pauseButton);
            } 
            else {
                audioRef.current.pause();
                setBPM(0); // not exactly 0 'cause would produce division by 0
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
            setVolume((audioRef.current.volume / 1) * 100);
        }
    };
    const onSongEnd = () => {
        setPlaying(false);
        setBPM(0);
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
    const onVolumeClick = (event: React.MouseEvent<HTMLDivElement>) => {
        if (audioRef.current) {
            const volumeContainer = event.currentTarget;
            const rect = volumeContainer.getBoundingClientRect();
            const offsetX = event.clientX - rect.left;
            const newVolume = (offsetX / rect.width) * 1;
            audioRef.current.volume = newVolume;
            console.log(newVolume);
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
            <TextToBeat text={song.name} BPM={currentBPM} />

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

            <div className='progress'>
                <img 
                    className='play-icon'
                    src={playBW}
                    alt="Audio Icon" />
                
                <div className='progress-bar-container' onClick={onBarClick}>
                    <div 
                        className="progress-bar"
                        style={{ width: `${progress}%` }}>
                    </div>
                </div>

                <div className='volume'>
                    <img 
                        className='audio-icon'
                        src={audioIcon}
                        alt="Audio Icon" />

                    <div className='volume-container' onClick={onVolumeClick}>
                        <div 
                            className="volume-bar"
                            style={{ width: `${volume}%` }}>
                        </div>
                </div>
            </div>
            </div>

            <div className='time-container'>
                <span>
                    {formatTime(songTime) + " / " + formatTime(songLength)}
                </span>
            </div>
            <div className='transparent-text'>
                <span>
                    {`BPM: ${song.BPM}`}
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
