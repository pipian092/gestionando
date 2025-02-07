import { defineStore } from 'pinia';
import { ref } from 'vue';

export const useUserStore = defineStore('userStore', () => {
  const users = ref([]);

  // Obtener usuarios de una API de prueba
  const fetchUsers = async () => {
    const res = await fetch('https://jsonplaceholder.typicode.com/users');
    users.value = await res.json();
  };

  // Eliminar usuario (hace llamado a la API)
  const deleteUser = async (userId) => {
    try {
      // Llamada a la API para eliminar el usuario
      await fetch(`https://jsonplaceholder.typicode.com/users/${userId}`, {
        method: 'DELETE',
      });

      // Si la eliminación fue exitosa, actualizamos el estado local
      users.value = users.value.filter(user => user.id !== userId);
    } catch (error) {
      console.error('Error al eliminar el usuario:', error);
    }
  };

  // Actualizar usuario (hace llamado a la API)
  const updateUser = async (updatedUser) => {
    try {
      // Llamada a la API para actualizar el usuario
      const res = await fetch(`https://jsonplaceholder.typicode.com/users/${updatedUser.id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(updatedUser),
      });

      if (!res.ok) {
        throw new Error('Error al actualizar el usuario');
      }

      // Si la actualización fue exitosa, actualizamos el estado local
      const updatedData = await res.json();
      console.log(updatedData,'-----updatedData')
      const index = users.value.findIndex(user => user.id === updatedData.id);
      if (index !== -1) {
        users.value[index] = { ...updatedData }; // Actualiza el usuario con la respuesta de la API
      }
    } catch (error) {
      console.error('Error al actualizar el usuario:', error);
    }
  };

  return { users, fetchUsers, deleteUser, updateUser };
});
