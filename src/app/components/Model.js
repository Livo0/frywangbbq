'use client'

import React, { Suspense } from 'react'
import { useGLTF } from '@react-three/drei'

export default function Model(props) {
  const { scene } = useGLTF('/Model/scene.gltf') // Place your GLB file in public/models

  return (
    <Suspense fallback={null}>
      <primitive object={scene} {...props} />
    </Suspense>
  )
}

useGLTF.preload('/Model/scene.gltf')
