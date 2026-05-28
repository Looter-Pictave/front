<script setup>
import { computed } from 'vue'

/**
 * Champ de formulaire unifié : label + input/textarea + message d'erreur.
 * Remplace les `.form__field / .form__error` qui étaient copiés-collés dans
 * LoginView, RegisterView, ContactView, AccountProfile, AccountAddresses.
 *
 * Usage :
 *   <BaseField v-model="email" label="Email" type="email" required
 *              autocomplete="email" :error="emailError" />
 *   <BaseField v-model="msg" label="Message" type="textarea" :rows="6" />
 *
 * Les attributs non déclarés (minlength, inputmode, ...) sont transmis
 * directement au contrôle grâce à inheritAttrs: false + v-bind="$attrs".
 */
defineOptions({ inheritAttrs: false })

const props = defineProps({
  modelValue: { type: [String, Number], default: '' },
  label: { type: String, default: '' },
  type: { type: String, default: 'text' }, // text | email | tel | password | textarea
  error: { type: String, default: '' },
  hint: { type: String, default: '' },
  required: { type: Boolean, default: false },
  placeholder: { type: String, default: '' },
  rows: { type: Number, default: 5 },
})

defineEmits(['update:modelValue'])

const isTextarea = computed(() => props.type === 'textarea')
</script>

<template>
  <label class="field">
    <span v-if="label" class="field__label">
      {{ label }}
      <span v-if="hint" class="field__hint">{{ hint }}</span>
    </span>

    <textarea
      v-if="isTextarea"
      v-bind="$attrs"
      class="field__control field__control--textarea"
      :class="{ 'field__control--error': error }"
      :value="modelValue"
      :required="required"
      :placeholder="placeholder"
      :rows="rows"
      @input="$emit('update:modelValue', $event.target.value)"
    ></textarea>

    <input
      v-else
      v-bind="$attrs"
      class="field__control"
      :class="{ 'field__control--error': error }"
      :type="type"
      :value="modelValue"
      :required="required"
      :placeholder="placeholder"
      @input="$emit('update:modelValue', $event.target.value)"
    />

    <span v-if="error" class="field__error" role="alert">{{ error }}</span>
  </label>
</template>

<style scoped>
.field {
  display: flex;
  flex-direction: column;
  gap: 0.35rem;
  font-weight: 700;
  font-size: 0.85rem;
}
.field__label {
  display: flex;
  gap: 0.4rem;
  align-items: baseline;
  flex-wrap: wrap;
}
.field__hint {
  color: var(--color-ink-muted);
  font-weight: 400;
  font-size: 0.78rem;
}
.field__control {
  width: 100%;
  padding: 0.7rem 0.9rem;
  border: 2px solid var(--color-brand-ink);
  border-radius: var(--radius-sm);
  font-family: var(--font-sans);
  font-size: 0.95rem;
  background: var(--color-brand-paper);
  color: var(--color-brand-ink);
}
.field__control:focus {
  outline: 2px solid var(--color-brand-yellow);
  outline-offset: 2px;
}
.field__control--error {
  border-color: var(--color-error);
}
.field__control--textarea {
  resize: vertical;
}
.field__error {
  font-weight: 600;
  font-size: 0.78rem;
  color: var(--color-error);
}
</style>
