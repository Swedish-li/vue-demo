import { defineComponent } from 'vue'

const Search = defineComponent({
  name: 'Search',
  props: {
    modelValue: {
      type: String,
    },
  },
  emits: ['update:modelValue'],
  setup(props, { emit }) {
    const handleInput = (e: Event) => {
      const value = (e.target as HTMLInputElement).value
      // props.onChange(value)
      emit('update:modelValue', value)
    }

    return () => (
      <p>
        Search:
        <input name="query" value={props.modelValue} onInput={handleInput} />
      </p>
    )
  },
})

export { Search }
