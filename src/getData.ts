import { ImageData, getDataInterface } from "./types"

export async function getData(params: getDataInterface) {
    const res = await fetch('https://jsonplaceholder.typicode.com/photos')
    const result = await res.json()
    const data = result as ImageData[]
    return data
}