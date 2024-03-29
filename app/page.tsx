import Image from "next/image";
import Link from "next/link";
import Card from "./components/card";

export default function Home() {
    return (
        <>
        <div className="">
            <h1 className="text-center text-5xl font-bold mb-20 mt-28 dark:text-white">
                Algorithms-visualizer
            </h1>
            <div className="flex justify-center gap-6">
                <Card title="Path Finder" tags={["bfs"]} src="/path_finder.png" href="/path-finding"></Card>
                <Card title="Sorting" tags={["bubble sort", "selection sort"]} src="/sorting.png" href="sorting"></Card>
            </div>
        </div>
        </>
    );
}
