<script lang="ts">
  interface Props {
    items: string[];
    /** Optional icon to show before each item (e.g. checkmark) */
    icon?: 'check' | 'bullet';
  }
  let { items, icon = 'check' }: Props = $props();
</script>

<ul class="space-y-3">
  {#each items as item}
    <li class="flex items-start gap-3 text-slate-700">
      {#if icon === 'check'}
        <span
          class="mt-0.5 shrink-0 flex h-5 w-5 items-center justify-center rounded-full bg-emerald-100 text-emerald-600"
          aria-hidden="true"
        >
          <svg class="h-3 w-3" fill="none" stroke="currentColor" viewBox="0 0 12 12" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
              <path d="M2 6l3 3 5-6" />
            </svg>
        </span>
      {:else}
        <span class="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-slate-400" aria-hidden="true"></span>
      {/if}
      <span class="text-sm leading-relaxed">{item}</span>
    </li>
  {/each}
</ul>
