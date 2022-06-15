<template>
  <div id="app" class="container">
    <h1 class="text-center">Users Data Table</h1>

    <table id="myTable" class="table table-bordered mt-5">
      <thead>
        <tr>
          <th>ID</th>
          <th>Name</th>
          <th>Email</th>
        </tr>
      </thead>
      <tbody />
    </table>
  </div>
</template>

<script>
import axios from 'axios';
import $ from 'jquery';
export default {
  mounted() {
    this.getUsers();
  },
  methods: {
    getUsers() {
      axios
        .get('/api/users-data')
        .then((response) => {
          console.log(response);
          $('#myTable').DataTable({
            data: response.data.data,
            columns: [
              { data: 'id' },
              { data: 'name' },
              { data: 'email' },
            ],
          });
        })
        .catch((error) => console.log(error.response));
    },
  },
};
</script>
<style src="bootstrap/dist/css/bootstrap.min.css"></style>
<style src="datatables.net-bs4/css/dataTables.bootstrap4.min.css"></style>
<style src="datatables.net-buttons-bs4/css/buttons.bootstrap4.min.css"></style>
