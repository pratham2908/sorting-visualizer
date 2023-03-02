import { useContext, useEffect } from "react";
import { BarContext } from "./BarContext";
import toast, { Toaster } from "react-hot-toast";



const BarContainer = () => {
    const { bar1, bar2, sort1, sort2, arrSize, selectionSort, insertionSort, bubbleSort, quickSort, mergeSort, comparison1, comparison2 } = useContext(BarContext);

    useEffect(() => {
        const containers = document.querySelectorAll(".bar-container");
        containers.forEach(container => {
            container.addEventListener("click", (e) => {
                containers.forEach(container => {
                    container.classList.remove("selected");
                })
                container.classList.add("selected");
            })
        })

        const buttons = document.querySelectorAll(".buttons-container button:not(button:last-of-type)");
        buttons.forEach(button => {
            button.addEventListener('click', () => {
                selectSort(button.innerHTML);
            })
        })

    }, [])

    function selectSort(sortName) {
        const selectedContainer = document.querySelector(".bar-container.selected");
        selectedContainer.lastElementChild.innerHTML = sortName;
    }

    function startSort() {
        const containers = document.querySelectorAll(".bar-container");

        containers.forEach(container => {
            container.classList.remove("selected");
        })
        const sort1Name = containers[0].lastElementChild.innerHTML;
        const sort2Name = containers[1].lastElementChild.innerHTML;
        if (sort1Name == "CHOOSE SORT" || sort2Name == "CHOOSE SORT") {
            toast.error((t) => (
                <span>
                    Select a sort for both containers
                    <button onClick={() => toast.dismiss(t.id)} style={{ "margin-left": 10, border: 0, cursor: "pointer", }}>
                        <i className="fa fa-close"></i>
                    </button>
                </span>
            ));
            return;
        } else if (sort1Name == sort2Name) {
            toast.error((t) => (
                <span>
                    Select different sorts for both containers
                    <button onClick={() => toast.dismiss(t.id)} style={{ "margin-left": 10, border: 0, cursor: "pointer", }}>
                        <i className="fa fa-close"></i>
                    </button>
                </span>
            ));
            return;
        }

        sort1.current = sort1Name;
        sort2.current = sort2Name;

        containers.forEach((container, index) => {
            const sortName = container.lastElementChild.innerHTML;
            const functionCall1 = sortName.split(' ')[0].substring(0, 1).toLowerCase() + sortName.split(' ')[0].substring(1) + sortName.split(' ')[1];
            eval(functionCall1 + `(${index + 1})`);
        })
    }



    return (
        <div className="bar-container-parent">
            <div className="bar-container selected">
                {bar1.map((bar, index) => (
                    <div style={{ height: `${bar * 100 / arrSize}%`, width: `${100 / arrSize}%` }} className="bar" key={index} data-value={bar}></div>))}
                <div className="comparison">Comparisons: {comparison1}</div>
                <div className="sort-name" >CHOOSE SORT</div>
            </div>
            <button className="start-button" onClick={(e) => { startSort() }}>START SORTING</button>
            <div className="bar-container">
                {bar2.map((bar, index) => (
                    <div style={{ height: `${bar * 100 / arrSize}%`, width: `${100 / arrSize}%` }} className="bar" key={index} data-value={bar}></div>))}
                <div className="comparison">Comparisons: {comparison2}</div>
                <div className="sort-name" >CHOOSE SORT</div>
            </div>
            <Toaster />
        </div>
    );
}

export default BarContainer;