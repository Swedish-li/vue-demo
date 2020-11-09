import { defineComponent, PropType } from 'vue'

const Sort = defineComponent({
  props: {
    order: {
      type: String,
      required: true,
    },
    onChange: {
      type: Function as PropType<(event: Event) => void>,
      required: true,
    },
    options: {
      type: Array as PropType<{ value: string; text: string }[]>,
      required: true,
    },
  },
  setup(props) {
    const { order: orderProp, onChange, options } = props

    return () => (
      <p>
        Sort by:
        <select name="order" value={orderProp} onChange={(e) => onChange(e)}>
          {options.map((v) => (
            <option value={v.value}>{v.text}</option>
          ))}
        </select>
      </p>
    )
  },
})

export { Sort }
