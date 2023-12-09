"use client"
import { useState } from "react";
export default function PathFinding() {
    const [mode, setMode] = useState("nothing");

    const [startMarked, setStartMarked] = useState(false);

    // set the startNode as html element
    const [startNode, setStartNode] = useState(document.getElementById("temp") as HTMLDivElement);

    const [endMarked, setEndMarked] = useState(false);
    const [endNode, setEndNode] = useState(document.getElementById("temp") as HTMLDivElement);

    const [isMouseDown, setIsMouseDown] = useState(false);

    
    const [grid, setGrid] = useState(Array.from({ length: 16 }, () => Array(40).fill(0)));

    
    const gridClick = (e : any) => {
        const row = e.target.dataset.row;
        const col = e.target.dataset.col;
        if(mode === "start"){
            if(!startMarked){
                setStartMarked(true);
                if(grid[row][col] === 0){
                    grid[row][col] = 1;
                    e.target.classList.add("bg-green-600");
                } else if(grid[row][col] === 2){
                    setEndMarked(false);
                    grid[row][col] = 1;
                    e.target.classList.remove("bg-red-600");
                    e.target.classList.add("bg-green-600");
                } else if(grid[row][col] === 3){
                    grid[row][col] = 1;
                    e.target.classList.remove("bg-stone-800");
                    e.target.classList.add("bg-green-600");
                }
                setStartNode(e.target);
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
                    e.target.classList.remove("bg-stone-800");
                    e.target.classList.add("bg-green-600");
                }
                if(startNode.dataset.row != undefined && startNode.dataset.col != undefined){
                    let r = parseInt(startNode.dataset.row);
                    let c = parseInt(startNode.dataset.col);
                    grid[r][c] = 0;
                }
                setStartNode(e.target);
            }
        } else if(mode === "end"){
            if(!endMarked){
                setEndMarked(true);
                if(grid[row][col] === 0){
                    e.target.classList.add("bg-red-600");
                } else if(grid[row][col] === 1){
                    setStartMarked(false);
                    e.target.classList.remove("bg-green-600");
                    e.target.classList.add("bg-red-600");
                } else if(grid[row][col] === 3){
                    e.target.classList.remove("bg-stone-800");
                    e.target.classList.add("bg-red-600");
                }
                setEndNode(e.target);
                grid[row][col] = 2;
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
                    e.target.classList.remove("bg-stone-800");
                    e.target.classList.add("bg-red-600");
                }
                if(endNode.dataset.row != undefined && endNode.dataset.col != undefined){
                    let r = parseInt(endNode.dataset.row);
                    let c = parseInt(endNode.dataset.col);
                    grid[r][c] = 0;
                }
                endNode.classList.remove("bg-red-600");
            }
        } else if(mode === "wall"){
            if(grid[row][col] === 0){
                e.target.classList.add("bg-stone-800");
            } else if(grid[row][col] === 1){
                setStartMarked(false);
                e.target.classList.remove("bg-green-600");
                e.target.classList.add("bg-stone-800");
            } else if(grid[row][col] === 2){
                setEndMarked(false);
                e.target.classList.remove("bg-red-600");
                e.target.classList.add("bg-stone-800");
            }
            grid[row][col] = 3;
        } else if(mode == "erase"){
            if(grid[row][col] === 1){
                setStartMarked(false);
            } else if(grid[row][col] === 2){
                setEndMarked(false);
            }
            grid[row][col] = 0;
            e.target.classList.remove("bg-green-600");
            e.target.classList.remove("bg-red-600");
            e.target.classList.remove("bg-stone-800");
            e.target.classList.remove("bg-blue-600");
            e.target.classList.remove("bg-yellow-600");
        }
        setGrid(grid);

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
        } else{
            bfs();
        }
    }
    const animateSearch = (arr :number[][], x : number, y : number) => {
        // reverse arr
        
        for(let i = 0; i < arr.length; i++){
            const x = document.querySelector(`[data-row="${arr[i][0]}"][data-col="${arr[i][1]}"]`);
            if (!x?.classList.contains("bg-green-600") && !x?.classList.contains("bg-red-600")) {
                setTimeout(() => {
                    x?.classList.add("bg-blue-600");
                }, i * 25); // Change 1000 to the desired delay in milliseconds (1 second in this example)
            }
        }
        const d = arr.length*25;
        let i = 1;
        const b = [];
        if(startNode.dataset.row != undefined && startNode.dataset.col != undefined){
            par[parseInt(startNode.dataset.row)][parseInt(startNode.dataset.col)] = [-1, -1];
        }
        while(x !== -1 && y !== -1){
            [x, y] = [par[x][y][0], par[x][y][1]];
            b.unshift([x, y]);
        }
        for(let i = 0; i < b.length; i++){
            const x = document.querySelector(`[data-row="${b[i][0]}"][data-col="${b[i][1]}"]`);
            if (!x?.classList.contains("bg-green-600") && !x?.classList.contains("bg-red-600")) {
                setTimeout(() => {
                    x?.classList.add("bg-yellow-600");
                }, i * 25 + d); // Change 1000 to the desired delay in milliseconds (1 second in this example)
            }
        }
    }

    const [par, setPar] = useState(Array.from({ length: grid.length }, () => Array.from({ length: grid[0].length }, () => [-1, -1])));

    const bfs = () => {
        let queue : number[][] = [];
        if(startNode.dataset.row != undefined && startNode.dataset.col != undefined){
            queue = [[parseInt(startNode.dataset.row), parseInt(startNode.dataset.col)]];
        }
        let cnt = 0;
        let x : number = -1, y : number = -1;
        if(endNode.dataset.row != undefined && endNode.dataset.col != undefined){
            x = parseInt(endNode.dataset.row);
            y = parseInt(endNode.dataset.col);
        
        }
        if(startNode.dataset.row != undefined && startNode.dataset.col != undefined){
            grid[parseInt(startNode.dataset.row)][parseInt(startNode.dataset.col)] = 4;
        }
        const arr = [];
        while(queue.length !== 0){
            let temp = queue.shift();
            let i : number = -1, j : number = -1;
            if(temp != undefined && temp[0] != undefined && temp[1] != undefined){
                i = temp[0];
                j = temp[1];
            }
            arr.push([i, j]);
            if(i === x && j === y){
                break;
            }
            if(i > 0 && (grid[i-1][j] === 0 || grid[i-1][j] === 2)){
                queue.push([i-1, j]);
                par[i-1][j] = [i, j];
                grid[i-1][j] = 4;
            }
            if(i < grid.length-1 && (grid[i+1][j] === 0 || grid[i+1][j] === 2)){
                queue.push([i+1, j]);
                par[i+1][j] = [i, j];
                grid[i+1][j] = 4;
            }
            if(j > 0 && (grid[i][j-1] === 0 || grid[i][j-1] === 2)){
                par[i][j-1] = [i, j];
                queue.push([i, j-1]);
                grid[i][j-1] = 4;
            }
            if(j < grid[0].length-1 && (grid[i][j+1] === 0 || grid[i][j+1] === 2)){
                par[i][j+1] = [i, j];
                queue.push([i, j+1]);
                grid[i][j+1] = 4;
            }
        }
        setPar(par);
        setGrid(grid);
        animateSearch(arr, x, y);
        // animatePath(x, y);
    }

    const eraseClick = () => {
        setMode("erase");
    }
    const resetClick = () => {
        for(let i = 0; i < grid.length; i++){
            for(let j = 0; j < grid[0].length; j++){
                grid[i][j] = 0;
                const x = document.querySelector(`[data-row="${i}"][data-col="${j}"]`);
                x?.classList.remove("bg-green-600");
                x?.classList.remove("bg-red-600");
                x?.classList.remove("bg-stone-800");
                x?.classList.remove("bg-blue-600");
                x?.classList.remove("bg-yellow-600");
            }
        }   
        setGrid(grid);
    }
    

    return (
        <>
            <div id="temp" data-row={-1} data-col={-1}></div>
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
                <button className="bg-black hover:bg-stone-800 text-white px-3 py-1 rounded text-lg" onClick={wallClick}>
                    wall
                </button>
                <button className="bg-stone-600 hover:bg-stone-700 text-white px-3 py-1 rounded text-lg" onClick={eraseClick}>
                    erase
                </button>
            </div>
            <br/>
            <div className="flex justify-center">
                <div className="">
                    {grid.map((row, i) => (
                        <div key={i} className="flex">
                            {row.map((item, j) => (
                                <span
                                    className={`h-8 w-8 border-stone-800 border-[1px] transition-all duration-200`}
                                    data-row={i}
                                    data-col={j}
                                    key={j}
                                    onMouseDown={handleMouseDown}
                                    onMouseUp={handleMouseUp}
                                    onMouseOver={handleMouseEnter}
                                    draggable="false"
                                >
                                    
                                </span>
                            ))}
                        </div>
                    ))}
                </div>
            </div>
            <div className="flex justify-center mt-8">
                <button className="bg-black hover:bg-slate-700 text-white px-3 py-1 rounded text-lg " onClick={resetClick}>
                    reset
                </button>
            </div>
        </>
    );
}