const SvgEdgeGroup = ({ edge, source, target, claimedBy, onClick }: any) => {
    const strokeColor = claimedBy === 1
    ? "#3b82f6"
    : claimedBy === 2
    ? "#ef4444"
    : "#94a3b8"

  return (
    <g>
      <line
        x1={source.x}
        y1={source.y}
        x2={target.x}
        y2={target.y}
        stroke={strokeColor}
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
        onClick={()=>{onClick(edge.id)}}
      />
    </g>

  )
}

export default SvgEdgeGroup