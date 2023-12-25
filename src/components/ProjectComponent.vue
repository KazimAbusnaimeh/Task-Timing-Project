<template>
  <div>
    <h2 class="title">{{ `project ${project.id} : ${project.name}` }}</h2>
    <p class="description">
      {{ project.description }}
    </p>
    <task-component
      v-for="task in project.tasks"
      :key="task.id"
      :task="task"
      @click="setCurrentTask(task)"
    ></task-component>
  </div>
</template>

<script>
import { formatTime } from "@/utils";
import TaskComponent from "./TaskComponent.vue";
export default {
  components: { TaskComponent },
  props: ["project"],
  computed: {
    currentProject() {
      return this.$store.state.currentProject;
    },
  },
  methods: {
    formatTime,
    setCurrentTask(task) {
      this.$store.dispatch("setCurrentTask", task);
      this.$router.push("/tasks");
    },
  },
};
</script>