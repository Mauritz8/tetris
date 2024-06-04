<script>
  import { init, updatePiece } from "$lib/index.ts";
  import { rotate, moveRight, moveLeft, moveDown } from "$lib/piece.ts";
  import { Shape } from "$lib/tetromino.ts";

  let started = false;
  let game = init();

  function onKeyDown(e) {
    if (!started) return;
    let f;
    switch (e.key) {
      case "ArrowUp":
        f = rotate(game.piece);
        break;
      case "ArrowRight":
        f = moveRight(game.piece);
        break;
      case "ArrowLeft":
        f = moveLeft(game.piece);
        break;
      case "ArrowDown":
        f = moveDown(game.piece);
        break;
      default:
        return;
    }
    updatePiece(game, f);
    game = game;
  }

  function startGame() {
    started = true;
    setInterval(() => {
      updatePiece(game, moveDown(game.piece));
      game = game;
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
            {cell === Shape.T ? 'bg-purple-500' 
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
