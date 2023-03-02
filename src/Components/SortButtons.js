import { useRef } from "react";
import { useContext } from "react";
import { BarContext } from "./BarContext";


const SortButtons = () => {

    const { shuffleBars, changeSpeed, speed, changeArrSize } = useContext(BarContext);
    const sizeRef = useRef(100);

    return (
        <>
            <div className="buttons-container">
                <div className="sliders">
                    <label htmlFor="speed">Speed</label>
                    <input type="range" className="slider" id="speed" min="10" step="10" onChange={(e) => { changeSpeed(e.target.value) }} value={speed} />
                    <label htmlFor="size">Size</label>
                    <input type="range" className="slider" id="size" min="20" max="400" step="20" onChange={(e) => {
                        sizeRef.current = e.target.value;
                        changeArrSize(sizeRef.current);

                    }} value={sizeRef.current} />
                </div>
                <div className="buttons">
                    <button >Merge Sort</button>
                    <button >Insertion Sort</button>
                    <button >Quick Sort</button>
                    <button >Bubble Sort</button>
                    <button >Selection Sort</button>
                    <button onClick={shuffleBars}>Shuffle</button>
                </div>
            </div>
        </>
    );
}

export default SortButtons;