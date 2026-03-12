<script lang="ts">
  import Sidebar from './Sidebar.svelte';
</script>

<div class="flex min-h-screen bg-slate-50 text-slate-900">
  <Sidebar />
  <main class="flex-1 min-w-0">
    <slot />
  </main>
</div>
