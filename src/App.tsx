import {
  Transition,
  Component as DynamicComponent,
  resolveDynamicComponent,
  KeepAlive,
} from 'vue'
import { RouterView } from 'vue-router'

const App = () => (
  <div class="view-frame">
    <RouterView>
      {({ Component }: { Component: DynamicComponent }) => (
        <Transition name="fade">
          {/* https://github.com/vuejs/jsx-next/issues/286 */}
          {/* <KeepAlive> */}
            {() => resolveDynamicComponent(Component)}
          {/* </KeepAlive> */}
        </Transition>
      )}
    </RouterView>
  </div>
)

export default App
