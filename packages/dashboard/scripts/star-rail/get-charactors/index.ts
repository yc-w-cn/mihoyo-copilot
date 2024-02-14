import axios from 'axios'

async function getCharactors(){
  const targetUrl = 'https://wiki.biligame.com/sr/%E8%A7%92%E8%89%B2%E5%9B%BE%E9%89%B4'
  const response = await axios.get(targetUrl)
  const html = response.data
  console.log('html', html)
}

getCharactors();