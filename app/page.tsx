import Image from "next/image";
import Link from "next/link";
import Card from "./components/card";

export default function Home() {
    return (
        <>
        <div className="">
            <h1 className="text-center text-4xl font-bold mb-10 mt-20">
                Algorithms-visualizer
            </h1>
            <div className="flex justify-center gap-4">
                <Card title="Path Finder" tags={["bfs", "dfs", "A*"]} src="/maze.jpg" href="/path-finding"></Card>
                <Card title="Sorting" tags={["array"]} src="/maze.jpg" href="sorting"></Card>
            </div>
        </div>
        </>
    );
}
