import { createContext, useEffect, useState } from "react";

export const BarContext = createContext();


const BarContextProvider = (props) => {
    const [bar, setBar] = useState([]);
    const [curr, setCurr] = useState("");
    const [arrSize, setArrSize] = useState(100);


    function shuffleBars() {
        setCurr("");
        let newBar = [];
        for (let i = 0; i < arrSize; i++) {
            newBar.push(i + 1);
        }
        setBar(newBar);
        for (let i = newBar.length - 1; i > 0; i--) {
            let j = Math.floor(Math.random() * (i + 1));
            let temp = newBar[i];
            newBar[i] = newBar[j];
            newBar[j] = temp;

        }
        setBar([...newBar]);
        enableButtons()

    }

    function delayIt(speed) {
        return new Promise(resolve => setTimeout(resolve, speed));
    }

    function changeArrSize(size) {
        setArrSize(size);
    }

    function colorBars(first, second) {
        const firstBar = document.querySelector(`.bar:nth-child(${first + 1})`);
        const secondBar = document.querySelector(`.bar:nth-child(${second + 1})`);

        firstBar.classList.add("red");
        secondBar.classList.add("yellow");
    }

    function deColorBars(first, second) {
        const firstBar = document.querySelector(`.bar:nth-child(${first + 1})`);
        const secondBar = document.querySelector(`.bar:nth-child(${second + 1})`);

        firstBar.classList.remove("red");
        secondBar.classList.remove("yellow");
    }

    function disableButtons() {
        const buttons = document.querySelectorAll(".buttons-container> *");
        buttons.forEach((button) => {
            button.disabled = true;
        })
    }

    function enableButtons() {
        const buttons = document.querySelectorAll(".buttons-container> *");
        buttons.forEach((button) => {
            button.disabled = false;
        })
    }

    async function sortComplete() {
        let audio = document.getElementById("sort-complete");
        audio.playbackRate = 0.4;
        audio.play();
        await delayIt(200);


        for (let i = 0; i < bar.length; i++) {
            document.querySelector(`.bar:nth-child(${i + 1})`).classList.remove("green");
            for (let j = i + 1; j < i + (15 * arrSize / 100); j++) {
                if (j < bar.length) {
                    const bar = document.querySelector(`.bar:nth-child(${j + 1})`);
                    bar.classList.add("green");
                }

            }
            await delayIt(1000 / arrSize);
        }
        setCurr("Finished");
        document.querySelector(".buttons-container> button:last-child").disabled = false;

    }

    async function selectionSort(speed) {
        setCurr("Selection");
        disableButtons()

        let newBar = [...bar];
        let minIndex = 0;
        for (let i = 0; i < newBar.length; i++) {
            minIndex = i;
            for (let j = i + 1; j < newBar.length; j++) {
                if (newBar[j] < newBar[minIndex]) {
                    minIndex = j;

                }
                colorBars(j, minIndex);
                await delayIt(101 - speed);
                deColorBars(j, minIndex);
            }
            let temp = newBar[i];
            newBar[i] = newBar[minIndex];
            newBar[minIndex] = temp;
            setBar([...newBar]);
        }

        sortComplete();
    }

    async function bubbleSort(speed) {
        setCurr("Bubble");
        disableButtons()

        let newBar = [...bar];
        for (const element of newBar) {
            for (let j = 0; j < newBar.length; j++) {
                if (newBar[j] > newBar[j + 1]) {
                    let temp = newBar[j];
                    newBar[j] = newBar[j + 1];
                    newBar[j + 1] = temp;
                    setBar([...newBar]);
                    colorBars(j, j + 1);
                    await delayIt(101 - speed);

                    deColorBars(j, j + 1);
                }
            }
        }

        sortComplete();

    }

    async function insertionSort(speed) {
        setCurr("Insertion");
        disableButtons()

        let newBar = [...bar];
        for (let i = 1; i < newBar.length; i++) {
            let key = newBar[i];
            let j = i - 1;
            while (j >= 0 && newBar[j] > key) {
                newBar[j + 1] = newBar[j];
                colorBars(i, j);
                await delayIt(101 - speed);
                deColorBars(i, j);
                j--;


            }
            newBar[j + 1] = key;
            setBar([...newBar]);
        }

        sortComplete();
    }

    async function mergeSort(speed) {
        setCurr("Merge");
        disableButtons()
        let sorted = await merge(bar, 0, speed);
        setBar([...sorted]);
        sortComplete();

    }

    async function merge(arr, start, speed) {
        if (arr.length <= 1) {
            return arr;
        }
        let leftStart = start;
        let rightStart = Math.floor(arr.length / 2) + start - 1;
        let mid = Math.floor(arr.length / 2);
        let left = await merge(arr.slice(0, mid), leftStart, speed);
        let right = await merge(arr.slice(mid), rightStart, speed);
        let ans = await mergeHelper(left, right, leftStart, rightStart, speed);
        let newBar = bar;
        for (let i = 0; i < ans.length; i++) {
            newBar[i + start] = ans[i];
        }
        setBar([...newBar]);
        return ans;
    }

    async function mergeHelper(left, right, leftStart, rightStart, speed) {
        let result = [];
        let leftIdx = 0;
        let rightIdx = 0;
        while (leftIdx < left.length && rightIdx < right.length) {
            if (left[leftIdx] < right[rightIdx]) {
                result.push(left[leftIdx]);
                leftIdx++;
                colorBars(leftStart + leftIdx, rightStart + rightIdx);
                await delayIt(101 - speed);
                deColorBars(leftStart + leftIdx, rightStart + rightIdx);
            } else {
                result.push(right[rightIdx]);
                rightIdx++;
                colorBars(leftStart + leftIdx, rightStart + rightIdx);

                await delayIt(101 - speed);
                deColorBars(leftStart + leftIdx, rightStart + rightIdx);
            }
        }


        return result.concat(left.slice(leftIdx)).concat(right.slice(rightIdx));

    }

    async function quickSort(speed) {
        setCurr("Quick");
        disableButtons()
        let sorted = await quick(bar, 0, bar.length - 1, speed);
        console.log(sorted);
        setBar([...sorted]);
        sortComplete();

    }

    async function quick(arr, start, end, speed) {
        if (start >= end) {
            return arr;
        }
        let pivot = arr[end];
        let pivotIdx = start;
        for (let i = start; i < end; i++) {
            if (arr[i] < pivot) {
                let temp = arr[i];
                arr[i] = arr[pivotIdx];
                arr[pivotIdx] = temp;
                colorBars(i, pivotIdx);
                await delayIt(101 - speed);
                deColorBars(i, pivotIdx);
                pivotIdx++;
            }
        }
        let temp = arr[end];
        arr[end] = arr[pivotIdx];
        arr[pivotIdx] = temp;
        colorBars(end, pivotIdx);

        await delayIt(101 - speed);
        deColorBars(end, pivotIdx);
        let left = await quick(arr, start, pivotIdx - 1, speed);
        let right = await quick(arr, pivotIdx + 1, end, speed);
        return left.concat(right);
    }


    useEffect(() => {
        shuffleBars();
    }, [arrSize]);

    return (
        <BarContext.Provider value={{ curr, bar, shuffleBars, selectionSort, bubbleSort, mergeSort, quickSort, insertionSort, changeArrSize, arrSize }}>
            {props.children}
        </BarContext.Provider>
    )
}

export default BarContextProvider;



