import { createResource, type Component, Show, For, createSignal, Setter } from 'solid-js';

import { getData } from './getData';
import { ImageData, getDataInterface } from './types';

interface DisplayDataProps {
  numberOfRow: number
  stop: boolean
}

const DisplayData = (props: DisplayDataProps) => {
  const [ inc, setInc ] = createSignal<number>(Math.floor(Math.random() * 50))
  const [ data ] = createResource<ImageData[], getDataInterface>({start: () => inc(), end: props.numberOfRow} as getDataInterface, getData) || []
  const [dataSliced, setDataSliced] = createSignal<ImageData[] | undefined>(data()?.slice(inc(), props.numberOfRow + inc()))

  setInterval(() => {
    if (props.stop) return
    if (inc() > 5000 - props.numberOfRow)
      setInc(0)
    else
      setInc(Math.floor(Math.random() * 50))
    const rowData = data()
    if (rowData)
      setDataSliced(rowData.slice(inc(), props.numberOfRow + inc()))
  }, 1000)

  return (
      <div class="overflow-x-scroll flex flex-row gap-3 p-10">
        <Show when={!data.loading} fallback={<div class='flex w-full h-full justify-center items-center'>Chargement des données...</div>}>
          <For each={dataSliced()}>
            {
              (data, index) => (
              <div id={index.toString()} class='flex flex-col shadow-xl bg-slate-300'>
                <img src={data.url} style={{ width: "300px" }}/>
                <div class='flex justify-center items-center p-7'>
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

function StopButton(props: { stop: boolean, setStop: Setter<boolean> }) {
  return (
    <div>
    {
      props.stop ?
      <button class='bg-red-500 rounded-lg p-2' style={{ width: "5%", height: "5%" }} onClick={() => props.setStop(!props.stop)}></button>
      :
      <button class='bg-green-500 rounded-lg p-2' style={{ width: "5%", height: "5%" }} onClick={() => props.setStop(!props.stop)}></button>
    }
  </div>
  )
}

function RandomImages(props: { height: string, width?: string | "auto", numberOfRow: number }) {
  const [stop, setStop] = createSignal<boolean>(false)
  return (
    <div class='w-screen' style={{ height: props.height, width: props.width }}>
      <StopButton stop={stop()} setStop={setStop}/>
      <DisplayData stop={stop()} numberOfRow={props.numberOfRow}/>
    </div>
  )
}

const App: Component = () => {

  return (
    <div class='container flex flex-col justify-center gap-6'>
      <RandomImages height='60vh' numberOfRow={10}/>
      <RandomImages height='50vh' numberOfRow={10}/>
    </div>
  );
};

export default App;
