import { getUrl } from '@/utils'
import { defineComponent, PropType, TransitionGroup } from 'vue'
import { RouterLink } from 'vue-router'
import { Phone } from '@/core'

const PhoneListItem = (p: Phone) => (
  <li class="thumbnail phone-list-item" key={p.id}>
    <RouterLink to={`/phones/${p.id}`} class="thumb">
      {() => <img src={getUrl(p.imageUrl)} alt={p.name} />}
    </RouterLink>
    <RouterLink to={`/phones/${p.id}`}>{() => p.name}</RouterLink>
    <p>{p.snippet}</p>
  </li>
)

const PhoneList = defineComponent({
  name: 'Phone-list',
  props: {
    list: {
      type: Array as PropType<Phone[]>,
      required: true,
    },
  },
  render() {
    return (
      <ul class="phones">
        <TransitionGroup name="list">
          {this.list.map(PhoneListItem)}
        </TransitionGroup>
      </ul>
    )
  },
})

export { PhoneList }
