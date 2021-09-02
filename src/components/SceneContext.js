import React, { createContext, useState } from 'react'
import { scenes } from './Scene'

const SceneContext = createContext()

const SceneProvider = ({ children }) => {

    const [scene, setScene] = useState(scenes.LANDING)

    return (
        <SceneContext.Provider value={{ scene, setScene }}>
        { children }
        </SceneContext.Provider>
    )
}

export { SceneContext, SceneProvider }