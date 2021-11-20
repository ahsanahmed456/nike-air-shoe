import React, { Suspense, useEffect, useRef, useState } from 'react';
import { Canvas } from '@react-three/fiber';
import { useGLTF, OrbitControls,Html } from '@react-three/drei';
import { proxy, snapshot } from 'valtio';
import {HexColorPicker} from 'react-colorful';
import "./App.css"

// const state= proxy({
//   current:null,
//   item:{
//     mesh:"blue",
//   }
// });

function Model({ ...props }) {

  useEffect(()=>{
setcolor(props.colorm)
  },[props.colorm])

console.log(props.colorm)
  
const[color,setcolor]=useState()
  
const group = useRef()
  // const snap = snapshot(state)
  const { nodes, materials } = useGLTF('/scene.gltf')
  const [hovered, set] = useState(null);
  

  return (
    <group ref={group} {...props} dispose={null}
    // onPointerOver={(e) => (e.stopPropagation(), set(e.object.material.name))}
    // onPointerOut = {(e)=> {e.intersections.length === 0 && set(null)}}
    // onPointerDown = {(e)=> {e.stopPropagation(); state.current = e.object.material.name}}
    // onPointerMissed = {(e)=> {state.current = null}}
    >
      <group rotation={[-Math.PI / 2, 0, 0]}>
        <group rotation={[Math.PI / 2, 1, 0]}>
          <mesh material-color={color} material={materials.mesh} geometry={nodes.defaultMaterial.geometry} material={materials.NikeShoe} />
        </group>
      </group>
    </group>
  )
}
useGLTF.preload('/scene.gltf')

// function Picker() {
//   const snap = snapshot(state)
//   return (
//     <div style={{ display: snap.current ? "block" : "none" }}>
//       <HexColorPicker className="picker" color={snap.item[snap.current]} onChange={(color) => (state.item[snap.current] = color)} />
//       <h1>{snap.current}</h1>
//     </div>
//   )
// }

function App() {
  
  useEffect(()=>{
    setColorm("red")
    console.log("krdiya=red")
      },[])

      const[colorm,setColorm]=useState()

 const colorChange=(color)=>{
 console.log(color)
  setColorm(color)    
        }
        


  return (
    <>
    {/* <Picker /> */}
<button onClick={()=>{colorChange("red")}} >red</button>
<button onClick={()=>{colorChange("blue")}} >blue</button>
<button onClick={()=>{colorChange("yellow")}} >yellow</button>
<button onClick={()=>{colorChange("white")}} >white</button>
 {colorm?   
    <Canvas>
       <ambientLight intensity={0.5}/>
        <spotLight intensity={0.3} position={[5, 20, 20]} />
      <Suspense fallback={null}>
        <Model colorm={colorm}/>
      </Suspense>
      <OrbitControls/>
    </Canvas>:""}
    </>
   );
}

export default App;






// import React, { Suspense, useRef, useState, useEffect } from "react"
// import { Canvas, useFrame } from "react-three-fiber"
// import { ContactShadows, Environment, useGLTF, OrbitControls } from "@react-three/drei"
// import { HexColorPicker } from "react-colorful"
// import { proxy, useSnapshot } from "valtio"

// // Using a Valtio state model to bridge reactivity between
// // the canvas and the dom, both can write to it and/or react to it.
// const state = proxy({
//   current: null,
//   items: {
//     mesh: "#ffffff",
//   },
// })

// function Shoe({...props},color) {
//   const group = useRef()
//   const ref = useRef()
//   const snap = useSnapshot(state)
//   // Drei's useGLTF hook sets up draco automatically, that's how it differs from useLoader(GLTFLoader, url)
//   // { nodes, materials } are extras that come from useLoader, these do not exist in threejs/GLTFLoader
//   // nodes is a named collection of meshes, materials a named collection of materials
//     const { nodes, materials } = useGLTF('/scene.gltf')

//   // Animate model
//   useFrame((state) => {
//     const t = state.clock.getElapsedTime()
//     // ref.current.rotation.z = -0.2 - (1 + Math.sin(t / 1.5)) / 20
//     ref.current.rotation.x = Math.cos(t / 4) / 8
//     ref.current.rotation.y = Math.sin(t / 4) / 8
//     ref.current.position.y = (1 + Math.sin(t / 1.5)) / 10
//   })

//   // Cursor showing current color
//   const [hovered, set] = useState(null)
//   useEffect(() => {
//     const cursor = `<svg width="64" height="64" fill="none" xmlns="http://www.w3.org/2000/svg"><g clip-path="url(#clip0)"><path fill="rgba(255, 255, 255, 0.5)" d="M29.5 54C43.031 54 54 43.031 54 29.5S43.031 5 29.5 5 5 15.969 5 29.5 15.969 54 29.5 54z" stroke="#000"/><g filter="url(#filter0_d)"><path d="M29.5 47C39.165 47 47 39.165 47 29.5S39.165 12 29.5 12 12 19.835 12 29.5 19.835 47 29.5 47z" fill="${snap.items[hovered]}"/></g><path d="M2 2l11 2.947L4.947 13 2 2z" fill="#000"/><text fill="#000" style="white-space:pre" font-family="Inter var, sans-serif" font-size="10" letter-spacing="-.01em"><tspan x="35" y="63">${hovered}</tspan></text></g><defs><clipPath id="clip0"><path fill="#fff" d="M0 0h64v64H0z"/></clipPath><filter id="filter0_d" x="6" y="8" width="47" height="47" filterUnits="userSpaceOnUse" color-interpolation-filters="sRGB"><feFlood flood-opacity="0" result="BackgroundImageFix"/><feColorMatrix in="SourceAlpha" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"/><feOffset dy="2"/><feGaussianBlur stdDeviation="3"/><feColorMatrix values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.15 0"/><feBlend in2="BackgroundImageFix" result="effect1_dropShadow"/><feBlend in="SourceGraphic" in2="effect1_dropShadow" result="shape"/></filter></defs></svg>`
//     const auto = `<svg width="64" height="64" fill="none" xmlns="http://www.w3.org/2000/svg"><path fill="rgba(255, 255, 255, 0.5)" d="M29.5 54C43.031 54 54 43.031 54 29.5S43.031 5 29.5 5 5 15.969 5 29.5 15.969 54 29.5 54z" stroke="#000"/><path d="M2 2l11 2.947L4.947 13 2 2z" fill="#000"/></svg>`
//     document.body.style.cursor = `url('data:image/svg+xml;base64,${btoa(hovered ? cursor : auto)}'), auto`
//   }, [hovered])

//   // Using the GLTFJSX output here to wire in app-state and hook up events
//   return (
//     <group ref={group} {...props} color={color} dispose={null}
//     onPointerOver={(e) => (e.stopPropagation(), set(e.object.material.name))}
//     onPointerOut = {(e)=> {e.intersections.length === 0 && set(null)}}
//     onPointerDown = {(e)=> {e.stopPropagation(); state.current = e.object.material.name}}
//     onPointerMissed = {(e)=> {state.current = null}}
//     >
//       <group rotation={[-Math.PI / 2, 0, 0]}>
//         <group rotation={[Math.PI / 2, 1, 0]}>
//           <mesh material-color={snap.items.mesh} material={materials.mesh} geometry={nodes.defaultMaterial.geometry} material={materials.NikeShoe} />
//         </group>
//       </group>
//     </group>
//   )
// }

// function Picker() {
//   const snap = useSnapshot(state)
//   return (
//     <div style={{ display: snap.current ? "block" : "none" }}>
//       <HexColorPicker className="picker" color={snap.items[snap.current]} onChange={(color) => (state.items[snap.current] = color)} />
//       <h1>{snap.current}</h1>
//     </div>
//   )
// }

// export default function App() {
//   return (
//     <>
//       <Canvas concurrent pixelRatio={[1, 1.5]} camera={{ position: [0, 0, 2.75] }}>
//         <ambientLight intensity={0.3} />
//         <spotLight intensity={0.3} angle={0.1} penumbra={1} position={[5, 25, 20]} />
//         <Suspense fallback={null}>
//           <Shoe />
//           {/* <Environment files="royal_esplanade_1k.hdr" /> */}
//           <ContactShadows rotation-x={Math.PI / 2} position={[0, -0.8, 0]} opacity={0.25} width={10} height={10} blur={2} far={1} />
//         </Suspense>
//         <OrbitControls minPolarAngle={Math.PI / 2} maxPolarAngle={Math.PI / 2} enableZoom={false} enablePan={false} />
//       </Canvas>
//       <Picker />
//     </>
//   )
// }