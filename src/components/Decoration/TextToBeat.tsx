import { useEffect, useState } from 'react'
import "./Beat.css"

interface Props {
    text: string;
    BPM: number;
}

const TextToBeat = ({ text, BPM }: Props) => {
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
        <h2 className='text-beat' style={{ transform: `scale(${scale})` }}>
            {text}
        </h2>
    );
}

export default TextToBeat
