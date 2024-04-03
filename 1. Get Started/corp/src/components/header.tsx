import Link from 'next/link';
import React from 'react';

function BFS(graph: {[key: number]: number[]}, start: number) {
  console.log('helo');
  
  let visited: {[key: number]: boolean|undefined} = {};
  let queue: number[] = [start];

  while(queue.length>0){    
    let u = queue[0] as number;   
    console.log(u);
    queue.shift();
    for(let v of (graph[u] as number[])){
      if(!visited[v]){
        visited[v] = true;
        queue.unshift(v);
      }
    }    
  }

}
function question() {
  let graph = {
    0: [1,2],
    1: [0, 2, 3],
    2: [0, 1, 4],
    3: [1, 4],
    4: [2,3]
  };
  BFS(graph, 0)   
}

question();

export default function Header() {
  return (
    <div className='w-full absolute text-white z-10'>
        <nav className='container relative flex flex-wrap items-center justify-between mx-auto p-8'>
          <Link href={"/"} className='font-bold text-3xl'>Home</Link>
          <div className='space-x-4 text-xl'>
            <Link href={"performance"}>Performance</Link>
            <Link href={"reliability"}>Reliability</Link>
            <Link href={"scale"}>Scale</Link>
            <Link href={"user"}>User</Link>
          </div>
        </nav>
      </div>
  );
}
