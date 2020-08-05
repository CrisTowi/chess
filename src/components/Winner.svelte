<script>
export let winner;
</script>

<style>
.Winner {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 100%;
}

.Winner-title {
  color: white;
  margin-bottom: 30px;
}

@media screen and (max-width: 768px) {
  .Winner-title {
    padding: 10px;
    text-align: center;
  }
}
</style>

<div class="Winner">
  <div class="Winner-title">
    <h2>{`The winner is ${winner.toUpperCase(0)} pieces!`}</h2>
  </div>
</div>