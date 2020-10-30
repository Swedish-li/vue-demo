import {
  Transition,
  Component as DynamicComponent,
  resolveDynamicComponent,
} from 'vue'
import { RouterView } from 'vue-router'

const App = () => (
  <div class="view-frame">
    <RouterView>
      {({ Component }: { Component: DynamicComponent }) => (
        <Transition name="fade">
          {() => resolveDynamicComponent(Component)}
        </Transition>
      )}
    </RouterView>
  </div>
)

export default App
