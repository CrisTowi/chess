<script>
export let onClick;
</script>

<style>
.TimeSelect {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 100%;
}

.TimeSelect-instructions {
  color: white;
  margin-bottom: 30px;
}

.TimeSelect-Selector {
  display: flex;
  justify-content: space-around;
  width: 100%;
}

.TimeSelect-Option {
  height: 30px;
  width: 150px;
  color: white;
  padding: 30px;
  text-align: center;
  border: 1px solid white;
  border-radius: 6px;
  font-size: 24px;
  font-weight: 600;
  cursor: pointer;
  transition: transform 0.3s;
}

.TimeSelect-Option:hover {
  transform: scale(1.05);
}
</style>

<div class="TimeSelect">
  <div class="TimeSelect-instructions">
    <h2>Please select a time limit</h2>
  </div>
  <div class="TimeSelect-Selector">
    <div on:click={() => onClick(10 * 60 * 1000)} class="TimeSelect-Option">
      10 minutes
    </div>
    <div on:click={() => onClick(5 * 60 * 1000)} class="TimeSelect-Option">
      5 minutes
    </div>
    <div on:click={() => onClick(3 * 60 * 1000)} class="TimeSelect-Option">
      3 minutes
    </div>
  </div>
</div>