"use client";
import React, {useState} from "react";

export default function Sorting() {
    const [selectedOption, setSelectedOption] = useState('bubble');

  // Function to handle changes in the radio button selection
  const handleRadioChange = (event : any) => {
    setSelectedOption(event.target.value);
  };

    const [numbers, setNumbers] = useState([
        10, 17, 30, 12, 14, 21, 5, 17, 20, 24
    ]);

    const scale = (number : number) =>{
        return ((number - Math.min(...numbers)) / (Math.max(...numbers) - Math.min(...numbers))) * 80 + 10;
    }

    const calcWidth = () => {
        return `${40 / numbers.length}%`;
    }

    const calcFont = () => {
        if(numbers.length < 10) return "2rem";
        else if(numbers.length < 20) return "1.5rem";
        else return "0rem";
    }

    const select = (number : number) => {
        const node = document.getElementById(number.toString());
        node.classList.add("bg-red-600");
    }

    const unSelect = (number : number) => {
        const node = document.getElementById(number.toString());
        node.classList.remove("bg-red-600");
    }

    const swapid = (id1 : number, id2 : number) => {
        const node1 = document.getElementById(id1.toString());
        const node2 = document.getElementById(id2.toString());
        // swap id
        node1?.setAttribute("id", id2.toString());
        node2?.setAttribute("id", id1.toString());

    }

    const animateSwap = (id1 : number, id2 : number) => {
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
        
    }

    const bubbleSort = () => {
        let sorted = false;
        let cnt = 0;
        while(!sorted){
            sorted = true;
            for(let i = 0; i < numbers.length - 1; i++){
                setTimeout(() => {
                    select(i);
                    select(i+1);
                }, cnt*500);
                cnt++;
                if(numbers[i] > numbers[i+1]){
                    sorted = false;
                    setTimeout(() => {
                        animateSwap(i, i+1);
                    }, cnt*500);
                    cnt++;
                    const temp = numbers[i];
                    numbers[i] = numbers[i+1];
                    numbers[i+1] = temp;
                }
                setTimeout(() => {
                    unSelect(i);
                    unSelect(i+1);
                }, cnt*500);
                // swapid(i, i+1);
                cnt++;
            }
        }
        console.log(numbers);
        setNumbers(numbers);
    }


    const inputNumbers = () => {
        const input = document.getElementById("input-numbers") as HTMLInputElement;
        const numbersArray = input.value.split(" ").map((number) => parseInt(number));
        setNumbers(numbersArray);
        
    }

    return (
        <>
        <div className="h-screen">
            <div className="h-[10vh] flex items-center justify-center">
                <h1 className="text-4xl font-bold">
                    Sorting Visualizer
                </h1>
            </div>

            <div className="flex justify-center gap-10 h-[4vh] items-center">
                <div>
                    <label htmlFor="bubble">
                        <input className="mx-2" id="bubble" type="radio" name="sorting-type" value="bubble" checked={selectedOption === "bubble"} onChange={handleRadioChange}/>
                        Bubble Sort
                    </label>
                </div>
                <div>
                    <label htmlFor="selection">
                        <input className="mx-2" id="selection" type="radio" name="sorting-type" value="selection" checked={selectedOption === "selection"} onChange={handleRadioChange}/>
                        Selection Sort
                    </label>
                </div>
                <div>
                    <label htmlFor="merge">
                        <input className="mx-2" id="merge" type="radio" name="sorting-type" value="merge" checked={selectedOption === "merge"} onChange={handleRadioChange}/>
                        Merge Sort
                    </label>
                </div>
            </div>

            <div className="h-[65vh] flex justify-center items-end gap-4">
                {
                    numbers.map((number, i) => {
                        return (
                            <div className={` bg-green-600 transition-all duration-300 flex items-end justify-center text-white`} id={i.toString()} key={i} style={{height: `${scale(number)}%`, width: `${calcWidth()}`, fontSize:`${calcFont()}`}}>
                                {number}
                            </div>
                        );
                    })
                }

            </div>

            <div className="h-[19vh] gap-3 flex flex-col justify-end items-center">
                <div className="flex gap-2">
                    <input className="border border-black p-2 w-96" type="text" id="input-numbers"/>
                    <button className="p-2 bg-blue-600 text-white hover:bg-blue-700" onClick={inputNumbers}>Input numbers</button>
                </div>
                <div>
                    <button className="p-2 w-48 rounded bg-blue-600 text-white hover:bg-blue-700" onClick={bubbleSort}>Sort</button>
                </div>
            </div>
            
        </div>
        </>
    );
}
