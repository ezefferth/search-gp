import DataProvider from "./data/context/dataContext";
import Routers from "./routes/routes";

function App() {
  return (
    <DataProvider>
      <Routers />
    </DataProvider>
  )
}

export default App
