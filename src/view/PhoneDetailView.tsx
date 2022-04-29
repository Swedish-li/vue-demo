import { PhoneDetailComponent } from '@/components/PhoneDetail'
import { getPhone, PhoneDetail } from '@/core'
import { defineComponent, onMounted, Ref, ref, toRefs, watch } from 'vue'

const userPhoneDetail = (id: Ref<string>) => {
  const detail = ref<PhoneDetail | null>(null)

  const getDetail = async () => {
    detail.value = await getPhone(id.value)
  }

  onMounted(getDetail)

  watch(id, getDetail)
  return {
    detail,
  }
}

export const PhoneDetailView = defineComponent({
  name: 'phone-detail-view',
  props: {
    id: {
      type: String,
      required: true,
    },
  },
  setup(props) {
    const { id } = toRefs(props)
    const { detail } = userPhoneDetail(id)

    return {
      detail,
    }
  },
  render() {
    return (
      <div class="detail-container">
        {this.detail ? (
          <PhoneDetailComponent detail={this.detail}></PhoneDetailComponent>
        ) : (
          <h1 class="loading">Loading....</h1>
        )}
      </div>
    )
  },
})
