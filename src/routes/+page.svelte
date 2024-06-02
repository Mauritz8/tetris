<script>
  import { init, updatePiece, rotate, moveRight, moveLeft, moveDown } from "$lib/index.ts"

  let game = init();

  function onKeyDown(e) {
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
</script>

<div class="flex flex-col items-center h-screen justify-center">
  {#each game.grid as row}
    <div>
    {#each row as cell}
      <div class="inline-block h-10 w-10 border border-black
          {cell === null ? '' : 'bg-green-900'}">
        &nbsp;
      </div>
    {/each}
    </div>
  {/each}
</div>

<svelte:window on:keydown={onKeyDown} />
