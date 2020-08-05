<script>
export let url;
</script>

<style>
.ShareGame {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 100%;
  text-align: center;
}

.ShareGame-instructions {
  color: white;
  margin-bottom: 30px;
}

@media screen and (max-width: 768px) {
  .ShareGame-instructions {
    padding: 10px;
    text-align: center;
  }
}
</style>

<div class="ShareGame">
  <div class="ShareGame-instructions">
    <h2>Share this link with a friend: </h2>
    <input value={url} />
  </div>
</div>