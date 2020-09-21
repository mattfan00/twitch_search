<template>
  <div class="search-bar">
    <form @submit.prevent="handleSubmit">
      <input placeholder="Enter a Twitch username" v-model="username"/>
      <button type="submit">Search</button>
    </form>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  name: 'SearchBar',
  data() {
    return {
      username: ""
    }
  },
  methods: {
    async handleSubmit() {
      if (this.username == "") {
        this.$emit("results-error", {message: "Please enter in a username"});
      } else {
        this.$emit("set-loading", true)
        let url = "http://localhost:3000/channels?name=" + this.username;
        let results = await axios.get(url)
          .catch(err => err.response)
        this.$emit("set-loading", false)

        !results.data.error ? this.$emit("get-results", results.data) : this.$emit("results-error", results.data.error)
      }
    }
  }
}
</script>

<style scoped>
.search-bar form {
  display: grid;
  column-gap: 10px;
  grid-template-columns: auto 75px;
}

.search-bar input {
  padding: 10px;
}

.search-bar button {
  cursor: pointer;
}
</style>