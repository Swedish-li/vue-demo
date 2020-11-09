import { PhoneList } from '../components/PhoneList'
import { Search } from '../components/Search'
import { Sort } from '../components/Sort'
import { getPhoneList, Phone } from '../core'
import { deepCompare } from '../utils'
import { computed, defineComponent, onMounted, Ref, ref } from 'vue'

const usePhoneList = () => {
  const list = ref<Phone[]>([])
  const getList = async () => {
    list.value = await getPhoneList()
  }
  onMounted(getList)

  return {
    phoneList: list,
    getPhoneList: getList,
  }
}

const usePhoneListMatchingQuery = (list: Ref<Phone[]>) => {
  const searchQuery = ref('')
  const phoneListMatchingQuery = computed(() => {
    return list.value.filter((item) => {
      return deepCompare(item, searchQuery.value)
    })
  })

  return {
    searchQuery,
    phoneListMatchingQuery,
  }
}

type Order = 'age' | 'name'

const usePhoneListSort = (list: Ref<Phone[]>) => {
  const order = ref<Order>('name')
  const phoneListSorted = computed(() => {
    return list.value
      .sort((a, b) => {
        const valueA = a[order.value]
        const valueB = b[order.value]

        if (typeof valueA === 'string') {
          return valueA.localeCompare(valueB as string)
        }

        return valueA > valueB ? 1 : valueA === valueB ? 0 : -1
      })
      .concat([])
  })

  return {
    order,
    phoneListSorted,
  }
}

const PhoneListView = defineComponent({
  name: 'phone-list-view',
  setup() {
    const { phoneList } = usePhoneList()
    const { searchQuery, phoneListMatchingQuery } = usePhoneListMatchingQuery(
      phoneList
    )
    const { order, phoneListSorted } = usePhoneListSort(phoneListMatchingQuery)
    return {
      searchQuery,
      order,
      phoneListSorted,
    }
  },
  methods: {
    updateSortOrder(e: Event) {
      console.log(e, 'updateSortOrder')
      if (e.target instanceof HTMLSelectElement) {
        this.order = e.target.value as Order
      }
    },
  },
  render() {
    const options = [
      {
        value: 'name',
        text: 'Alphabetical',
      },
      { value: 'age', text: 'Newest' },
    ]
    return (
      <div class="container-fluid">
        <div class="row">
          <div class="col-md-2">
            <Search
              modelValue={this.searchQuery}
              onChange={(v) => {
                this.searchQuery = v
              }}
            />
            <Sort
              options={options}
              order={this.order}
              onChange={this.updateSortOrder}
            />
          </div>
          <div class="col-md-10">
            <PhoneList list={this.phoneListSorted} />
          </div>
        </div>
      </div>
    )
  },
})

export { PhoneListView }
