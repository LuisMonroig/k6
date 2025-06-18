"use client"
import { useState, useRef, useEffect } from "react"
import activateSound from "../assets/mp3files/activate.mp3"
// import deactivateSound from "../assets/mp3files/deactivate.mp3"

export default function HexagonNetwork() {
  // Track claimed edges and which player claimed them (1 or 2)
  const [activeEdges, setActiveEdges] = useState<Record<string, number>>({})
  const [currentPlayer, setCurrentPlayer] = useState(1) // ✅ Player state for reactivity

  const activateAudioRef = useRef<HTMLAudioElement>(null)

  useEffect(() => {
    activateAudioRef.current = new Audio(activateSound)
  }, [])

  // Hexagon layout configuration
  const radius = 120
  const center = { x: 200, y: 200 }

  // Generate 6 nodes positioned in a hexagon
  const nodes = Array.from({ length: 6 }).map((_, i) => {
    const angle = (Math.PI / 3) * i - Math.PI / 2
    return {
      id: i,
      x: center.x + radius * Math.cos(angle),
      y: center.y + radius * Math.sin(angle),
    }
  })

  // Generate edges for a complete graph between nodes
  const edges = []
  for (let i = 0; i < nodes.length; i++) {
    for (let j = i + 1; j < nodes.length; j++) {
      edges.push({
        id: `${i}-${j}`,
        source: i,
        target: j,
      })
    }
  }

  // Handle edge click — claim edge and switch player
  const handleEdgeClick = (edgeId: string) => {
    setActiveEdges((prev) => {
      if (prev[edgeId] !== undefined) return prev // already claimed

      // Play sound
      if (activateAudioRef.current) {
        activateAudioRef.current.currentTime = 0
        activateAudioRef.current.play().catch((err) => {
          console.warn("Audio play failed:", err)
        })
      }

      // Claim the edge
      const updatedEdges = {
        ...prev,
        [edgeId]: currentPlayer,
      }

      // Switch to next player
      setCurrentPlayer(currentPlayer === 1 ? 2 : 1)

      return updatedEdges
    })
  }

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="bg-white p-8 rounded-xl shadow-lg">
        <h1 className="text-2xl font-bold mb-6 text-center">Interactive Hexagon Network</h1>
        <svg width="400" height="400" className="mx-auto">
          {/* Render edges */}
          {edges.map((edge) => {
            const source = nodes[edge.source]
            const target = nodes[edge.target]
            const midX = (source.x + target.x) / 2
            const midY = (source.y + target.y) / 2
            const claimedBy = activeEdges[edge.id]

            return (
              <g key={edge.id}>
                {/* Visible edge line */}
                <line
                  x1={source.x}
                  y1={source.y}
                  x2={target.x}
                  y2={target.y}
                  stroke={
                    claimedBy === 1
                      ? "#3b82f6" // Blue
                      : claimedBy === 2
                      ? "#ef4444" // Red
                      : "#94a3b8" // Gray
                  }
                  strokeWidth={claimedBy ? 4 : 2}
                  className="transition-all duration-300"
                />

                {/* Wider invisible line for easier clicking */}
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

                {/* Label if edge is claimed
                {claimedBy && (
                  <text
                    x={midX}
                    y={midY}
                    textAnchor="middle"
                    dy="-10"
                    className={`text-xs font-medium ${
                      claimedBy === 1 ? "fill-blue-600" : "fill-red-600"
                    }`}
                  >
                    {`Edge ${edge.id} - Player ${claimedBy}`}
                  </text>
                )} */}
              </g>
            )
          })}

          {/* Render nodes */}
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
                {node.id + 1}
              </text>
            </g>
          ))}
        </svg>

        <div className="mt-6 text-center text-gray-600">
          <p>Click on any edge to claim it (players alternate turns)</p>
          <p className="mt-2 text-sm">
            Claimed edges: {Object.entries(activeEdges).length}/{edges.length}
          </p>
          <p className="mt-1 font-semibold">
            Current Player:{" "}
            <span
              className={
                currentPlayer === 1 ? "text-blue-600" : "text-red-600"
              }
            >
              Player {currentPlayer}
            </span>
          </p>
        </div>
      </div>
    </div>
  )
}
