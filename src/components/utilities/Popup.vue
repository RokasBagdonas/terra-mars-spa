<template>
  <div class="modal" :class="{ 'is-active': isActive }">
    <div class="modal-background"></div>
    <div class="modal-content">
    <p class="box">
      {{ "201" == message ? "Success" : message }}
    </p>
    </div>
    <button
      class="modal-close is-large"
      aria-label="close"
      @click="closeModal"
    ></button>
  </div>
</template>

<script>
export default {
  props: {
    message: {
      required: true,
    },
    isActive: {
      type: Boolean,
      required: true,
    },
  },
  emits: ["popupClosed"],
  methods: {
    closeModal(){
      this.$emit('popupClosed');

    },
  },
};
</script>
