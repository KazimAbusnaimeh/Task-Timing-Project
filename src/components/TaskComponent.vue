<template>
  <div>
    <h3>{{ `Task ${task.id} : ${task.name}` }}</h3>
    <p>{{ task.description }}</p>
    <p>{{ formatTime(task.timer) }}</p>
  </div>
</template>

<script>
import { formatTime } from "@/utils.js";
export default {
  props: ["task"],
  methods: { formatTime },
};
</script>