import './App.css';
import BasicTable from './components/BasicTable';
import { Tablecolumns } from './components/column';
import data from './components/data.json'
function App() {
  return (
    <div className="App">
      <h1>React-table</h1>
      <BasicTable columns={Tablecolumns} data={data}/>
    </div>
  );
}

export default App;
