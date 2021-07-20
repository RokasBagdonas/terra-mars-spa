<template>
  submitted: {{ active }} <br/>
  message: {{ message }}
  <div class="modal" :class="{ 'is-active': active }">
    <div class="modal-background"></div>
    <div class="modal-content">
      {{ message }}
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
      type: String,
      required: true,
    },
    isActive: {
      type: Boolean,
      required: true,
    },
  },
  setup(props) {
    let active = props.isActive;
    console.log(props.isActive);

    return {
      active,
    };
  },
  methods: {
    closeModal(e){
      console.log("++++ Emitted! +++++");
      this.active = false;
      this.$emit('popupClosed');

    },
  },
};
</script>
