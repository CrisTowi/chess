<script>
export let color;
export let row;
export let column;
</script>
<style>
.Cell {
  background: #D6C5C5;
  border-collapse: collapse;
}

.Cell--black {
  background: #957656;
}

.Marks-container {
  height: 100%;
  position: relative;
  width: 100%;
}

.row-mark {
  color: #D6C5C5;
  font-weight: 600;
  left: 5px;
  position: absolute;
  top: 5px;
}

.row-mark--black {
  color: #957656;
}

.column-mark {
  bottom: 5px;
  color: #D6C5C5;
  font-weight: 600;
  position: absolute;
  right: 5px;
  text-align: right;
}

.column-mark--black {
  color: #957656;
}
</style>

<div class={`Cell ${color === 'black' ? 'Cell--black' : ''}`}>
  <div class="Marks-container">
    {#if row}
      <div class={`row-mark ${color === 'white' ? 'row-mark--black' : ''}`}>
        {row}
      </div>
    {/if}
    {#if column}
      <div class={`column-mark ${color === 'white' ? 'column-mark--black' : ''}`}>
        {column}
      </div>
    {/if}
  </div>
</div>