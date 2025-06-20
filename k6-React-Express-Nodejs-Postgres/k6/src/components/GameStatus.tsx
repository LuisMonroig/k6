const GameStatus = ({ activeEdgesCount, totalEdges, currentPlayer, winner }: any) => {
    return (
        //TODO: Place this p tag with the instructions in a separate component for all the instructions 
        <div className="mt-6 mb-6 text-center text-gray-600">
            <div style={{ textAlign: "center" }}>
                <a href="https://en.wikipedia.org/wiki/Sim_(game)" className="text-blue-600 underline font-semibold">
                    K6 Game Rules:
                </a>
                <p></p>
                <div style={{ display: "inline-flex", flexDirection: "column", gap: "0.25rem", alignItems: "flex-start" }}>
                    <div style={{ display: "flex", gap: "0.5rem" }}>
                    <span>(1)</span>
                    <span>Click on any edge to claim it</span>
                    </div>
                    <div style={{ display: "flex", gap: "0.5rem" }}>
                    <span>(2)</span>
                    <span>Players alternate turns</span>
                    </div>
                    <div style={{ display: "flex", gap: "0.5rem" }}>
                    <span>(3)</span>
                    <span>First to make a triangle loses.</span>
                    </div>
                </div>
            </div>

            {winner === "" ? (
                <p className="mt-1 font-semibold">
                Current Player:{" "}
                <span className={currentPlayer === 1 ? "text-blue-600" : "text-red-600"}>
                    Player {currentPlayer}
                </span>
                </p>
            ) : (
                <div className="flex items-center justify-center gap-2">
                <p className={`mt-1 font-semibold text-black-600 ${Number(winner) === 1 ? "text-blue-600" : "text-red-600"}`}>
                    Player {winner} Wins!
                </p>
                <p>|</p>
                <p className={`mt-1 font-semibold text-black-600 ${Number(winner) === 2 ? "text-blue-600" : "text-red-600"}`}>
                    Player {Number(winner) === 1 ? 2 : 1
                    
                    } Loses!
                </p>
                </div>
            )}

            <p className="mt-2 text-sm">
                Claimed edges: {activeEdgesCount}/{totalEdges}
            </p>
        </div>
    )
}

export default GameStatus;