<template>
  <div>
    <q-card>
      <q-card-section>
        <p class="text-bold">{{ title }}</p>
        <p>{{ description }}</p>
        <q-btn @click="() => emit('save')" label="save"/>
        <div>
          <slot name="default">
            Slot par défaut
          </slot>
          <slot name="namedSlot">
            Slot nommé
          </slot>
        </div>

      </q-card-section>
    </q-card>
  </div>
</template>
<script setup>
defineProps({
  title: {
    type: String,
    default: 'Title'
  },
  description: {
    type: String,
    default: 'Default description'
  }
})

const emit = defineEmits(['save'])
</script>
