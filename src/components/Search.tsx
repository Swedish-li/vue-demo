import { defineComponent, PropType } from 'vue'

const Search = defineComponent({
  props: {
    modelValue: {
      type: String,
    },
    onChange: {
      type: Function as PropType<(v: string) => void>,
      required: true,
    },
  },
  setup(props) {
    const handleInput = (e: Event) => {
      const value = (e.target as HTMLInputElement).value
      props.onChange(value)
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
