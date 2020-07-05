<script>
export let visible = false;
</script>

<style>
.Modal {
  position: fixed;
  left: 0px;
  right: 0px;
  background-color: rgba(0, 0, 0, 0.8);
  height: 100vh;
  transition: top 0.3s;
  z-index: 1;
}

.Modal--visible {
  top: 0px;
}

.Modal--hidden {
  top: -100vh;
}
</style>

<div class={`Modal Modal--${visible ? 'visible' : 'hidden'}`}>
  <slot />
</div>
