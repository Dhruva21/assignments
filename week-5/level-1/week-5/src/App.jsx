import { useState } from 'react'
import Card from './Component/Card';
import Dhruva from './assets/Dhruva.jpeg';
function App() {
  const styles = {
    display: 'flex',
    alignItems: 'center',
    flexDirection: 'column',
  }
  return <div style={styles}>
    <Card name="Dhruva Indavarapu" description="Loves Coding" image={Dhruva} linkedin="https://www.linkedin.com/in/dhruva-indavarapu/" github="https://github.com/Dhruva21/" portfolio="https://dhruva-portfolio-site.vercel.app/" interests="coding, cricket" />
  </div>
}

export default App
