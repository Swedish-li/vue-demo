import { defineComponent, PropType } from 'vue'

const Sort = defineComponent({
  props: {
    modelValue: {
      type: String,
    },
    options: {
      type: Array as PropType<{ value: string; text: string }[]>,
      required: true,
    },
  },
  emits: ['update:modelValue'],
  setup(props, { emit }) {
    const { modelValue, options } = props

    return () => (
      <p>
        Sort by:
        <select
          name="order"
          value={modelValue}
          onChange={(e) => {
            const value = (e.target as HTMLSelectElement).value
            // props.onChange(value)
            emit('update:modelValue', value)
          }}
        >
          {options.map((v) => (
            <option value={v.value}>{v.text}</option>
          ))}
        </select>
      </p>
    )
  },
})

export { Sort }
