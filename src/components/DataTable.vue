<template>
  <div class="p-6 bg-white shadow-md rounded-lg">
    <h2 class="text-xl font-semibold mb-4">Lista de Usuarios</h2>

    <!-- Tabla -->
    <table class="w-full border-collapse border border-gray-200">
      <thead>
        <tr class="bg-gray-100">
          <th class="px-6 py-3 ">ID</th>
          <th class="px-6 py-3 ">Nombre</th>
          <th class="px-6 py-3 ">Correo</th>
          <th class="px-6 py-3 ">Teléfono</th>
          <th class="px-6 py-3 ">Acciones</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="user in paginatedUsers" :key="user.id" class="text-center">
          <td class="px-6 py-4  font-bold">{{ user.id }}</td>
          <td class="px-6 py-4 ">{{ user.name }}</td>
          <td class="px-6 py-4 ">{{ user.email }}</td>
          <td class="px-6 py-4 ">{{ user.phone }}</td>
          <td class="px-6 py-4 flex gap-2 justify-center">
            <!-- Botón Editar -->
            <button 
              @click="openEditModal(user)"
              class="px-4 py-2 rounded-md text-white font-semibold transition 
                     bg-blue-500 hover:bg-blue-400"
            >
              Editar
            </button>

            <!-- Botón Eliminar -->
            <button 
              @click="removeUser(user.id)"
              class="px-4 py-2 rounded-md text-white font-semibold transition 
                     bg-red-500 hover:bg-red-400"
            >
              Eliminar
            </button>
          </td>
        </tr>
      </tbody>
    </table>

    <!-- Paginación -->
    <div class="flex justify-between mt-4">
      <button @click="prevPage" :disabled="currentPage === 1" class="px-4 py-2 rounded-md font-semibold text-white 
               transition bg-blue-500 hover:bg-blue-400 
               disabled:bg-gray-300 disabled:cursor-not-allowed">
        Anterior
      </button>

      <span class="text-lg font-medium">Página {{ currentPage }} de {{ totalPages }}</span>

      <button @click="nextPage" :disabled="currentPage === totalPages" class="px-4 py-2 rounded-md font-semibold text-white 
               transition bg-blue-500 hover:bg-blue-400 
               disabled:bg-gray-300 disabled:cursor-not-allowed">
        Siguiente
      </button>
    </div>

    <!-- Modal de edición -->
    <EditUserModal 
      v-if="isEditModalOpen" 
      :user="editedUser"
      @close="isEditModalOpen = false"
      @save="updateUser"
    />
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue';
import { useUserStore } from '../stores/users';
import EditUserModal from './EditUserModal.vue';

// Store de usuarios
const userStore = useUserStore();

// Estado del modal de edición
const isEditModalOpen = ref(false);
const editedUser = ref(null);

// Estado de paginación
const currentPage = ref(1);
const itemsPerPage = 5;

// Cargar usuarios al montar el componente
onMounted(() => {
  userStore.fetchUsers();
});

// Función para abrir el modal de edición
const openEditModal = (user) => {
  editedUser.value = { ...user }; // Clonamos el usuario
  isEditModalOpen.value = true;
};

// Función para actualizar un usuario en la lista
const updateUser = (updatedUser) => {
  userStore.updateUser(updatedUser);
  isEditModalOpen.value = false;
};

// Función para eliminar un usuario
const removeUser = (userId) => {
  userStore.deleteUser(userId);
};

// Paginación
const paginatedUsers = computed(() => {
  const start = (currentPage.value - 1) * itemsPerPage;
  return userStore.users.slice(start, start + itemsPerPage);
});

const totalPages = computed(() => Math.ceil(userStore.users.length / itemsPerPage));

const nextPage = () => {
  if (currentPage.value < totalPages.value) {
    currentPage.value++;
  }
};

const prevPage = () => {
  if (currentPage.value > 1) {
    currentPage.value--;
  }
};
</script>
