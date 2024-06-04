<script>
  import { init, getNewPiece, isPieceDone, isSpawnOnPiece, isOutsideHoriz } from "$lib/index.ts";
  import { rotate, moveRight, moveLeft, moveDown } from "$lib/piece.ts";
  import { Shape } from "$lib/tetromino.ts";

  let isPlaying = false;
  let game = init();
	let frameStepperId;


	async function nextFrame(piece) {
  	if (isOutsideHoriz(game, piece)) return;

    const pieceDone = isPieceDone(game, piece);
		if (!pieceDone) {
			game.piece.cells.forEach(pos => {
				game.grid[pos.y][pos.x] = null;
			});
		}

    const newPiece = pieceDone ? getNewPiece(game.cols) : piece;
    const isLost = pieceDone && isSpawnOnPiece(game, newPiece);
    newPiece.cells.forEach(pos => {
      game.grid[pos.y][pos.x] = newPiece.tetromino.shape;
    });
    game.piece = newPiece;

    if (isLost) {
      isPlaying = false;
      clearInterval(frameStepperId);
      await new Promise(r => setTimeout(r, 500));
      alert("You lost :(");
    }
	}

  function onKeyDown(e) {
    if (!isPlaying) return;

		let piece;
    switch (e.key) {
      case "ArrowUp":
        piece = rotate(game.piece);
				break;
      case "ArrowRight":
        piece = moveRight(game.piece);
				break;
      case "ArrowLeft":
        piece = moveLeft(game.piece);
				break;
      case "ArrowDown":
        piece = moveDown(game.piece);
				break;
      default: 
        return;
    }
		nextFrame(piece);
	}

  function startGame() {
    isPlaying = true;
    frameStepperId = setInterval(() => {
			const piece = moveDown(game.piece);
			nextFrame(piece)
    }, 500);
  }
</script>

<div class="flex flex-col items-center h-screen justify-around bg-blue-800">
  <h1 class="text-2xl font-bold text-white">Tetris</h1>
  <div class="flex flex-col">
    {#each game.grid as row}
      <div>
      {#each row as cell}
        <div class="inline-block h-10 w-10 ring-1 ring-white
            { cell === Shape.T ? 'bg-purple-500' 
            : cell === Shape.I ? 'bg-cyan-400'
            : cell === Shape.O ? 'bg-yellow-400'
            : cell === Shape.J ? 'bg-blue-500'
            : cell === Shape.L ? 'bg-orange-500'
            : cell === Shape.S ? 'bg-green-500'
            : cell === Shape.Z ? 'bg-red-500'
            : 'bg-black'}">
          &nbsp;
        </div>
      {/each}
      </div>
    {/each}
  </div>
  <button class="bg-cyan-500 rounded-full px-36 py-2 text-lg font-bold
      text-white" on:click={startGame}>
    Start
  </button>
</div>

<svelte:window on:keydown={onKeyDown} />
