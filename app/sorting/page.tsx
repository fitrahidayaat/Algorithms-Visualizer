"use client";
import React, { useState } from "react";
import Bar from "../components/bar";

export default function Sorting() {
    const [selectedOption, setSelectedOption] = useState("bubble");

    // Function to handle changes in the radio button selection
    const handleRadioChange = (event: any) => {
        setSelectedOption(event.target.value);
    };

    let [numbers, setNumbers] = useState([
        10, 17, 30, 12, 14, 21, 5, 17, 20, 24,
    ]);

    const scale = (numbers: number[], number: number) => {
        const minValue = Math.min(...numbers);
        const maxValue = Math.max(...numbers);
        const scaledValue =
            ((number - minValue) / (maxValue - minValue)) * 80 + 10;
        return `${scaledValue}%`;
    };

    const calcWidth = (numbers: number[]) => {
        return `${40 / numbers.length}%`;
    };

    const calcFont = (numbers: number[]) => {
        if (numbers.length < 10) return "1.25rem";
        else if (numbers.length < 20) return "0.75rem";
        else return "0rem";
    };

    const select = (number: number) => {
        const node = document.getElementById(number.toString());
        node.classList.add("bg-red-600");
    };

    const unSelect = (number: number) => {
        const node = document.getElementById(number.toString());
        node.classList.remove("bg-red-600");
    };

    const swapid = (id1: number, id2: number) => {
        const node1 = document.getElementById(id1.toString());
        const node2 = document.getElementById(id2.toString());
        // swap id
        node1?.setAttribute("id", id2.toString());
        node2?.setAttribute("id", id1.toString());
    };

    const animateSwap = (id1: number, id2: number) => {
        const node1 = document.getElementById(id1.toString());
        const node2 = document.getElementById(id2.toString());
        // swap height
        const temp = node1.style.height;
        node1.style.height = node2.style.height;
        node2.style.height = temp;
        // swap number
        const temp2 = node1.innerText;
        node1.innerText = node2.innerText;
        node2.innerText = temp2;
    };

    const bubbleSort = (numbers : number[]) => {
        let sorted = false;
        let cnt = 0;
        while (!sorted) {
            sorted = true;
            for (let i = 0; i < numbers.length - 1; i++) {
                setTimeout(() => {
                    select(i);
                    select(i + 1);
                }, cnt * 300);
                cnt++;
                if (numbers[i] > numbers[i + 1]) {
                    sorted = false;
                    setTimeout(() => {
                        animateSwap(i, i + 1);
                    }, cnt * 300);
                    cnt++;
                    const temp = numbers[i];
                    numbers[i] = numbers[i + 1];
                    numbers[i + 1] = temp;
                }
                setTimeout(() => {
                    unSelect(i);
                    unSelect(i + 1);
                }, cnt * 300);
                // swapid(i, i+1);
                cnt++;
            }
        }
        setNumbers(numbers);
    };

    const markMin = (min: number) => {
        const node = document.getElementById(min.toString());
        node?.classList.add("bg-yellow-600");
    };

    const unmarkMin = (min: number) => {
        const node = document.getElementById(min.toString());
        node?.classList.remove("bg-yellow-600");
    };

    const markStart = (start: number) => {
        const node = document.getElementById(start.toString());
        node?.classList.add("bg-blue-600");
    };
    const unMarkStart = (start: number) => {
        const node = document.getElementById(start.toString());
        node?.classList.remove("bg-blue-600");
    };
    const markNode = (node: number) => {
        const node1 = document.getElementById(node.toString());
        node1?.classList.add("bg-green-600");
    };
    const unMarkNode = (node: number) => {
        const node1 = document.getElementById(node.toString());
        node1?.classList.remove("bg-green-600");
    };

    const selectionSort = (numbers : number[]) => {
        let cnt = 0;
        for (let i = 0; i < numbers.length - 1; i++) {
            let min = i;
            const x = setTimeout(() => {
                unMarkNode(i);
                markStart(i);
            }, cnt * 300);  
            cnt++;
            for (let j = i + 1; j < numbers.length; j++) {
                setTimeout(() => {
                    select(j);
                }, cnt * 300);
                cnt++;
                if (numbers[j] < numbers[min]) {
                    let x = min;
                    setTimeout(() => {
                        unmarkMin(x);
                        unSelect(j);
                        markMin(j);
                    }, cnt * 300);
                    cnt++;
                    min = j;
                }
                setTimeout(() => {
                    unSelect(j);
                }, cnt * 300);
                cnt++;
            }

            if (min !== i) {
                setTimeout(() => {
                    animateSwap(i, min);
                }, cnt * 300);
                cnt++;
                const temp = numbers[i];
                numbers[i] = numbers[min];
                numbers[min] = temp;
            }
            setTimeout(() => {
                unMarkStart(i);
                unmarkMin(min);
                markNode(i);
            }, cnt * 300);
            cnt++;
        }
        setNumbers(numbers);
    };

    const mergeSort = (numbers : number[]) => {
        const merge = (left: number[], right: number[]) => {
            let resultArray = [],
                leftIndex = 0,
                rightIndex = 0;
            while (leftIndex < left.length && rightIndex < right.length) {
                if (left[leftIndex] < right[rightIndex]) {
                    resultArray.push(left[leftIndex]);
                    leftIndex++;
                } else {
                    resultArray.push(right[rightIndex]);
                    rightIndex++;
                }
            }
            return resultArray
                .concat(left.slice(leftIndex))
                .concat(right.slice(rightIndex));
        };

        const mergeSortHelper = (array: number[]) => {
            if (array.length <= 1) {
                return array;
            }
            const middle = Math.floor(array.length / 2);
            const left = array.slice(0, middle);
            const right = array.slice(middle);
            return merge(mergeSortHelper(left), mergeSortHelper(right));
        };
        const sortedArray = mergeSortHelper(numbers);
    };

    const handleSort = () => {
        const numbersArray = inputNumbers();
        if(numbersArray.length > 40) return;

        if (selectedOption === "bubble") {
            bubbleSort(numbersArray);
        } else if (selectedOption === "selection") {
            selectionSort(numbersArray);
        } else if (selectedOption === "merge") {
            mergeSort(numbersArray);
        }
    };

    const generateBar = (numbersArray: number[]) => {
        for (let i = 0; i < 40; i++) {
            document.getElementById(`${i}`)?.remove();
        }
        for (let i = 0; i < numbersArray.length; i++) {
            // create new Bar element
            const newBar = document.createElement("div");
            newBar.classList.add(
                "bg-green-600",
                "transition-all",
                "duration-100",
                "flex",
                "items-end",
                "justify-center",
                "text-white"
            );

            // setting attributes
            newBar.setAttribute("id", `${i}`);
            newBar.style.height = `${scale(numbersArray, numbersArray[i])}`;
            newBar.style.width = `${calcWidth(numbersArray)}`;
            newBar.style.fontSize = `${calcFont(numbersArray)}`;
            newBar.innerText = `${numbersArray[i]}`;

            // append to the parent element
            const parent = document.getElementsByClassName("h-[65vh]")[0];
            parent.appendChild(newBar);
        }
    };

    const inputNumbers = () => {
        for(let i = 0; i < 1000000; i++){
            window.clearTimeout(i);
        }
        const input = document.getElementById("input-numbers");
        const numbersArray = input.value
            .split(",")
            .map((number) => parseInt(number.trim()));
        if (numbersArray.length > 40){
            alert("Please input less than 40 numbers");
            return numbersArray;
        }

        generateBar(numbersArray);
        return numbersArray;
    };

    return (
        <>
            <div className="h-screen">
                <div className="h-[10vh] flex items-center justify-center">
                    <h1 className="text-4xl font-bold">Sorting Visualizer</h1>
                </div>

                <div className="flex justify-center gap-10 h-[4vh] items-center">
                    <div>
                        <label htmlFor="bubble">
                            <input
                                className="mx-2"
                                id="bubble"
                                type="radio"
                                name="sorting-type"
                                value="bubble"
                                checked={selectedOption === "bubble"}
                                onChange={handleRadioChange}
                            />
                            Bubble Sort
                        </label>
                    </div>
                    <div>
                        <label htmlFor="selection">
                            <input
                                className="mx-2"
                                id="selection"
                                type="radio"
                                name="sorting-type"
                                value="selection"
                                checked={selectedOption === "selection"}
                                onChange={handleRadioChange}
                            />
                            Selection Sort
                        </label>
                    </div>
                    {/* <div>
                    <label htmlFor="merge">
                        <input className="mx-2" id="merge" type="radio" name="sorting-type" value="merge" checked={selectedOption === "merge"} onChange={handleRadioChange}/>
                        Merge Sort
                    </label>
                </div> */}
                </div>

                <div>
                    <div className="h-[65vh] flex justify-center items-end gap-4">
                        <div className=" bg-green-600 transition-all duration-100 flex items-end justify-center text-white" id="0" key="0" style={{height: `${scale(numbers, 10)}`, width: `${calcWidth(numbers)}`, fontSize:`${calcFont(numbers)}`}}>
                            10
                        </div>
                        <div className=" bg-green-600 transition-all duration-100 flex items-end justify-center text-white" id="1" key="1" style={{height: `${scale(numbers, 17)}`, width: `${calcWidth(numbers)}`, fontSize:`${calcFont(numbers)}`}}>
                            17
                        </div>
                        <div className=" bg-green-600 transition-all duration-100 flex items-end justify-center text-white" id="2" key="2" style={{height: `${scale(numbers, 30)}`, width: `${calcWidth(numbers)}`, fontSize:`${calcFont(numbers)}`}}>
                            30
                        </div>
                        <div className=" bg-green-600 transition-all duration-100 flex items-end justify-center text-white" id="3" key="3" style={{height: `${scale(numbers, 12)}`, width: `${calcWidth(numbers)}`, fontSize:`${calcFont(numbers)}`}}>
                            12
                        </div>
                        <div className=" bg-green-600 transition-all duration-100 flex items-end justify-center text-white" id="4" key="4" style={{height: `${scale(numbers, 14)}`, width: `${calcWidth(numbers)}`, fontSize:`${calcFont(numbers)}`}}>
                            14
                        </div>
                        <div className=" bg-green-600 transition-all duration-100 flex items-end justify-center text-white" id="5" key="5" style={{height: `${scale(numbers, 21)}`, width: `${calcWidth(numbers)}`, fontSize:`${calcFont(numbers)}`}}>
                            21
                        </div>
                        <div className=" bg-green-600 transition-all duration-100 flex items-end justify-center text-white" id="6" key="6" style={{height: `${scale(numbers, 5)}`, width: `${calcWidth(numbers)}`, fontSize:`${calcFont(numbers)}`}}>
                            5
                        </div>
                        <div className=" bg-green-600 transition-all duration-100 flex items-end justify-center text-white" id="7" key="7" style={{height: `${scale(numbers, 17)}`, width: `${calcWidth(numbers)}`, fontSize:`${calcFont(numbers)}`}}>
                            17
                        </div>
                        <div className=" bg-green-600 transition-all duration-100 flex items-end justify-center text-white" id="8" key="8" style={{height: `${scale(numbers, 20)}`, width: `${calcWidth(numbers)}`, fontSize:`${calcFont(numbers)}`}}>
                            20
                        </div>
                        <div className=" bg-green-600 transition-all duration-100 flex items-end justify-center text-white" id="9" key="9" style={{height: `${scale(numbers, 24)}`, width: `${calcWidth(numbers)}`, fontSize:`${calcFont(numbers)}`}}>
                            24
                        </div>
                    </div>
                </div>

                <div className="h-[19vh] gap-3 flex flex-col justify-end items-center">
                    <div className="flex gap-2">
                        <input
                            className="border border-black p-2 w-96"
                            type="text"
                            id="input-numbers"
                            defaultValue="10, 17, 30, 12, 14, 21, 5, 17, 20, 24"
                        />
                        <button
                            className="p-2 bg-blue-600 text-white hover:bg-blue-700"
                            onClick={inputNumbers}
                        >
                            Input numbers
                        </button>
                    </div>
                    <div>
                        <button
                            className="p-2 w-48 rounded bg-blue-600 text-white hover:bg-blue-700"
                            onClick={handleSort}
                        >
                            Sort
                        </button>
                    </div>
                </div>
            </div>
        </>
    );
}
