import React, { createContext, useState } from 'react'
import { scenes } from './Scene'

const SceneContext = createContext()

const SceneProvider = ({ children }) => {

    const [scene, setScene] = useState(scenes.FLUX)

    return (
        <SceneContext.Provider value={{ scene, setScene }}>
        { children }
        </SceneContext.Provider>
    )
}

export { SceneContext, SceneProvider }