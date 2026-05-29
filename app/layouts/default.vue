<template>
  <div class="flex flex-col gap-4 lg:gap-6">
    <MainHeader />
    <main class="container mx-auto">
      <slot />
    </main>
    <MainFooter />
  </div>
</template>
