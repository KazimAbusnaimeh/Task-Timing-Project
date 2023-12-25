<template>
  <div v-if="currentProject.id != -1">
    <h2>
      {{ `This is the current project: ${currentProject.name}` }}
    </h2>
    <input v-model="taskName" placeholder="Enter task name" />
    <input v-model="taskDescription" placeholder="Enter task Description" />
    <button @click="start">start</button>
    <p>{{ formatTime(timer) }}</p>
    <button @click="restart">start</button>
    <button @click="stop">Stop</button>
    <button @click="finish">Finish</button>
  </div>
  <div v-else>
    <h2>Pick The Project First</h2>
  </div>
</template>

<script>
import { formatTime } from "@/utils";
export default {
  data() {
    return {
      taskName: "",
      taskDescription: "",
      dataInterphase: true,
    };
  },
  computed: {
    currentProject() {
      return this.$store.state.currentProject;
    },
    timer() {
      return this.$store.state.currentTask.timer;
    },
    isTaskDataFilled() {
      return this.taskName && this.taskDescription;
    },
    isTimerRunning() {
      return this.$store.state.currentTask.isTimerRunning;
    },
  },
  mounted() {
    this.taskName = this.$store.state.currentTask.name;
    this.taskDescription = this.$store.state.currentTask.description;
  },
  methods: {
    start() {
      if (this.isTaskDataFilled && !this.isTimerRunning) {
        this.dataInterphase = false;
        this.$store.dispatch("startTimer");
      }
    },
    restart() {
      if (!this.isTimerRunning) this.$store.dispatch("startTimer");
    },
    stop() {
      this.$store.dispatch("stopTimer");
    },
    finish() {
      this.stop();
      if (this.currentTask == null || this.currentTask.id == -1) {
        this.$store.dispatch("addTask", {
          id: this.currentProject.tasks.length + 1,
          name: this.taskName,
          description: this.taskDescription,
          timer: {
            hours: 0,
            minutes: 0,
            seconds: 0,
          },
        });
      }
      this.$store.dispatch("finishTimer");
      this.$router.push("/");
    },
    formatTime,
  },
};
</script>