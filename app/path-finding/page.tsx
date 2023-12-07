"use client";
import React, { useState } from "react";

export default function PathFinding() {
    const [selectedValue, setSelectedValue] = useState("option1");

    const handleRadioChange = (value) => {
        setSelectedValue(value);
    };

    const grid = [
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    ];

    return (
        <>
            <h1 className="text-center text-4xl font-bold my-5">
                Path-Finder
            </h1>
            <div className="flex justify-evenly">
                <button className="bg-blue-600 hover:bg-blue-700 text-white px-3 py-1 rounded text-lg">
                    start
                </button>
                <button className="bg-red-600 hover:bg-red-700 text-white px-3 py-1 rounded text-lg">
                    end
                </button>
                <button className="bg-green-600 hover:bg-green-700 text-white px-3 py-1 rounded text-lg">
                    Go!
                </button>
                <button className="bg-black hover:bg-slate-800 text-white px-3 py-1 rounded text-lg">
                    wall
                </button>
                <button className="bg-slate-600 hover:bg-slate-700 text-white px-3 py-1 rounded text-lg">
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
                                    className="h-12 w-12 border-2 border-black"
                                    key={j}
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
