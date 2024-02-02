import { type Component } from 'solid-js';
import { RandomImages } from './components/RandomImages';

const App: Component = () => {

  return (
    <div class='container flex flex-col justify-center gap-6'>
      <RandomImages height='60vh' numberOfRow={10}/>
      <RandomImages height='50vh' numberOfRow={10}/>
    </div>
  );
};

export default App;
