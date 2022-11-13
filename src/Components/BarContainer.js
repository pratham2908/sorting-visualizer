import { useContext } from "react";
import { BarContext } from "./BarContext";


const BarContainer = () => {
    const { bar, arrSize } = useContext(BarContext);
    return (
        <div className="bar-container">
            {bar.map((bar, index) => (
                <div style={{ height: `${bar * 100 / arrSize}%`, width: `${100 / arrSize}%` }} className="bar" key={index} data-value={bar}></div>))}
        </div>
    );
}

export default BarContainer;