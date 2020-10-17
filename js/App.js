function findAvailablePositions(x, y, board) {
	const BSize = board.length;
	let retPositions = [];

	if (board[x][y] == 0) return retPositions;

	
	let queue = [];
	queue.push([x, y, true]);

	let visited = new Array(BSize);
	for (let i = 0; i < BSize; i++) {
		visited[i] = new Array(BSize);
		for (let j = 0; j < BSize; j++) {
			visited[i][j] = 0;
		}
	}
	visited[x][y] = 1;

	while (queue.length > 0) {
		const top = queue[0];
		queue.shift();
		const cx = top[0];
		const cy = top[1];
		const expand = top[2];
		for (let i = 0; i < DX.length; i++) {
			let tx = cx + DX[i];
			let ty = cy + DY[i];
			if (tx < 0 || ty < 0 || tx >= BSize || ty >= BSize) continue;
			if (visited[tx][ty]) continue;
			if (board[tx][ty] != 0) {
				tx += DX[i], ty += DY[i];
				if (tx < 0 || ty < 0 || tx >= BSize || ty >= BSize) continue;
				if (visited[tx][ty]) continue;
				if (board[tx][ty] != 0) continue;
				visited[tx][ty] = 1;
				retPositions.push([tx, ty]);
				queue.push([tx, ty, false]);
			} else if (expand) {
				visited[tx][ty] = 1;
				retPositions.push([tx, ty]);
			}
		}
	}
	return retPositions;
}