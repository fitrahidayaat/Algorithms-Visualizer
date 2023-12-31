import React from "react";
import Link from "next/link";
import Image from "next/image";

export default function Card(props : any) {
    return (
        <>
            <Link className="cursor-pointer" href={props.href}>
                <div className="w-96 shadow-md hover:shadow-2xl rounded transition-all bg-white border border-slate-300">
                    <Image
                        src={props.src}
                        height={700}
                        width={1000}
                        alt="maze"
                        className="w-full"
                    ></Image>
                    <div className="p-5">
                        <h2 className="font-bold text-xl my-2">{props.title}</h2>
                        
                        <div className="flex gap-3 flex-wrap">
                        {
                            props.tags.map((tag : any, key : any) => {
                                return (
                                    <p className="px-2 rounded bg-slate-600 text-white" key={key}>
                                        {tag}
                                    </p>
                                )
                            })
                        }
                        </div>
                    </div>
                </div>
            </Link>
        </>
    );
}
