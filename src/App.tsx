import { createResource, type Component, Show, For } from 'solid-js';

import logo from './logo.svg';
import styles from './App.module.css';
import { getData } from './getData';
import { ImageData } from './types';

interface DisplayDataProps {
  numberOfRow: number
}

const DisplayData = (props: DisplayDataProps) => {
  const [ data ] = createResource<ImageData[], number>(props.numberOfRow, getData)
  console.log(data)
  return (
      <div style={{ height:"40%", "overflow-x": "scroll", display:"flex", "flex-direction":"row" }}>
        <Show when={!data.loading} fallback={<>Tu fonctionnes maintenant ?</>}>
          <For each={data()}>
            {
              (data) => (
              <div style={{ width:"600px", height:"100%", display:"flex", "flex-direction":"row" }}>
                <img src={data.url} style={{ width: "300px" }}/>
                <div style={{ width:"300px", height:"100%", display:"flex", "justify-content": "center", "align-items": "center" }}>
                  <p style={{ color:"black" }}>{data.title}</p>
                </div>
              </div>
              )
            }
          </For>
        </Show>
      </div>
  )
}

const App: Component = () => {
  return (
    <div style={{ height:"100vh", display: "flex", "flex-direction": "column", "justify-content": "center", gap: "5em"}}>
        <DisplayData numberOfRow={15}/>
        <DisplayData numberOfRow={15}/>
    </div>
  );
};

export default App;
