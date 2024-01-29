import { createResource, type Component, Show, For } from 'solid-js';

import logo from './logo.svg';
import styles from './App.module.css';
import { getData } from './getData';
import { ImageData } from './types';

const Data = () => {
  const [ data ] = createResource<ImageData[]>(getData)
  console.log(data)
  return (
    <Show when={!data.loading} fallback={<>Tu fonctionnes maintenant ?</>}>
      <For each={data()}>
        {
          (data) => (
            <div style={{ width:"50%", height:"100%", display:"flex", "flex-direction":"row" }}>
            <div style={{ width:"50%", height:"100%" }}>
              <img src={data.url} style={{height: "100px", width: "100px"}}/>
            </div>
            <div style={{ width:"50%", height:"100%" }}>
              <h1 style={{ color:"black" }}>{data.title}</h1>
            </div>
          </div>
          )
        }
      </For>
    </Show>
  )
}

const App: Component = () => {
  return (
    <div style={{ width:"100vw", height:"100vh" }}>
      <div style={{ height:"50%", width:"100%", display:"flex", "flex-direction":"row" }}>
        <Data/>
        <Data/>
      </div>
      <div style={{ height:"50%", width:"100%", display:"flex", "flex-direction":"row" }}>
        <Data/>
        <Data/>
      </div>
    </div>
  );
};

export default App;
