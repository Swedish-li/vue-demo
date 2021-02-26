import {
  Transition,
  Component as DynamicComponent,
  resolveDynamicComponent,
  KeepAlive,
} from 'vue'
import { RouterView } from 'vue-router'

const resolveComponent = (_Component: DynamicComponent) =>
  _Component ? resolveDynamicComponent(_Component) : undefined

const App = () => (
  <div class="view-frame">
    <RouterView>
      {({ Component }: { Component: DynamicComponent }) => (
        <Transition name="fade">
          <KeepAlive>{resolveComponent(Component)}</KeepAlive>
        </Transition>
      )}
    </RouterView>
  </div>
)

export default App
