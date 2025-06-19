const SvgNodeGroup = ({ node }: any) => {
  return (
        <g>
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
            {/* to add numbers on top of the node, uncomment this line {parseInt(node.id) + 1} */} 
        </text>
        </g>
    )
}

export default SvgNodeGroup