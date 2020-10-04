import { defineComponent, PropType } from 'vue'
import { checkmark, PhoneDetail } from '../core'

const ImageView = defineComponent({
  props: {
    src: {
      type: String,
      required: true,
    },
    selected: Boolean,
    onClick: Function as PropType<(event: MouseEvent) => void>,
  },
  render() {
    const { $attrs } = this
    return (
      <img
        {...$attrs}
        src={this.src}
        class={{ selected: this.selected }}
        onClick={(e) => {
          if (this.onClick) {
            this.onClick(e)
          }
        }}
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
    this.mainImageUrl = this.detail.images[0]
  },
  methods: {
    setImage(img: string) {
      this.mainImageUrl = img
    },
  },
  render() {
    const phone = this.detail
    const mainImageUrl = this.mainImageUrl

    return (
      <>
        <div class="phone-images">
          {phone.images.map((img) => (
            <ImageView src={`/${img}`} selected={img === mainImageUrl} />
          ))}
        </div>
        <h1>{phone.name}</h1>
        <p>{phone.description}</p>
        <ul class="phone-thumbs">
          {phone.images.map((img) => (
            <ImageView src={`/${img}`} onClick={() => this.setImage(img)} />
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