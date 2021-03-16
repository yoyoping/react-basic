// 获取鼠标点击的位置
/** 调用示例
 import React from 'react'
  import useMousePosition from './useMousePosition'

  function App() {
      const position = useMousePosition()
      return (
          <div>
              <div>x: {position.x}</div>
              <div>y: {position.y}</div>
          </div>
      )
  }
*/

import { useState, useEffect } from 'react'

const useMousePosition = () => {
    const [position, setPosition] = useState({x: 0, y: 0 })
    const updateMouse = (e: any) => {
      setPosition({ x: e.clientX, y: e.clientY })
    }
    useEffect(() => {
        document.addEventListener('mousemove', updateMouse)
        return () => {
            document.removeEventListener('mousemove', updateMouse)
        }
    }, [])
    return position
}

export default useMousePosition
