import React from 'react'
import { Canvas } from '@react-three/fiber'
import 'twin.macro'

export default function BackgroundCanvas ({ children, onClick, ...props }) {
    return <div onClick={onClick} tw='relative lg:fixed h-full w-full'><Canvas {...props}>
    {children}
    </Canvas> 
        </div>
}