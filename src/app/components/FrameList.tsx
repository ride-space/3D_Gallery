'use client'

import { useRef, useState, useMemo, useEffect } from 'react'
import { useFrame } from '@react-three/fiber'
import { imagesType } from '@/app/types'
import { GOLDENRATIO } from '@/app/utils'
import { easing } from 'maath'

import * as THREE from 'three'
import {FrameItem} from './FrameItem'

export const FrameList = ({ images }: { images: imagesType[] }) => {
  return (
    <group>
      {images.map((data,i)=>(
        <FrameItem key={i} data={data}/>
      ))}
    </group>
  )
}

