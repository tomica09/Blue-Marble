<script>
  import { createEventDispatcher } from 'svelte';

  const dispatch = createEventDispatcher();

  function rollDice() {
    dispatch('roll');
  }
</script>

<button on:click={rollDice}>주사위 굴리기</button>
