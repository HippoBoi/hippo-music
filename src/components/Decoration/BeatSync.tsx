import { useEffect, useState } from 'react'
import "./Beat.css"

interface Props {
    BPM: number;
}

const BeatSync = ({ BPM }: Props) => {
    const [scale, setScale] = useState(1);
    
    useEffect(() => {
        if (BPM <= 0) return;

        const beatTime = (60 / BPM) * 1000;

        const beatAnim = () => {
            setScale((prevScale) => prevScale === 1 ? 1.25 : 1);
        };

        const beatInterval = setInterval(beatAnim, beatTime);

        return () => clearInterval(beatInterval);
    }, [BPM])

    return (
        <div className='beat-container' style={{ transform: `scale(${scale})` }}>
            
        </div>
    );
}

export default BeatSync;