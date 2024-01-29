import { ImageData } from "./types"

export async function getData(numberOfRow: number) {
    const res = await fetch('https://jsonplaceholder.typicode.com/photos')
    const result = await res.json()
    const data = result as ImageData[]
    console.log(data)
    return data.slice(0, numberOfRow)
}