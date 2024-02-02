import { Setter } from 'solid-js';

export function StopButton(props: { stop: boolean, setStop: Setter<boolean> }) {
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