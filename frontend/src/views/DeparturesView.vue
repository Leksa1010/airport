<script setup lang="ts">

</script>

<template>

  <div id="Departures">
    <h1 class="h3">Dolasci</h1>
    <hr>
    <nav aria-label="Page navigation example">
      <ul class="pagination justify-content-center">
        <li class="page-item">
          <a class="page-link" href="#" aria-label="Previous">
            <span aria-hidden="true">&laquo;</span>
          </a>
        </li>
        <li class="page-item"><a class="page-link" href="#">1</a></li>
        <li class="page-item"><a class="page-link" href="#">2</a></li>
        <li class="page-item"><a class="page-link" href="#">3</a></li>
        <li class="page-item">
          <a class="page-link" href="#" aria-label="Next">
            <span aria-hidden="true">&raquo;</span>
          </a>
        </li>
      </ul>
    </nav>
    <table class="table table-striped table-hover">
      <thead>
      <tr>
        <th scope="col">Broj leta</th>
        <th scope="col">Destinacija</th>
        <th scope="col">Kompanija</th>
        <th scope="col">Vreme</th>
        <th scope="col">Info</th>
      </tr>
      </thead>
      <tbody>
      <tr>
        <th scope="row">1</th>
        <td>Barsa</td>
        <td>Wiz</td>
        <td>3.4.2025. 20:00</td>
        <td>
          <button type="button" class="btn btn-primary">A</button>
          <button type="button" class="btn btn-danger">B</button>
        </td>
      </tr>
      </tbody>
    </table>
  </div>
</template>

