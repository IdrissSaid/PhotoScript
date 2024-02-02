import { createResource, Show, For, createSignal } from 'solid-js';

import { getData } from '../getData';
import { ImageData, getDataInterface } from '../types';

interface DisplayDataProps {
  numberOfRow: number
  stop: boolean
}

export const DisplayData = (props: DisplayDataProps) => {
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