<template>
  <div class="min-h-screen flex items-center justify-center bg-gray-50">
    <DataTable />
  </div>
</template>

<script>
import DataTable from './components/DataTable.vue';

export default {
  components: {
    DataTable,
  },
};
</script>
