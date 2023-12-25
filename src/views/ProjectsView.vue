<template>
  <div>
    <h2 v-if="currentProject.id != -1">
      {{ `This is the current project: ${currentProject.name}` }}
    </h2>
    <h3>{{ currentProject.id != -1 ? "Update Project" : "Create Project" }}</h3>
    <input v-model="name" placeholder="Project Name" />
    <input v-model="description" placeholder="Project Description" />
    <button @click="currentProject.id != -1 ? saveChanges() : createProject()">
      {{ currentProject.id != -1 ? "Save Changes" : "Create Project" }}
    </button>
    <div>
      <h1></h1>
      <button v-if="currentProject.id != -1" @click="currentProjectDismiss">
        Create new Project
      </button>
      <h3 v-if="currentProject.id != -1">
        {{ currentProject.tasks.length > 0 ? "Tasks" : "No tasks yet" }}
      </h3>
      <task-component
        v-for="task in currentProject.tasks"
        :key="task.id"
        :task="task"
        @click="setCurrentTask(task)"
      ></task-component>
      <button v-if="currentProject.id != -1" @click="addNewTask">
        add new Task
      </button>
    </div>
  </div>
</template>

<script>
import TaskComponent from "@/components/TaskComponent.vue";
export default {
  data() {
    return {
      name: "",
      description: "",
    };
  },
  components: { TaskComponent },
  computed: {
    currentProject() {
      return this.$store.state.currentProject;
    },
  },
  mounted() {
    this.name = this.currentProject.name;
    this.description = this.currentProject.description;
  },
  methods: {
    currentProjectDismiss() {
      this.name = "";
      this.description = "";
      this.$store.dispatch("setCurrentProject", {
        id: -1,
        name: "",
        description: "",
        tasks: [],
      });
    },
    saveChanges() {
      this.$store.dispatch("updateProjectName", this.name);
      this.$store.dispatch("updateProjectDescription", this.description);
      this.$router.push("/");
    },
    createProject() {
      this.$store.dispatch("addProject", {
        name: this.name,
        description: this.description,
      });
      this.$router.push("/");
    },
    setCurrentTask(task) {
      this.$store.dispatch("setCurrentTask", task);
      this.$router.push("/tasks");
    },
    addNewTask() {
      this.$store.dispatch("resetCurrentTask");
      this.$router.push("/tasks");
    },
  },
};
</script>