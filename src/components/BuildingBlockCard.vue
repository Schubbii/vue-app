<template>
  <div class="building-block-card">
    <slot name="image"></slot>

    <div class="card-content">
      <slot name="title"></slot>

      <slot></slot>

      <slot name="footer"></slot>
    </div>
  </div>
</template>
