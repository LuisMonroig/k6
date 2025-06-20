"use client"
import { useState, useRef, useEffect } from "react"
import { UndirectedGraph } from "graphology"

import activateSound from "../assets/mp3files/activate.mp3"
import { hasCycleOfLengthN } from "../utils/graphFuncs"

import SvgEdgeGroup from "./SvgEdgeGroup"
import SvgNodeGroup from "./SvgNodeGroup"
import GameStatus from "./GameStatus"
import PlayAgainButton from "./PlayAgainButton"

export default function K6Plot() {
  const [activeEdges, setActiveEdges] = useState<Record<string, number>>({})
  const [currentPlayer, setCurrentPlayer] = useState(1)
  const [winner, setWinner] = useState<string>("")

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
    if (winner === "") {
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

        const [source, target] = edgeId.split("-")

        if (currentPlayer === 1) {
          if (!player1GraphRef.current.hasEdge(source, target)) {
            player1GraphRef.current.addEdge(source, target, { id: edgeId })
          }
          if (hasCycleOfLengthN(player1GraphRef.current, 3)) {
            setWinner("2")
          }
        } else {
          if (!player2GraphRef.current.hasEdge(source, target)) {
            player2GraphRef.current.addEdge(source, target, { id: edgeId })
          }
          if (hasCycleOfLengthN(player2GraphRef.current, 3)) {
            setWinner("1")
          }
        }

        setCurrentPlayer(currentPlayer === 1 ? 2 : 1)
        return updatedEdges
      })
    }
  }

  const handleReset = () => {
    setActiveEdges({})
    setCurrentPlayer(1)
    setWinner("")

    player1GraphRef.current.clear()
    player2GraphRef.current.clear()

    nodes.forEach((node) => {
      player1GraphRef.current.addNode(node.id)
      player2GraphRef.current.addNode(node.id)
    })
  }

  return (
    <div>
      <GameStatus
        activeEdgesCount={Object.entries(activeEdges).length}
        totalEdges={edges.length}
        currentPlayer={currentPlayer}
        winner={winner}
      />

      {/* conditionally render play again button when there is a winner */}
      {winner && <PlayAgainButton onClick={handleReset} />} {/*TODO: decouple GameStatus and PlayAgain button */}

      <svg width="400" height="400" className="mx-auto">
        {/* plotting Edges */}
        {edges.map((edge) => {
          const source = nodes.find((n) => n.id === edge.source)!
          const target = nodes.find((n) => n.id === edge.target)!
          const claimedBy = activeEdges[edge.id]
          return (
            <SvgEdgeGroup
              key={edge.id}
              {...{ edge, source, target, claimedBy }}
              onClick={handleEdgeClick}
            />
          )
        })}
        {/* plotting Nodes */}
        {nodes.map((node) => (
          <SvgNodeGroup key={node.id} {...{ node }} />
        ))}
      </svg>
    </div>
  )
}
