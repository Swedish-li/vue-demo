import { getPhone, PhoneDetail } from '../core'
import { defineComponent } from 'vue'
import { PhoneDetailComponent } from './PhoneDetail'

interface State {
  detail: PhoneDetail | null
}

export const PhoneDetailContainer = defineComponent({
  props: {
    id: {
      type: String,
      required: true,
    },
  },
  data(): State {
    return {
      detail: null,
    }
  },
  mounted() {
    getPhone(this.id).then((res) => (this.detail = res))
  },
  render() {
    return this.detail ? (
      <PhoneDetailComponent detail={this.detail}></PhoneDetailComponent>
    ) : (
      <h1>Loading....</h1>
    )
  },
})