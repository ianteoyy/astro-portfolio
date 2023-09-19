<script setup lang="ts">
import { QueryClient, useQuery } from '@tanstack/vue-query';
import { client } from '../utils/store';
import type { User } from '../types/User';

const queryClient = new QueryClient({
  queryCache: client.getQueryCache(),
});

const { data, isLoading, isFetching, refetch } = useQuery({
  queryKey: ["user"],
  queryFn: async ({ signal }) => {
    const userResponse = await fetch('https://randomuser.me/api/', { signal })
    await new Promise(r => setTimeout(r, 500));
    return userResponse.json() as Promise<{ results: User[] }>
  },
},
  queryClient
);

const onClickAvatar = () => {
  if (isFetching.value) {
    queryClient.cancelQueries({ queryKey: ["user"] })
    return
  }
  refetch()
}
</script>

<template>
  <button
    class="rounded-full button-shadow transition relative border-2 flex gap-2 p-2 items-center min-w-[256px] hover:brightness-100 brightness-95"
    @click="onClickAvatar">
    <div class="w-12 h-12 rounded-full outline outline-2 relative outline-white overflow-hidden">
      <img v-if="data && data.results.length" :src="data.results[0].picture?.thumbnail ?? ''">
    </div>
    <div v-if="data && data.results.length" class="text-start pr-2">
      <p class="sm:text-xl font-medium" v-text="`${data.results[0].name.first} ${data.results[0].name.last}`">
      </p>
      <p class="text-xs sm:text-sm">
        {{ data.results[0].email }}
      </p>
    </div>
    <span class="absolute inset-0 grid place-items-center rounded-full overflow-hidden"
      :class="{ 'bg-black/40': isLoading || isFetching }">
      <Transition enter-active-class="transition-transform duration-[150ms] ease-in" enter-from-class="translate-x-1/2"
        enter-to-class="translate-x-0" leave-active-class="transition-transform duration-[150ms] ease-in"
        leave-from-class="translate-x-0" leave-to-class="-translate-x-1/2">
        <span v-if="isLoading || isFetching" class="absolute inset-0 grid place-items-center">
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24">
            <g fill="none" stroke="currentColor" stroke-linecap="round" stroke-width="2">
              <path stroke-dasharray="60" stroke-dashoffset="60" stroke-opacity=".3"
                d="M12 3C16.9706 3 21 7.02944 21 12C21 16.9706 16.9706 21 12 21C7.02944 21 3 16.9706 3 12C3 7.02944 7.02944 3 12 3Z">
                <animate fill="freeze" attributeName="stroke-dashoffset" dur="1.3s" values="60;0" />
              </path>
              <path stroke-dasharray="15" stroke-dashoffset="15" d="M12 3C16.9706 3 21 7.02944 21 12">
                <animate fill="freeze" attributeName="stroke-dashoffset" dur="0.3s" values="15;0" />
                <animateTransform attributeName="transform" dur="0.25s" repeatCount="indefinite" type="rotate"
                  values="0 12 12;360 12 12" />
              </path>
            </g>
          </svg>
        </span>
      </Transition>
    </span>
  </button>
</template>

<style scoped>
.button-shadow:hover:not(:active) {
  transform: translate(-2px, -2px);
  box-shadow: 1px 1px theme('colors.accent');
}
</style>