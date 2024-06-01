<script>
  import { init } from "$lib/index.ts"

  let game = init();
</script>

<h1>PieceType: { game.piece.pieceType }</h1>
<div class="flex flex-col items-center">
  {#each game.grid as row}
    <div>
    {#each row as _}
      <div class="inline-block h-10 w-10 border border-black">&nbsp;</div>
    {/each}
    </div>
  {/each}
</div>
