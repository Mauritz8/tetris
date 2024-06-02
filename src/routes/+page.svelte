<script>
  import { init, rotateTetromito, moveTetromitoRight, moveTetromitoLeft,
  moveTetromitoDown } from "$lib/index.ts"

  let game = init();

  function onKeyDown(e) {
    switch (e.key) {
      case "ArrowUp":
        rotateTetromito(game);
        break;
      case "ArrowRight":
        moveTetromitoRight(game);
        break;
      case "ArrowLeft":
        moveTetromitoLeft(game);
        break;
      case "ArrowDown":
        moveTetromitoDown(game);
        break;
    }
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
