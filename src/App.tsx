import Layout from '../src/components/layout'
import Home from '@/components/home'
import Game from '@/components/game'
import './index.css'

const App = () => {
  return (
    <Layout>
      <Home />
      <Game />
    </Layout>
  )
}

export default App
