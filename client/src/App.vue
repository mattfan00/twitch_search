<template>
  <div class="main">
    <SearchBar 
      @get-results="getResults" 
      @results-error="resultsError" 
      @set-loading="setLoading" 
    />
    <ResultsBar 
      v-bind:user="user" 
      v-bind:err="err" 
      v-bind:loading="loading" 
    />
  </div>
</template>

<script>
import SearchBar from './components/SearchBar.vue';
import ResultsBar from './components/ResultsBar.vue';

export default {
  name: 'App',
  components: {
    SearchBar,
    ResultsBar
  },
  data() {
    return {
      user: null,
      err: null,
      loading: false
    }
  },
  methods: {
    getResults(results) {
      this.err = null;
      this.user = results;
    }, 
    resultsError(err) {
      this.user = null;
      this.err = err;
    },
    setLoading(isLoading) {
      this.loading = isLoading;
    }
  }
}
</script>

<style>
body {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}

.main {
  max-width: 400px;
  margin: 0 auto;
  margin-top: 100px;
}
</style>
