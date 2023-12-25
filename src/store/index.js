import { createStore } from 'vuex'

export default createStore({
  state: {
    projects:[],
    currentProject:{
      id:-1,
      name:'',
      description:'',
      tasks:[]
    },
    currentTask: {
      id:-1,
      name: '',
      description:'',
      timer: {
        hours: 0,
        minutes: 0,
        seconds: 0
      },
      timerInterval: null,
      isTimerRunning:false
    }
  },
  mutations: {
    SET_CURRENT_PROJECT(state, project) {
      state.currentProject = project;
    },
    SET_CURRENT_TASK(state, task) {
      state.currentTask = task;
    },
    ADD_PROJECT(state,{name,description}){
      const newProject = {
        id: state.projects.length + 1,
        name,
        description,
        tasks: []
      };
      state.projects.push(newProject);
      state.currentProject = newProject;
    },
    UPDATE_PROJECT_NAME(state, name) {
      state.currentProject.name = name;
    },
    UPDATE_PROJECT_DESCRIPTION(state,description){
      state.currentProject.description=description
    },
    ADD_TASK(state, { name, description ,timer}) {
      const newTask = {
        id: state.currentProject.tasks.length + 1,
        name,
        description,
        timer: {
          hours: 0,
          minutes: 0,
          seconds: 0,
          ...timer,
        },
        timerInterval: null,
        isTimerRunning: false,
      };
    
      state.currentProject.tasks.push(newTask);
      state.currentTask = newTask;
    },
    UPDATE_TASK_NAME(state, name) {
        state.currentTask.name = name;
      },
      UPDATE_TASK_DESCRIPTION(state,description){
        state.currentTask.description=description
      },
      START_TIMER(state) {
        state.currentTask.isTimerRunning = true;
        state.currentTask.timerInterval = setInterval(() => {
          state.currentTask.timer.seconds++;
          if (state.currentTask.timer.seconds === 60) {
            state.currentTask.timer.seconds = 0;
            state.currentTask.timer.minutes++;
            if (state.currentTask.timer.minutes === 60) {
              state.currentTask.timer.minutes = 0;
              state.currentTask.timer.hours++;
            }
          }
        }, 1000);
      },
      STOP_TIMER(state) {
        state.currentTask.isTimerRunning = false;
        clearInterval(state.currentTask.timerInterval);
      },
      FINISH_TIMER(state) {
        
        clearInterval(state.currentTask.timerInterval);
        state.currentTask.timer = { hours: 0, minutes: 0, seconds: 0 };
      }
    },
    actions: {
      setCurrentProject({ commit }, project) {
        commit('SET_CURRENT_PROJECT', project);
      },
      setCurrentTask({ commit }, task) {
        commit('SET_CURRENT_TASK', task);
      },
      addProject({ commit }, { name, description }) {
        commit('ADD_PROJECT', { name, description });
      },
      updateProjectName({ commit }, name) {
        commit('UPDATE_PROJECT_NAME', name);
      },
      updateProjectDescription({ commit }, description) {
        commit('UPDATE_PROJECT_DESCRIPTION', description);
      },
      addTask({ commit}, {name,description,timer} ) {
        commit('ADD_TASK', { name,description,timer} );
      },
      updateTaskName({ commit }, name) {
        commit('UPDATE_TASK_NAME', name);
      },
      updateTaskDescription({ commit }, description) {
        commit('UPDATE_TASK_DESCRIPTION', description);
      },
      startTimer({ commit }) {
        commit('START_TIMER');
      },
      stopTimer({ commit }) {
        commit('STOP_TIMER');
      },
      finishTimer({ commit }) {
        commit('FINISH_TIMER');
      }
    }
})
