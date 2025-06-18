
"use client"
import { useState, useRef, useEffect } from "react"
import { UndirectedGraph } from "graphology"
import activateSound from "../assets/mp3files/activate.mp3"

export default function HexagonNetwork() {
  const [activeEdges, setActiveEdges] = useState<Record<string, number>>({})
  const [currentPlayer, setCurrentPlayer] = useState(1)
  const [winner,setWinner] = useState<string>("");

  const activateAudioRef = useRef<HTMLAudioElement | null>(null)
  const player1GraphRef = useRef(new UndirectedGraph())
  const player2GraphRef = useRef(new UndirectedGraph())

  const radius = 180
  const center = { x: 200, y: 200 }

  const nodes = Array.from({ length: 6 }).map((_, i) => {
    const angle = (Math.PI / 3) * i - Math.PI / 2
    return {
      id: i.toString(),
      x: center.x + radius * Math.cos(angle),
      y: center.y + radius * Math.sin(angle),
    }
  })

  const edges = []
  for (let i = 0; i < nodes.length; i++) {
    for (let j = i + 1; j < nodes.length; j++) {
      edges.push({
        id: `${i}-${j}`,
        source: i.toString(),
        target: j.toString(),
      })
    }
  }

  useEffect(() => {
    activateAudioRef.current = new Audio(activateSound)
    
    nodes.forEach((node) => {
      if (!player1GraphRef.current.hasNode(node.id)) {
        player1GraphRef.current.addNode(node.id)
      }
      if (!player2GraphRef.current.hasNode(node.id)) {
        player2GraphRef.current.addNode(node.id)
      }
    })
  }, [])
  
  const handleEdgeClick = (edgeId: string) => {
    // it there is a winner then this function will do nothing
    if (winner === ""){
      setActiveEdges((prev) => {
        if (prev[edgeId] !== undefined) return prev

        if (activateAudioRef.current) {
          activateAudioRef.current.currentTime = 0
          activateAudioRef.current.play().catch(console.warn)
        }

        const updatedEdges = {
          ...prev,
          [edgeId]: currentPlayer,
        }

        const [source, target] = edgeId.split('-')

        if (currentPlayer === 1) {
          if (!player1GraphRef.current.hasEdge(source, target)) {
            player1GraphRef.current.addEdge(source, target, { id: edgeId });
          }
          if (hasCycleOfLengthN(player1GraphRef.current, 3)) {
            setWinner("2");
            //setWinner("Player 1 formed a 3-length cycle!, Player 2 Wins!");
            console.log(winner);
          }
        } else {
          if (!player2GraphRef.current.hasEdge(source, target)) {
            player2GraphRef.current.addEdge(source, target, { id: edgeId });
          }
          if (hasCycleOfLengthN(player2GraphRef.current, 3)) {
            setWinner("1");
            // setWinner("Player 2 formed a 3-length cycle!, Player 1 Wins!");
            console.log(winner);
          }
        }
        
        setCurrentPlayer(currentPlayer === 1 ? 2 : 1)
        return updatedEdges
      })
    }
  }

  function hasCycleOfLengthN(graph: UndirectedGraph, n: number): boolean {
    function dfs(node: string, start: string, depth: number, path: string[]): boolean {
      if (depth === 0) return graph.hasEdge(node, start)

      for (const neighbor of graph.neighbors(node)) {
        if (!path.includes(neighbor)) {
          path.push(neighbor)
          if (dfs(neighbor, start, depth - 1, path)) return true
          path.pop()
        }
      }
      return false
    }

    for (const node of graph.nodes()) {
      if (dfs(node, node, n - 1, [node])) return true
    }

    return false
  }

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="bg-white p-8 rounded-xl shadow-lg">
        <h1 className="text-2xl font-bold mb-6 text-center">Interactive Hexagon Network</h1>
        <svg width="400" height="400" className="mx-auto">
          {edges.map((edge) => {
            const source = nodes.find((n) => n.id === edge.source)!
            const target = nodes.find((n) => n.id === edge.target)!
            const claimedBy = activeEdges[edge.id]

            return (
              <g key={edge.id}>
                <line
                  x1={source.x}
                  y1={source.y}
                  x2={target.x}
                  y2={target.y}
                  stroke={
                    claimedBy === 1
                      ? "#3b82f6"
                      : claimedBy === 2
                      ? "#ef4444"
                      : "#94a3b8"
                  }
                  strokeWidth={claimedBy ? 4 : 2}
                />
                <line
                  x1={source.x}
                  y1={source.y}
                  x2={target.x}
                  y2={target.y}
                  stroke="transparent"
                  strokeWidth={20}
                  className="cursor-pointer"
                  onClick={() => handleEdgeClick(edge.id)}
                />
              </g>
            )
          })}

          {nodes.map((node) => (
            <g key={node.id}>
              <circle
                cx={node.x}
                cy={node.y}
                r={20}
                className="fill-emerald-500 stroke-white stroke-2"
              />
              <text
                x={node.x}
                y={node.y}
                textAnchor="middle"
                dy="5"
                className="text-white font-bold text-sm"
              >
                {parseInt(node.id) + 1}
              </text>
            </g>
          ))}
        </svg>

        <div className="mt-6 text-center text-gray-600">
          <p>Click on any edge to claim it (players alternate turns)</p>
          <p className="mt-2 text-sm">
            Claimed edges: {Object.entries(activeEdges).length}/{edges.length}
          </p>
          { winner === "" && <p className="mt-1 font-semibold">
            Current Player:{" "}
            <span className={currentPlayer === 1 ? "text-blue-600" : "text-red-600"}>
              Player {currentPlayer}
            </span>
          </p>}

          { winner !== "" && <p className="mt-1 font-semibold">
            <span className={"text-black-600"}>
              Player {winner} Wins!
            </span>
          </p>}

        </div>
      </div>
    </div>
  )
}
