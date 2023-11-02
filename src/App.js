import Table from "./components/table"
import createElement from "./utils/createElement"
import Wrapper from "./utils/wrapper"

function App(){
    const div = createElement('div', Table)
    return div
}

export default Wrapper(App)