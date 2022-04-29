import { getUrl } from '@/utils'
import { defineComponent, PropType } from 'vue'
import { checkmark, PhoneDetail } from '@/core'
import anime from 'animejs'

const ImageView = defineComponent({
  props: {
    src: {
      type: String,
      required: true,
    },
    selected: Boolean,
  },
  watch: {
    selected(newValue: boolean, oldValue: boolean) {
      if (!this.$refs.el || newValue === oldValue) return

      const el = this.$refs.el as HTMLPictureElement

      if (newValue) {
        anime({
          targets: el,
          top: ['500px', '0'],
        })
      } else {
        anime({
          targets: el,
          top: ['0', '-500px'],
        })
      }
    },
  },
  render() {
    const { $attrs } = this
    return (
      <img
        ref="el"
        class={{ selected: this.selected }}
        {...$attrs}
        src={this.src}
      />
    )
  },
})

interface State {
  mainImageUrl: string | null
}

export const PhoneDetailComponent = defineComponent({
  name: 'phone-detail',
  props: {
    detail: {
      type: Object as PropType<PhoneDetail>,
      required: true,
    },
  },
  data(): State {
    return {
      mainImageUrl: null,
    }
  },
  mounted() {
    this.initMainImage()
  },
  watch: {
    detail() {
      this.initMainImage()
    },
  },
  methods: {
    setImage(img: string) {
      this.mainImageUrl = img
    },
    initMainImage() {
      this.mainImageUrl = this.detail.images[0]
    },
  },
  render() {
    const phone = this.detail
    const mainImageUrl = this.mainImageUrl

    return (
      <>
        <div class="phone-images">
          {phone.images.map((img) => (
            <ImageView src={getUrl(img)} selected={img === mainImageUrl} />
          ))}
        </div>
        <h1>{phone.name}</h1>
        <p>{phone.description}</p>
        <ul class="phone-thumbs">
          {phone.images.map((img) => (
            <li>
              <img src={getUrl(img)} onClick={() => this.setImage(img)} />
            </li>
          ))}
        </ul>

        <ul class="specs">
          <li>
            <span>Availability and Networks</span>
            <dl>
              <dt>Availability</dt>
              {phone.availability?.map((availability) => (
                <dd>{availability}</dd>
              ))}
            </dl>
          </li>
          <li>
            <span>Battery</span>
            <dl>
              <dt>Type</dt>
              <dd>{phone.battery.type}</dd>
              <dt>Talk Time</dt>
              <dd>{phone.battery.talkTime}</dd>
              <dt>Standby time (max)</dt>
              <dd>{phone.battery.standbyTime}</dd>
            </dl>
          </li>
          <li>
            <span>Storage and Memory</span>
            <dl>
              <dt>RAM</dt>
              <dd>{phone.storage.ram}</dd>
              <dt>Internal Storage</dt>
              <dd>{phone.storage.flash}</dd>
            </dl>
          </li>
          <li>
            <span>Connectivity</span>
            <dl>
              <dt>Network Support</dt>
              <dd>{phone.connectivity.cell}</dd>
              <dt>WiFi</dt>
              <dd>{phone.connectivity.wifi}</dd>
              <dt>Bluetooth</dt>
              <dd>{phone.connectivity.bluetooth}</dd>
              <dt>Infrared</dt>
              <dd>{checkmark(phone.connectivity.infrared)}</dd>
              <dt>GPS</dt>
              <dd>{checkmark(phone.connectivity.gps)}</dd>
            </dl>
          </li>
          <li>
            <span>Android</span>
            <dl>
              <dt>OS Version</dt>
              <dd>{phone.android.os}</dd>
              <dt>UI</dt>
              <dd>{phone.android.ui}</dd>
            </dl>
          </li>
          <li>
            <span>Size and Weight</span>
            <dl>
              <dt>Dimensions</dt>
              {phone.sizeAndWeight.dimensions?.map((dim) => (
                <dd>{dim}</dd>
              ))}
              <dt>Weight</dt>
              <dd>{phone.sizeAndWeight.weight}</dd>
            </dl>
          </li>
          <li>
            <span>Display</span>
            <dl>
              <dt>Screen size</dt>
              <dd>{phone.display.screenSize}</dd>
              <dt>Screen resolution</dt>
              <dd>{phone.display.screenResolution}</dd>
              <dt>Touch screen</dt>
              <dd>{checkmark(phone.display.touchScreen)}</dd>
            </dl>
          </li>
          <li>
            <span>Hardware</span>
            <dl>
              <dt>CPU</dt>
              <dd>{phone.hardware.cpu}</dd>
              <dt>USB</dt>
              <dd>{phone.hardware.usb}</dd>
              <dt>Audio / headphone jack</dt>
              <dd>{phone.hardware.audioJack}</dd>
              <dt>FM Radio</dt>
              <dd>{checkmark(phone.hardware.fmRadio)}</dd>
              <dt>Accelerometer</dt>
              <dd>{checkmark(phone.hardware.accelerometer)}</dd>
            </dl>
          </li>
          <li>
            <span>Camera</span>
            <dl>
              <dt>Primary</dt>
              <dd>{phone.camera.primary}</dd>
              <dt>Features</dt>
              <dd>{phone.camera.features.join(', ')}</dd>
            </dl>
          </li>
          <li>
            <span>Additional Features</span>
            <dd>{phone.additionalFeatures}</dd>
          </li>
        </ul>
      </>
    )
  },
})
