<template>
  <PixelSpinner
    :animation-duration="3000"
    :size="30"
    :color="'#00202e'"
  />
</template>

<script>
import { PixelSpinner } from "epic-spinners";
export default {
  components: {
    PixelSpinner,
  },
};
</script>
