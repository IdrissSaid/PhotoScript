import { createResource, type Component, Show, For, createSignal } from 'solid-js';

import { getData } from './getData';
import { ImageData, getDataInterface } from './types';

interface DisplayDataProps {
  numberOfRow: number
}

const DisplayData = (props: DisplayDataProps) => {
  const [ inc, setInc ] = createSignal<number>(Math.floor(Math.random() * 50))
  const [stop, setStop] = createSignal<boolean>(false)
  const [ data ] = createResource<ImageData[], getDataInterface>({start: () => inc(), end: props.numberOfRow} as getDataInterface, getData) || []
  const [dataSliced, setDataSliced] = createSignal<ImageData[] | undefined>(data()?.slice(inc(), props.numberOfRow + inc()))

  setInterval(() => {
    if (stop()) return
    if (inc() > 5000 - props.numberOfRow)
      setInc(0)
    else
      setInc(Math.floor(Math.random() * 50))
    const rowData = data()
    if (rowData)
      setDataSliced(rowData.slice(inc(), props.numberOfRow + inc()))
  }, 1000)

  return (
      <div class="h-1/3 overflow-x-scroll flex flex-row p-10 gap-3">
        <div>
          {
            stop() ?
            <button class='bg-red-500 rounded-lg p-2' style={{ width: "5%", height: "20%" }} onClick={() => setStop(!stop())}></button>
            :
            <button class='bg-green-500 rounded-lg p-2' style={{ width: "5%", height: "20%" }} onClick={() => setStop(!stop())}></button>
          }
          <h1>{inc()}</h1>
        </div>
        <Show when={!data.loading} fallback={<div class='flex w-full h-full justify-center items-center'>Chargement des données</div>}>
          <For each={dataSliced()}>
            {
              (data) => (
              <div class='flex flex-row shadow-xl'>
                <img src={data.url}/>
                <div class='flex justify-center items-center p-7' style={{ width:"600px", "max-width":"600px" }}>
                  <p class=' text-center'>{data.title}</p>
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
    <div class='h-screen flex flex-col justify-center gap-6'>
        <DisplayData numberOfRow={10}/>
        <DisplayData numberOfRow={10}/>
    </div>
  );
};

export default App;
