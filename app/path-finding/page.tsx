"use client";
import React, { useState } from "react";

export default function PathFinding() {
    const [selectedValue, setSelectedValue] = useState("option1");
    const [mode, setMode] = useState("nothing");

    const [startMarked, setStartMarked] = useState(false);
    const [startNode, setStartNode] = useState();

    const [endMarked, setEndMarked] = useState(false);
    const [endNode, setEndNode] = useState(null);

    const [isMouseDown, setIsMouseDown] = useState(false);

    const handleRadioChange = (value : any) => {
        setSelectedValue(value);
    };

    const [grid, setGrid] = useState([
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    ]);


    const gridClick = (e : any) => {
        const row = e.target.dataset.row;
        const col = e.target.dataset.col;
        
        if(mode === "start"){
            if(!startMarked){
                setStartMarked(true);
                if(grid[row][col] === 0){
                    setStartNode(e.target);
                    grid[row][col] = 1;
                    setGrid(grid);
                    e.target.classList.add("bg-green-600");
                } else if(grid[row][col] === 2){
                    setStartNode(e.target);
                    setEndMarked(false);
                    grid[row][col] = 1;
                    setGrid(grid);
                    e.target.classList.remove("bg-red-600");
                    e.target.classList.add("bg-green-600");
                } else if(grid[row][col] === 3){
                    setStartNode(e.target);
                    grid[row][col] = 1;
                    setGrid(grid);
                    e.target.classList.remove("bg-slate-800");
                    e.target.classList.add("bg-green-600");
                }
                
            } else{
                startNode.classList.remove("bg-green-600");
                if(grid[row][col] === 0){
                    grid[row][col] = 1;
                    e.target.classList.add("bg-green-600");
                } else if(grid[row][col] === 1){
                    setStartMarked(false);
                    grid[row][col] = 0;
                } else if(grid[row][col] === 2){
                    setEndMarked(false);
                    grid[row][col] = 1;
                    e.target.classList.remove("bg-red-600");
                    e.target.classList.add("bg-green-600");
                } else if(grid[row][col] === 3){
                    grid[row][col] = 1;
                    e.target.classList.remove("bg-slate-800");
                    e.target.classList.add("bg-green-600");
                }
                grid[startNode.dataset.row][startNode.dataset.col] = 0;
                setGrid(grid);
                setStartNode(e.target);
            }
        } else if(mode === "end"){
            if(!endMarked){
                setEndMarked(true);
                if(grid[row][col] === 0){
                    setEndNode(e.target);
                    grid[row][col] = 2;
                    setGrid(grid);
                    e.target.classList.add("bg-red-600");
                } else if(grid[row][col] === 1){
                    setEndNode(e.target);
                    setStartMarked(false);
                    grid[row][col] = 2;
                    setGrid(grid);
                    e.target.classList.remove("bg-green-600");
                    e.target.classList.add("bg-red-600");
                } else if(grid[row][col] === 3){
                    setEndNode(e.target);
                    grid[row][col] = 2;
                    setGrid(grid);
                    e.target.classList.remove("bg-slate-800");
                    e.target.classList.add("bg-red-600");
                }
            } else{
                if(grid[row][col] === 0){
                    setEndNode(e.target);
                    grid[row][col] = 2;
                    e.target.classList.add("bg-red-600");
                } else if(grid[row][col] === 1){
                    setStartMarked(false);
                    setEndNode(e.target);
                    grid[row][col] = 2;
                    e.target.classList.remove("bg-green-600");
                    e.target.classList.add("bg-red-600");
                } else if(grid[row][col] === 2){
                    setEndMarked(false);
                    grid[row][col] = 0;
                    e.target.classList.remove("bg-red-600");
                } else if(grid[row][col] === 3){
                    setEndNode(e.target);
                    grid[row][col] = 2;
                    e.target.classList.remove("bg-slate-800");
                    e.target.classList.add("bg-red-600");
                }
                grid[endNode.dataset.row][endNode.dataset.col] = 0;
                endNode.classList.remove("bg-red-600");
                setGrid(grid);
            }
        } else if(mode === "wall"){
            if(grid[row][col] === 0){
                grid[row][col] = 3;
                e.target.classList.add("bg-slate-800");
            } else if(grid[row][col] === 1){
                grid[row][col] = 3;
                setStartMarked(false);
                e.target.classList.remove("bg-green-600");
                e.target.classList.add("bg-slate-800");
            } else if(grid[row][col] === 2){
                grid[row][col] = 3;
                setEndMarked(false);
                e.target.classList.remove("bg-red-600");
                e.target.classList.add("bg-slate-800");
            }
            setGrid(grid);

        } else if(mode == "nothing"){

        } else if(mode == "erase"){
            if(grid[row][col] === 1){
                setStartMarked(false);
            } else if(grid[row][col] === 2){
                setEndMarked(false);
            }
            grid[row][col] = 0;
            e.target.classList.remove("bg-green-600");
            e.target.classList.remove("bg-red-600");
            e.target.classList.remove("bg-slate-800");
            setGrid(grid);
        }
        console.log(e.target);
        console.log(grid);
        console.log(mode);
        console.log(startMarked);
        console.log(endMarked)

    }

    const handleMouseDown = (e : any) => {
        setIsMouseDown(true);
        gridClick(e);
    }

    const handleMouseUp = (e : any) => {
        setIsMouseDown(false);
        
    }

    const handleMouseEnter = (e : any) => {
        if(isMouseDown && (mode === "wall" || mode === "erase")){
            gridClick(e);
        }
    }

    const startClick = () => {
        setMode("start");
    }
    const endClick = () => {
        setMode("end");
    }
    const wallClick = () => {
        setMode("wall");
    }
    const goClick = () => {
        setMode("go");
        if(!startMarked){
            alert("start not marked");
        } else if(!endMarked){
            alert("end not marked");
        }
    }
    const eraseClick = () => {
        setMode("erase");
    }
    

    return (
        <>
            <h1 className="text-center text-4xl font-bold my-5">
                Path-Finder
            </h1>
            <div className="flex justify-evenly">
                <button className="bg-blue-600 hover:bg-blue-700 text-white px-3 py-1 rounded text-lg" onClick={startClick}>
                    start
                </button>
                <button className="bg-red-600 hover:bg-red-700 text-white px-3 py-1 rounded text-lg" onClick={endClick}>
                    end
                </button>
                <button className="bg-green-600 hover:bg-green-700 text-white px-3 py-1 rounded text-lg" onClick={goClick} >
                    Go!
                </button>
                <button className="bg-black hover:bg-slate-800 text-white px-3 py-1 rounded text-lg" onClick={wallClick}>
                    wall
                </button>
                <button className="bg-slate-600 hover:bg-slate-700 text-white px-3 py-1 rounded text-lg" onClick={eraseClick}>
                    erase
                </button>
            </div>
            <br/>
            <div className="flex justify-center">
                <div className="">
                    {grid.map((row, i) => (
                        <div key={i} className="flex">
                            {row.map((item, j) => (
                                <div
                                    className={`h-8 w-8 border-slate-300 border-[1px]`}
                                    data-row={i}
                                    data-col={j}
                                    key={j}
                                    onMouseDown={handleMouseDown}
                                    onMouseUp={handleMouseUp}
                                    onMouseOver={handleMouseEnter}
                                >
                                    
                                </div>
                            ))}
                        </div>
                    ))}
                </div>
            </div>
            <div>
                <input
                    type="radio"
                    value="option1"
                    checked={selectedValue === "option1"}
                    onChange={() => handleRadioChange("option1")}
                />
                Option 1
                <input
                    type="radio"
                    value="option2"
                    checked={selectedValue === "option2"}
                    onChange={() => handleRadioChange("option2")}
                />
                Option 2
            </div>
        </>
    );
}
