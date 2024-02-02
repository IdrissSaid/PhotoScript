import { DisplayData } from './DisplayData';
import { StopButton } from './StopButton';
import { createSignal } from 'solid-js';

export function RandomImages(props: { height: string, width?: string | "auto", numberOfRow: number }) {
  const [stop, setStop] = createSignal<boolean>(false)
  return (
    <div class='w-screen' style={{ height: props.height, width: props.width }}>
      <StopButton stop={stop()} setStop={setStop}/>
      <DisplayData stop={stop()} numberOfRow={props.numberOfRow}/>
    </div>
  )
}