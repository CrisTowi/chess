<script>
export let blackRemainObj;
export let whiteRemainObj;
export let myColor;
</script>

<style>
.AsideTimer {
  height: 33.33%;
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;
  margin-left: 20px;
}

.AsideTimer-Title {
  font-weight: 900;
  font-size: 30px;
  color: #FFFFFF;
}

.AsideTimer-color {
  width: 50%;
  border: 1px solid #FFFFFF;
  color: #FFFFFF;
}

.Min-label {
  font-size: 40px;
  font-weight: 600;
}

.Sec-label {
  font-size: 30px;
}

.Ms-label {
  font-size: 20px;
}

@media screen and (max-width: 1255px) {
  .AsideTimer {
    flex-direction: column;
  }

  .AsideTimer-color {
    box-sizing: border-box;
    margin: 0px 20px;
    padding: 5px;
    width: 100%;
  }

  .AsideTimer-Title {
    margin: 0px;
  }

  .AsideTimer-Time {
    margin: 0px;
  }
}

@media screen and (max-height: 890px), screen and (max-width: 1255px) {
  .AsideTimer {
    margin: 0px;
    padding: 0px;
  }

  .Min-label {
    font-size: 20px;
    font-weight: 600;
  }

  .Sec-label {
    font-size: 15px;
  }

  .Ms-label {
    font-size: 10px;
  }
}
</style>

<div class="AsideTimer">
  <div class="AsideTimer-color">
    <p class="AsideTimer-Title">
      {#if myColor && myColor === 'black'}
        <span>
          You >
        </span>
      {/if}
      Black
    </p>
    <p class="AsideTimer-Time">
      <span class="Min-label">{blackRemainObj.min}</span>
      <span class="Sec-label">{blackRemainObj.sec}</span>
      <span class="Ms-label">{blackRemainObj.ms}</span>
    </p>
  </div>
  <div class="AsideTimer-color">
    <p class="AsideTimer-Title">
      {#if myColor && myColor === 'white'}
        <span>
          You >
        </span>
      {/if}
      White
    </p>
    <p class="AsideTimer-Time">
      <span class="Min-label">{whiteRemainObj.min}</span>
      <span class="Sec-label">{whiteRemainObj.sec}</span>
      <span class="Ms-label">{whiteRemainObj.ms}</span>
    </p>
  </div>
</div>