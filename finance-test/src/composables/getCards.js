
import { ref } from 'vue'
const getCards = () => {
  const cards = ref([]);
  const load = async () => {
    try {
      const data = await fetch('https://finance-app123.herokuapp.com/cards',
      {
        method: 'get',
        headers: { 'Content-type': 'application/json' },
      })
      if (!data.ok) {
        throw error ('no data available')
      }
      cards.value = await data.json()
    } catch (error) {

    }
  }
  return { cards , load}
}
export default getCards