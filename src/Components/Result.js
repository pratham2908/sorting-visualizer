import { useContext } from "react";
import { BarContext } from "./BarContext";
import { Line } from "react-chartjs-2";
import Chart from 'chart.js/auto';

const Result = () => {
    const { time1, time2, arrSize, sort1, sort2, comparison1, comparison2 } = useContext(BarContext);

    function fasterSort() {
        if (time1.current < time2.current) {
            return [sort1.current, sort2.current];
        } else {
            return [sort2.current, sort1.current];
        }
    }
    const dataSet = [[0, 140, 280, 420, 560, 700, 830, 950, 1060, 1160, 1250], [0, 100, 400, 900, 1600]];

    const chartData = {
        labels: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11],
        datasets: [
            {
                label: 'MERGE SORT',
                fill: false,
                borderColor: "blue",
                radius: 0,
                tension: 0.5,
                borderWidth: 4,
                backgroundColor: "blue",
                pointStyle: 'rectRounded',

            },
            {
                label: 'BUBBLE SORT',
                fill: false,
                borderColor: "red",
                tension: 0.4,
                radius: 0,
                borderWidth: 4,
                backgroundColor: "red",
                pointStyle: 'rectRounded',


            },
            {
                label: 'LINEAR (O(n))',
                data: [0, 40, 80, 120, 160, 200, 240, 280, 320, 360, 400],
                fill: false,
                borderColor: "black",
                tension: 0.2,
                radius: 0,
                borderWidth: 5,
                backgroundColor: "black",
                //shadow
                pointStyle: 'rectRounded',
            }
        ]
    }

    const sortData = {
        "Bubble Sort": {
            SpaceComplexity: "O(1)",
            BestCase: "O(n*logn)",
            AverageCase: "O(n^2)",
            WorstCase: "O(n^2)",
            Stable: "Yes",
            Method: "Exchanging"
        },
        "Selection Sort": {
            SpaceComplexity: "O(1)",
            BestCase: "O(n^2)",
            AverageCase: "O(n^2)",
            WorstCase: "O(n^2)",
            Stable: "No",
            Method: "Selection"
        },
        "Insertion Sort": {
            SpaceComplexity: "O(1)",
            BestCase: "O(n*logn)",
            AverageCase: "O(n^2)",
            WorstCase: "O(n^2)",
            Stable: "Yes",
            Method: "Insertion"
        },

        "Merge Sort": {
            SpaceComplexity: "O(n)",
            BestCase: "O(nlogn)",
            AverageCase: "O(nlogn)",
            WorstCase: "O(nlogn)",
            Stable: "Yes",
            Method: "Divide and Conquer"
        },

        "Quick Sort": {
            SpaceComplexity: "O(logn)",
            BestCase: "O(nlogn)",
            AverageCase: "O(nlogn)",
            WorstCase: "O(n^2)",
            Stable: "No",
            Method: "Divide and Conquer"
        }
    }

    const sort1Data = sortData[sort1.current];
    const sort2Data = sortData[sort2.current];

    chartData.datasets[0].label = sort1.current + ` (${sort1Data.AverageCase}) `;
    chartData.datasets[0].data = sort1.current === "Quick Sort" || sort1.current === "Merge Sort" ? dataSet[0] : dataSet[1];
    chartData.datasets[1].label = sort2.current + ` (${sort2Data.AverageCase}) `;
    chartData.datasets[1].data = sort2.current === "Quick Sort" || sort2.current === "Merge Sort" ? dataSet[0] : dataSet[1];

    if (chartData.datasets[0].data === chartData.datasets[1].data) {
        chartData.datasets[1].borderWidth = 8;
    }


    return (
        <div className="result">
            <div className="chart light hidden">
                <Line
                    data={chartData}
                    options={{
                        plugins: {
                            title: {
                                display: true,
                                text: "TIME COMPLEXITY ANALYSIS",
                                font: {
                                    size: 20
                                },
                                color: "black"
                            },
                            autocolors: false,
                            legend: {
                                labels: {
                                    font: {
                                        size: 15
                                    },
                                    padding: 20
                                }
                            }
                        },
                        scales: {
                            y: {
                                title: {
                                    display: true,
                                    text: "Time in ms",
                                    font: {
                                        size: 20
                                    },
                                    color: "black"
                                }, ticks: {
                                    display: false
                                }, grid: {
                                    color: "black"
                                }
                            },
                            x: {
                                title: {
                                    display: true,
                                    text: "Array Size",
                                    font: {
                                        size: 20
                                    },
                                    color: "black"
                                },
                                ticks: {
                                    display: false
                                }, grid: {
                                    color: "black"
                                }
                            }
                        },
                        color: "black",
                        responsive: true,
                        maintainAspectRatio: false,
                        aspectRatio: 1.5

                    }}
                />

            </div>
            <div className="chart dark">
                <Line
                    data={chartData}
                    options={{
                        plugins: {
                            title: {
                                display: true,
                                text: "TIME COMPLEXITY ANALYSIS",
                                font: {
                                    size: 20
                                },
                                color: "white"
                            },
                            autocolors: false,
                            legend: {
                                labels: {
                                    font: {
                                        size: 15
                                    },
                                    padding: 20
                                }
                            }
                        },
                        scales: {
                            y: {
                                title: {
                                    display: true,
                                    text: "Time in ms",
                                    font: {
                                        size: 20
                                    }, color: "white"
                                }, ticks: {
                                    display: false
                                }, grid: {
                                    color: "#aaa"
                                }
                            },
                            x: {
                                title: {
                                    display: true,
                                    text: "Array Size",
                                    font: {
                                        size: 20
                                    }, color: "white"
                                },
                                ticks: {
                                    display: false
                                }, grid: {
                                    color: "#aaa"
                                }
                            }
                        },
                        color: "white",
                        responsive: true,
                        maintainAspectRatio: false,
                        aspectRatio: 1.5

                    }}
                />

            </div>

            <div className="result-info">
                <h1><span>{fasterSort()[0]}</span> is <span>{(Math.max(time1.current, time2.current) / Math.min(time1.current, time2.current)).toFixed(2)}</span> times faster than <span>{fasterSort()[1]}</span> for an array of size <span>{arrSize}</span></h1>
                <button id="restart" onClick={(e) => { window.location.reload() }}>Visualize Again</button>
                <div className="sort-info">
                    <table>
                        <tr>
                            <th>Property</th>
                            <th>{sort1.current}</th>
                            <th>{sort2.current}</th>
                        </tr>
                        <tr>
                            <td>Space Complexity</td>
                            <td>{sort1Data.SpaceComplexity}</td>
                            <td>{sort2Data.SpaceComplexity}</td>
                        </tr>
                        <tr>
                            <td>Best Case</td>
                            <td>{sort1Data.BestCase}</td>
                            <td>{sort2Data.BestCase}</td>
                        </tr>
                        <tr>

                            <td>Average Case</td>
                            <td>{sort1Data.AverageCase}</td>
                            <td>{sort2Data.AverageCase}</td>
                        </tr>
                        <tr>
                            <td>Worst Case</td>
                            <td>{sort1Data.WorstCase}</td>
                            <td>{sort2Data.WorstCase}</td>
                        </tr>
                        <tr>

                            <td>Stable</td>
                            <td>{sort1Data.Stable}</td>
                            <td>{sort2Data.Stable}</td>
                        </tr>
                        <tr>
                            <td>Method</td>
                            <td>{sort1Data.Method}</td>
                            <td>{sort2Data.Method}</td>
                        </tr>
                        <tr>
                            <td>Time Taken</td>
                            <td>{time1.current}s</td>
                            <td>{time2.current}s</td>
                        </tr>
                        <tr>
                            <td>Comparisons Made</td>
                            <td>{comparison1}</td>
                            <td>{comparison2}</td>
                        </tr>
                        <tr>
                            <td>Better ? </td>
                            <td>{fasterSort()[0] === sort1.current ? "😎" : "😔"}</td>
                            <td>{fasterSort()[0] === sort2.current ? "😎" : "😔"}</td>
                        </tr>


                    </table>
                </div>
            </div>

        </div>
    )
}

export default Result;