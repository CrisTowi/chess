<script>
export let onClick;
</script>

<style>
.GameSelect {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 100%;
}

.GameSelect-instructions {
  color: white;
  margin-bottom: 30px;
}

.GameSelect-Selector {
  display: flex;
  justify-content: space-around;
  align-items: center;
  width: 100%;
}

.GameSelect-Option {
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

.GameSelect-Option:hover {
  transform: scale(1.05);
}

@media screen and (max-width: 768px) {
  .GameSelect-instructions {
    padding: 10px;
    text-align: center;
  }

  .GameSelect-Selector {
    flex-direction: column;
  }

  .GameSelect-Option {
    margin-top: 20px;
  }
}
</style>

<div class="GameSelect">
  <div class="GameSelect-instructions">
    <h2>Type of game!</h2>
  </div>
  <div class="GameSelect-Selector">
    <div on:click={() => onClick('local')} class="GameSelect-Option">
      Local
    </div>
    <div on:click={() => onClick('network')} class="GameSelect-Option">
      Network
    </div>
  </div>
</div>
