import { useRef } from "react";
import { useContext, useState } from "react";
import { BarContext } from "./BarContext";


const SortButtons = () => {

    const { shuffleBars, selectionSort, bubbleSort, insertionSort, quickSort, curr, mergeSort, changeArrSize } = useContext(BarContext);
    const [speed, setSpeed] = useState(50);
    const sizeRef = useRef(100);


    const text = chooseText();

    function chooseText() {
        if (curr === "") {
            return "Start Sorting";
        }
        if (curr === "Finished") {
            return "Sorting Finished";
        } else {
            return `Sorting, ${curr} Sort...`;
        }
    }



    return (
        <>
            <audio id="sort-complete" src={require("../sounds/flagpole.wav")} ></audio>
            <div className="buttons-container">
                <label htmlFor="speed">Speed</label>
                <input type="range" className="slider" id="speed" min="10" onChange={(e) => { setSpeed(e.target.value) }} value={speed} />
                <label htmlFor="size">Size</label>
                <input type="range" className="slider" id="size" min="20" max="500" step="20" onChange={(e) => {
                    sizeRef.current = e.target.value;
                    changeArrSize(sizeRef.current);

                }} value={sizeRef.current} />
                <button onClick={() => { mergeSort(speed) }}>Merge Sort</button>
                <button onClick={() => { insertionSort(speed) }}>Insertion Sort</button>
                <button onClick={() => { quickSort(speed) }}>Quick Sort</button>
                <button onClick={() => { bubbleSort(speed) }}>Bubble Sort</button>
                <button onClick={() => { selectionSort(speed) }}>Selection Sort</button>
                <button onClick={shuffleBars}>Shuffle</button>
            </div>
            <h1>{text} </h1>
        </>
    );
}

export default SortButtons;