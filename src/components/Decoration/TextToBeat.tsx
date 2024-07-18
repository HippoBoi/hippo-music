import { useEffect, useRef, useState } from 'react'
import "./Beat.css"

interface Props {
    text: string;
    BPM: number;
}

const TextToBeat = ({ text, BPM }: Props) => {
    const [scale, setScale] = useState(1);
    const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null); // store interval value
    
    useEffect(() => {
        if (BPM > 0) {
            const beatTime = (60 / BPM) * 1000;
            const beatAnim = () => {
                setScale((prevScale) => prevScale === 1 ? 1.1 : 1);
            };

            intervalRef.current = setInterval(beatAnim, beatTime);
        }
        else if (intervalRef.current) {
            console.log("song paused")
            clearInterval(intervalRef.current);
            intervalRef.current = null;
        }

        return () => {
            if (intervalRef.current)
                clearInterval(intervalRef.current);
        };
    }, [BPM])
    
    return (
        <h2 className='text-beat' style={{ transform: `scale(${scale})` }}>
            {text}
        </h2>
    );
}

export default TextToBeat
