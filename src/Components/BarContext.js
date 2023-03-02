import { createContext, useEffect, useState, useRef } from "react";
export const BarContext = createContext();


const BarContextProvider = (props) => {
    const [bar1, setBar1] = useState([]);
    const [bar2, setBar2] = useState([]);
    const [arrSize, setArrSize] = useState(100);
    const [speed, setSpeed] = useState(50);
    const [result1, setResult1] = useState(false);
    const [result2, setResult2] = useState(false);
    const time1 = useRef(2);
    const sort1 = useRef("Merge Sort");
    const sort2 = useRef("Bubble Sort");
    const time2 = useRef(1);
    const [comparison1, setComp1] = useState(0);
    const [comparison2, setComp2] = useState(0);
    const firstSound = useRef(false);

    const sound = document.getElementById('sort-complete');
    const sound2 = document.querySelector('audio:nth-of-type(2)');


    function shuffleBars() {
        let newBar = [];
        for (let i = 0; i < arrSize; i++) {
            newBar.push(i + 1);
        }
        for (let i = newBar.length - 1; i > 0; i--) {
            let j = Math.floor(Math.random() * (i + 1));
            let temp = newBar[i];
            newBar[i] = newBar[j];
            newBar[j] = temp;

        }
        setBar1([...newBar]);
        setBar2([...newBar]);

    }

    function changeSpeed(newSpeed) {
        setSpeed(newSpeed);
    }

    function delayIt() {
        return new Promise(resolve => setTimeout(resolve, 101 - speed));
    }

    function changeArrSize(size) {
        setArrSize(size);
    }

    function colorBars(first, second, value) {
        let whichBar = value == 1 ? ".bar-container:nth-child(1) " : ".bar-container:nth-child(3) "
        let firstColor = value == 1 ? "firstA" : "secondA";
        let secondColor = value == 1 ? "firstB" : "secondB";
        const firstBar = document.querySelector(`${whichBar} .bar:nth-child(${first + 1})`);
        const secondBar = document.querySelector(`${whichBar} .bar:nth-child(${second + 1})`);

        firstBar.classList.add(`${firstColor}`);
        secondBar.classList.add(`${secondColor}`);
    }

    function deColorBars(first, second, value) {
        let whichBar = value == 1 ? ".bar-container:nth-child(1) " : ".bar-container:nth-child(3) "
        let firstColor = value == 1 ? "firstA" : "secondA";
        let secondColor = value == 1 ? "firstB" : "secondB";
        const firstBar = document.querySelector(`${whichBar} .bar:nth-child(${first + 1})`);
        const secondBar = document.querySelector(`${whichBar} .bar:nth-child(${second + 1})`);

        firstBar.classList.remove(`${firstColor}`);
        secondBar.classList.remove(`${secondColor}`);
    }

    async function sortComplete(value, startTime) {

        const newDuration = (101 - speed) * arrSize / (sound.duration * 100);
        const newPlayBackRate = sound.duration / newDuration;

        let whichSound = sound;
        if (firstSound.current) {
            whichSound = sound2;
        } else {
            firstSound.current = true;
        }
        whichSound.playbackRate = newPlayBackRate < 0.065 ? 0.065 : newPlayBackRate;
        whichSound.play();
        const endTime = performance.now();

        let whichBar = value == 1 ? ".bar-container:nth-child(1) " : ".bar-container:nth-child(3) "
        for (let i = 0; i < bar1.length; i++) {
            document.querySelector(`${whichBar}  .bar:nth-child(${i + 1})`).classList.remove("green");

            for (let j = i + 1; j < i + (15 * arrSize / 100); j++) {
                if (j < bar1.length) {
                    const bar = document.querySelector(`${whichBar}  .bar:nth-child(${j + 1})`);
                    bar.classList.add("green");
                }

            }
            await delayIt();
        }
        if (value == 1) {
            setResult1(true);
            time1.current = ((endTime - startTime) / 1000).toFixed(2) * 1;         // *1 is used to convert the result to number from string(implicit type conversion)
        } else {
            time2.current = ((endTime - startTime) / 1000).toFixed(2) * 1;         // *1 is used to convert the result to number from string(implicit type conversion)
            setResult2(true);

        }

        whichSound.load();
    }

    function disableButtons() {
        const buttons = document.querySelectorAll(".buttons-container button, .buttons-container input, .start-button");
        buttons.forEach((button) => {
            button.disabled = true;
        })
    }

    async function selectionSort(value) {
        disableButtons();
        let startTime = performance.now();
        let { bar, setBar, setComp } = identifyBars(value);
        let newBar = [...bar];
        let minIndex = 0;
        for (let i = 0; i < newBar.length; i++) {
            minIndex = i;
            for (let j = i + 1; j < newBar.length; j++) {
                if (newBar[j] < newBar[minIndex]) {
                    minIndex = j;
                }

                eval(setComp + `((prev) => prev + 1)`);
                colorBars(j, minIndex, value);
                await delayIt();
                deColorBars(j, minIndex, value);
            }
            let temp = newBar[i];
            newBar[i] = newBar[minIndex];
            newBar[minIndex] = temp;
            eval(setBar + "([...newBar])");
        }


        sortComplete(value, startTime);

    }

    async function bubbleSort(value) {
        disableButtons()

        let startTime = performance.now();
        let { bar, setBar, setComp } = identifyBars(value);
        let newBar = [...bar];
        for (const element of newBar) {
            for (let j = 0; j < newBar.length; j++) {
                if (newBar[j] > newBar[j + 1]) {
                    let temp = newBar[j];
                    newBar[j] = newBar[j + 1];
                    newBar[j + 1] = temp;
                    eval(setBar + "([...newBar])")
                    colorBars(j, j + 1, value);
                    await delayIt();
                    deColorBars(j, j + 1, value);
                }

                eval(setComp + `((prev) => prev + 1)`);

            }

        }

        sortComplete(value, startTime);

    }

    async function insertionSort(value) {
        disableButtons()

        let startTime = performance.now();

        let { bar, setBar, setComp } = identifyBars(value);
        let newBar = [...bar];
        for (let i = 1; i < newBar.length; i++) {
            let key = newBar[i];
            let j = i - 1;
            while (j >= 0 && newBar[j] > key) {
                newBar[j + 1] = newBar[j];
                colorBars(i, j, value);
                await delayIt();
                deColorBars(i, j, value);
                j--;
                eval(setComp + `((prev) => prev + 1)`);
            }
            newBar[j + 1] = key;
            eval(setBar + "([...newBar])");
        }

        sortComplete(value, startTime);
    }

    async function mergeSort(value) {
        disableButtons()
        let startTime = performance.now();
        let { bar, setBar, setComp } = identifyBars(value);
        let sorted = await merge(bar, 0, setBar, value, bar, setComp);
        eval(setBar + "([...sorted])");
        sortComplete(value, startTime);

    }

    async function merge(arr, start, setBar, value, bar, setComp) {

        if (arr.length <= 1) {
            return arr;
        }
        let leftStart = start;
        let rightStart = Math.floor(arr.length / 2) + start;
        let mid = arr.length % 2 == 0 ? arr.length / 2 : arr.length / 2 + 1;
        let left = await merge(arr.slice(0, mid), leftStart, setBar, value, bar, setComp);
        let right = await merge(arr.slice(mid), rightStart, setBar, value, bar, setComp);
        let ans = await mergeHelper(left, right, leftStart, rightStart, value, setComp);
        let newBar = bar;

        for (let i = 0; i < ans.length; i++) {
            newBar[i + start] = ans[i];
        }

        eval(setBar + "([...newBar])");
        return ans;
    }

    async function mergeHelper(left, right, leftStart, rightStart, value, setComp) {
        let result = [];
        let leftIdx = 0;
        let rightIdx = 0;
        while (leftIdx < left.length && rightIdx < right.length) {
            if (left[leftIdx] < right[rightIdx]) {
                result.push(left[leftIdx]);
                leftIdx++;
                colorBars(leftStart + leftIdx, rightStart + rightIdx - 1, value);
                await delayIt();
                deColorBars(leftStart + leftIdx, rightStart + rightIdx - 1, value);
            } else {
                result.push(right[rightIdx]);
                rightIdx++;
                colorBars(leftStart + leftIdx, rightStart + rightIdx - 1, value);
                await delayIt();
                deColorBars(leftStart + leftIdx, rightStart + rightIdx - 1, value);

            }

            eval(setComp + `((prev) => prev + 1)`);

        }


        return result.concat(left.slice(leftIdx)).concat(right.slice(rightIdx));

    }

    async function quickSort(value) {
        let startTime = performance.now();
        disableButtons()
        let { bar, setBar, setComp } = identifyBars(value);
        await quick(bar, 0, bar.length - 1, setBar, value, setComp);
        sortComplete(value, startTime);

    }

    async function quick(arr, start, end, setBar, value, setComp) {
        if (start >= end) {
            return arr;
        }
        let pivot = arr[end];
        let pivotIdx = start - 1;
        for (let i = start; i <= end; i++) {
            if (arr[i] <= pivot) {
                let temp = arr[i];
                arr[i] = arr[++pivotIdx];
                arr[pivotIdx] = temp;
                colorBars(i, pivotIdx, value);
                await delayIt();
                deColorBars(i, pivotIdx, value);
            }

            eval(setComp + `((prev) => prev + 1)`);
            eval(setBar + "([...arr])");
        }

        await delayIt();
        await quick(arr, start, pivotIdx - 1, setBar, value, setComp);
        await quick(arr, pivotIdx + 1, end, setBar, value, setComp);
    }

    function identifyBars(value) {
        let bar = value == 1 ? bar1 : bar2;
        let setBar = value == 1 ? "setBar1" : "setBar2";
        let setComp = value == 1 ? "setComp1" : "setComp2";
        return { bar, setBar, setComp };
    }


    useEffect(() => {
        shuffleBars();
    }, [arrSize]);

    return (
        <BarContext.Provider value={{ time1, time2, sort1, sort2, result1, result2, bar1, bar2, changeSpeed, selectionSort, insertionSort, bubbleSort, mergeSort, quickSort, shuffleBars, speed, changeArrSize, arrSize, comparison1, comparison2 }}>
            {props.children}
        </BarContext.Provider>
    )
}

export default BarContextProvider;



