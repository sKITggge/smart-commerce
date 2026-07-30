<template>
  <form
    class="bg-white shadow-md rounded-2xl border border-gray-200 px-8 pt-7 pb-8"
    @submit.prevent="onSubmit"
  >
    <h1 class="text-2xl font-bold text-center text-gray-900 mb-6">Sign Up</h1>

    <div class="mb-4">
      <label class="block text-sm font-medium text-gray-700 mb-2">Email</label>
      <input
        v-model.trim="state.email"
        type="text"
        placeholder="Email address"
        class="w-full px-3 py-2 border rounded-md shadow-sm placeholder-gray-400 text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition"
        :class="v$.email.$error ? 'border-red-300 focus:ring-red-500' : 'border-gray-300'"
        @blur="v$.email.$touch()"
      />
      <p
        v-if="v$.email.$error"
        class="mt-2 text-sm text-red-600"
      >
        <span v-if="v$.email.required.$invalid">Email is required.</span>
        <span v-else-if="v$.email.email.$invalid">Please enter a valid email.</span>
      </p>
    </div>

    <div class="mb-4">
      <label class="block text-sm font-medium text-gray-700 mb-2">Password</label>
      <input
        v-model.trim="state.password"
        type="password"
        placeholder="Password"
        class="w-full px-3 py-2 border rounded-md shadow-sm placeholder-gray-400 text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition"
        :class="v$.password.$error ? 'border-red-300 focus:ring-red-500' : 'border-gray-300'"
        @blur="v$.password.$touch()"
      />
      <p
        v-if="v$.password.$error"
        class="mt-2 text-sm text-red-600"
      >
        <span v-if="v$.password.required.$invalid">Password is required.</span>
        <span v-else-if="v$.password.minLength.$invalid"
          >Password must be at least 6 characters.</span
        >
      </p>
    </div>

    <div class="mb-6">
      <label class="block text-sm font-medium text-gray-700 mb-2">Confirm password</label>
      <input
        v-model.trim="state.confirmPassword"
        type="password"
        placeholder="Confirm password"
        class="w-full px-3 py-2 border rounded-md shadow-sm placeholder-gray-400 text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition"
        :class="v$.confirmPassword.$error ? 'border-red-300 focus:ring-red-500' : 'border-gray-300'"
        @blur="v$.confirmPassword.$touch()"
      />
      <p
        v-if="v$.confirmPassword.$error"
        class="mt-2 text-sm text-red-600"
      >
        <span v-if="v$.confirmPassword.required.$invalid">Please confirm your password.</span>
        <span v-else-if="v$.confirmPassword.sameAsPassword?.$invalid">Passwords do not match.</span>
      </p>
    </div>

    <button
      type="submit"
      class="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2.5 px-4 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-600 focus:ring-offset-2 transition"
    >
      Create account
    </button>

    <div class="mt-5 text-center text-sm text-gray-600">
      Have an account?
      <button
        type="button"
        class="font-semibold text-blue-600 hover:underline"
        @click="$emit('switch')"
      >
        Log in
      </button>
    </div>
  </form>
</template>

<script setup lang="ts">
import useVuelidate from '@vuelidate/core'
import { required, minLength, email as emailValidator, sameAs } from '@vuelidate/validators'

const emit = defineEmits<{
  (e: 'success' | 'switch'): void
}>()

const state = reactive({
  email: '',
  password: '',
  confirmPassword: ''
})

const rules = computed(() => ({
  email: { required, email: emailValidator },
  password: { required, minLength: minLength(6) },
  confirmPassword: {
    required,
    sameAsPassword: sameAs(state.password)
  }
}))

const v$ = useVuelidate(rules, state)

const onSubmit = async () => {
  const ok = await v$.value.$validate()
  if (!ok) return

  emit('success')
}
</script>
