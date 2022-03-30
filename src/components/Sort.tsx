import { defineComponent, PropType } from 'vue'

const Sort = defineComponent({
  name: 'Sort',
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
          onChange={(e) => {
            const value = (e.target as HTMLSelectElement).value
            emit('update:modelValue', value)
          }}
        >
          {options.map((v) => (
            <option value={v.value} selected={v.value === modelValue}>
              {v.text}
            </option>
          ))}
        </select>
      </p>
    )
  },
})

export { Sort }
