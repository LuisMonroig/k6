const GameStatus = ({ activeEdgesCount, totalEdges, currentPlayer, winner }: any) => {
    return (
        //TODO: Place this p tag with the instructions in a separate component for all the instructions 
        <div className="mt-6 mb-6 text-center text-gray-600">
            <p>Click on any edge to claim it (players alternate turns)</p>
            <p className="mt-2 text-sm">
                Claimed edges: {activeEdgesCount}/{totalEdges}
            </p>
            {winner === "" ? (
                <p className="mt-1 font-semibold">
                Current Player:{" "}
                <span className={currentPlayer === 1 ? "text-blue-600" : "text-red-600"}>
                    Player {currentPlayer}
                </span>
                </p>
            ) : (
                <p className={`mt-1 font-semibold text-black-600 ${winner === 1 ? "text-blue-600" : "text-red-600"}`}>
                Player {winner} Wins!
                </p>
            )}
        </div>
    )
}

export default GameStatus;