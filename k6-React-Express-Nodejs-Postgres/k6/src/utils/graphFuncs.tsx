import { UndirectedGraph } from "graphology"

export function hasCycleOfLengthN(graph: UndirectedGraph, n: number): boolean {
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