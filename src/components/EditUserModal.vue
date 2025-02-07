<template>
    <div class="fixed inset-0 flex items-center justify-center bg-gray-900 bg-opacity-50">
      <div class="bg-white p-6 rounded-lg shadow-lg w-96">
        <h2 class="text-xl font-semibold mb-4">Editar Usuario</h2>
  
        <label class="block mb-2">Nombre:</label>
        <input v-model="localUser.name" type="text" 
               class="w-full p-2 border rounded-md mb-3">
  
        <label class="block mb-2">Correo:</label>
        <input v-model="localUser.email" type="email" 
               class="w-full p-2 border rounded-md mb-3">
  
        <label class="block mb-2">Teléfono:</label>
        <input v-model="localUser.phone" type="text" 
               class="w-full p-2 border rounded-md mb-4">
  
        <div class="flex justify-end gap-2">
          <button @click="$emit('close')" class="px-4 py-2 bg-gray-400 rounded-md hover:bg-gray-300">
            Cancelar
          </button>
          <button @click="saveUser" class="px-4 py-2 bg-green-500 text-white rounded-md hover:bg-green-400">
            Guardar
          </button>
        </div>
      </div>
    </div>
  </template>
  
  <script setup>
  import { ref, defineProps, defineEmits } from 'vue';
  
  const props = defineProps(['user']);
  const emit = defineEmits(['close', 'save']);
  const localUser = ref({ ...props.user });
  
  const saveUser = () => {
    emit('save', localUser.value);
  };
  </script>
  