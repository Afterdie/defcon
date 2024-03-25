import React, {
  useCallback,
  useState,
  useMemo,
  useEffect,
  startTransition,
} from "react";
import ReactFlow, { addEdge, useReactFlow } from "reactflow";

import "reactflow/dist/style.css";

import GameNode from "./GameNode";
const connectionLineStyle = {};
const nodeTypes = { gameNode: GameNode };
const initialNodes = [
  {
    id: "1",
    type: "gameNode",
    position: {
      x: 0,
      y: 0,
    },
    data: { live: 0 },
  },
  {
    id: "2",
    type: "gameNode",
    position: {
      x: 0,
      y: 100,
    },
    data: { live: 0 },
  },
  {
    id: "3",
    type: "gameNode",
    position: {
      x: 0,
      y: 200,
    },
    data: { live: 0 },
  },
  {
    id: "4",
    type: "gameNode",
    position: {
      x: 100,
      y: 0,
    },
    data: { live: 0 },
  },
  {
    id: "5",
    type: "gameNode",
    position: {
      x: 100,
      y: 100,
    },
    data: { live: 0 },
  },
  {
    id: "6",
    type: "gameNode",
    position: {
      x: 100,
      y: 200,
    },
    data: { live: 0 },
  },
  {
    id: "7",
    type: "gameNode",
    position: {
      x: 200,
      y: 0,
    },
    data: { live: 0 },
  },
  {
    id: "8",
    type: "gameNode",
    position: {
      x: 200,
      y: 100,
    },
    data: { live: 0 },
  },
  {
    id: "9",
    type: "gameNode",
    position: {
      x: 200,
      y: 200,
    },
    data: { live: 0 },
  },
];
const startingCombo = {
  source: null,
  target: null,
};

export default function Dots() {
  const [nodes, setNodes] = useState(initialNodes);
  useEffect(() => {
    //set the first combination on page mount
    setLive();
  }, []);
  function setLive() {
    let temp = generateCombo();
    let tempList = nodes.map((node) => ({ ...node, data: { live: 0 } }));
    setCombo(temp);
    tempList[temp.source - 1].data.live = 1;
    tempList[temp.target - 1].data.live = 1;
    setNodes(tempList);
  }
  function generateCombo() {
    let source = Math.floor(Math.random() * 9) + 1;
    let target;
    do {
      target = Math.floor(Math.random() * 9) + 1;
    } while (source == target);
    return { source, target };
  }

  const resetPuzzle = () => {
    setTimeout(() => {
      console.log("reset");
      setEdges([]);
    }, 1000);
    setScore((score) => score + 1);
    setLive();
  };
  const [score, setScore] = useState(0);
  const [validCombo, setCombo] = useState(startingCombo);

  const [edges, setEdges] = useState([]);
  const onConnect = (connection) => {
    console.log(
      Number(connection.source),
      validCombo.source,
      Number(connection.source) == validCombo.source,
    );
    if (
      (Number(connection.source) == validCombo.source &&
        Number(connection.target) == validCombo.target) ||
      (Number(connection.target) == validCombo.source &&
        Number(connection.source) == validCombo.target)
    ) {
      setEdges((prevEdges) =>
        addEdge({ ...connection, type: "straight" }, prevEdges),
      );
      resetPuzzle();
    } else console.log("wrong combination");
  };
  const showcombo = () => {
    //debug function to show the current combo
    console.log(validCombo);
    console.log(edges);
  };
  return (
    <div className="mx-auto h-[500px] w-[500px] bg-red-100">
      <h1>
        {validCombo.source}
        {validCombo.target}
      </h1>
      <button onClick={showcombo}>{score}</button>
      <ReactFlow
        nodeTypes={nodeTypes}
        nodes={nodes}
        edges={edges}
        onEdgesChange={resetPuzzle}
        panOnDrag={false}
        zoomOnScroll={false}
        zoomOnDoubleClick={false}
        zoomOnPinch={false}
        panOnScroll={false}
        fitView={true}
        autoPanOnConnect={false}
        onConnect={onConnect}
        connectionMode="loose"
        connectionLineType="straight"
        connectionLineStyle={connectionLineStyle}
      ></ReactFlow>
    </div>
  );
}
