<template>
  <nav>
    <router-link to="/">Home</router-link> |
    <router-link to="/project">Project</router-link> |
    <router-link to="/tasks">Task</router-link>
  </nav>
</template>
<style lang="scss">
nav {
  padding: 30px;

  a {
    font-weight: bold;
    color: #2c3e50;

    &.router-link-exact-active {
      color: #42b983;
    }
  }
}
</style>