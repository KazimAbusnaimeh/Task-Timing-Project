<template>
  <div v-if="projects.length !== 0">
    <h2>Project List</h2>
    <project-component
      v-for="project in projects"
      :key="project.id"
      :project="project"
      @click="selectProject(project)"
    />
  </div>
  <div v-else>
    <button @click="createProject">create the first project</button>
  </div>
</template>

<script>
import ProjectComponent from "@/components/ProjectComponent";

export default {
  components: {
    ProjectComponent,
  },
  computed: {
    projects() {
      return this.$store.state.projects;
    },
  },
  methods: {
    selectProject(project) {
      this.$store.dispatch("setCurrentProject", project);
      this.$router.push("/project");
    },
    createProject() {
      this.$router.push("/project");
    },
  },
};
</script>


