import { getUrl } from '../utils'
import { defineComponent, TransitionGroup } from 'vue'
import { RouterLink } from 'vue-router'
import { getPhoneList, Phone } from '../core'

type Order = 'age' | 'name'

interface State {
  phones: Phone[]
  orderProp: Order
  query: string
}

export const PhoneListComponent = defineComponent({
  name: 'Phone-list',
  data(): State {
    return {
      phones: [],
      orderProp: 'age',
      query: '',
    }
  },
  methods: {
    onChangeOrder(e: Event) {
      this.orderProp = (e.target as HTMLSelectElement).value as Order
    },
    onInputQuery(e: Event) {
      this.query = (e.target as HTMLInputElement).value
    },
  },
  mounted() {
    getPhoneList().then((res) => (this.phones = res))
  },
  render() {
    return (
      <div class="container-fluid">
        <div class="row">
          <div class="col-md-2">
            {/* <!--Sidebar content--> */}
            <p>
              Search:
              <input value={this.query} onInput={(e) => this.onInputQuery(e)} />
            </p>
            <p>
              Sort by:
              <select
                value={this.orderProp}
                onChange={(e) => this.onChangeOrder(e)}
              >
                <option value="name">Alphabetical</option>
                <option value="age">Newest</option>
              </select>
            </p>
          </div>
          <div class="col-md-10">
            {/* <!--Body content--> */}

            <ul class="phones">
              <TransitionGroup
                name="list"
                onEnter={(e) => console.log(e.classList.toString(), 'onEnter')}
                onLeave={(e) => console.log(e.classList.toString(), 'onLeave')}
                onBeforeEnter={(e) =>
                  console.log(e.classList.toString(), 'onBeforeEnter')
                }
                onAfterEnter={(e) =>
                  console.log(e.classList.toString(), 'onAfterEnter')
                }
              >
                {this.phones
                  .filter((p) => {
                    return (
                      p.name.indexOf(this.query) >= 0 ||
                      p.snippet.indexOf(this.query) >= 0
                    )
                  })
                  .sort((a, b) => {
                    const valueA = a[this.orderProp]
                    const valueB = b[this.orderProp]

                    if (typeof valueA === 'string') {
                      return valueA.localeCompare(valueB as string)
                    }

                    return valueA > valueB ? 1 : valueA === valueB ? 0 : -1
                  })
                  .map((p) => (
                    <li class="thumbnail phone-list-item" key={p.id}>
                      <RouterLink to={`/phones/${p.id}`} class="thumb">
                        <img src={getUrl(p.imageUrl)} alt={p.name} />
                      </RouterLink>
                      <RouterLink to={`/phones/${p.id}`}>{p.name}</RouterLink>
                      <p>{p.snippet}</p>
                    </li>
                  ))}
              </TransitionGroup>
            </ul>
          </div>
        </div>
      </div>
    )
  },
})
