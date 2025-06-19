import React from "react"

interface PlayAgainButtonProps {
  onClick: () => void
}

const PlayAgainButton: React.FC<PlayAgainButtonProps> = ({ onClick }) => {
  return (
    <div className="text-center my-4">
      <button
        onClick={onClick}
        className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700"
      >
        Play Again
      </button>
    </div>
  )
}

export default PlayAgainButton
