import { Transition } from 'vue'
import { RouterView } from 'vue-router'

const App = () => (
  <div class="view-frame">
    <Transition name="fade">
      <RouterView></RouterView>
    </Transition>
  </div>
)

export default App
