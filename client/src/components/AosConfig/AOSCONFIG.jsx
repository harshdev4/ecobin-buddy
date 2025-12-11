import { useEffect } from "react";
import AOS from 'aos';

const AosConfig = () => {
    useEffect(() => {
        AOS.init({
            offset: 10,
            duration: 800,
            once: true, 
        });
    }, []);

    return null
}

export default AosConfig
