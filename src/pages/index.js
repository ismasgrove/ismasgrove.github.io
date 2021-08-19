import React, { useContext } from 'react'
import 'twin.macro'

import { SceneContext } from '../components/SceneContext'
import { scenes } from '../components/Scene'

const SceneSelect = (props) => {
  const { _, setScene } = useContext(SceneContext)
  return (
    <select tw='bg-primary transform duration-100' {...props} onChange={({target}) => {
      setScene(scenes[target.value.toUpperCase()])
    }}>
      {Object.keys(scenes).map((scene) => <option key={scene}>
        {scene.toLowerCase()}
      </option>)}
  </select>
  )
}

export default function Home() {
  return (<>
    <h2>home</h2>
    <p>though there's nothing here so far. wip.</p>
    <p>here's a temporary scene selection tool until I get a more pleasant presenation ready</p>
    <SceneSelect title='select background scene' />
    <p>what follows is to do some proper routing and give each scene its own page with a description. also a better selection menu.</p>
  </>)
}
