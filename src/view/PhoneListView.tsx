import { PhoneList } from '@/components/PhoneList'
import { Search } from '@/components/Search'
import { Sort } from '@/components/Sort'
import { getPhoneList, Phone } from '@/core'
import { deepCompare } from '@/utils'
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
  const order = ref<Order>('age')
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

const SORT_OPTIONS = [
  { value: 'age', text: 'Newest' },
  {
    value: 'name',
    text: 'Alphabetical',
  },
]

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
      if (e.target instanceof HTMLSelectElement) {
        this.order = e.target.value as Order
      }
    },
  },
  render() {
    return (
      <div class="container-fluid">
        <div class="row">
          <div class="col-md-2">
            <Search v-model={this.searchQuery} />
            <Sort options={SORT_OPTIONS} v-model={this.order} />
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
