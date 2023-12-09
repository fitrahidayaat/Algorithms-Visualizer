import React, { useState } from "react";
import dynamic from "next/dynamic";

const DynamicPathFinding = dynamic(() => import("../components/path-finding"), {
    ssr : false
})

export default function PathFinding() {
    return (
        <>
            <DynamicPathFinding></DynamicPathFinding>
        </>
    )
}
