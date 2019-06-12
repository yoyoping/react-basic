import React from 'react';
import { Link } from 'react-router-dom'
import { useCount } from '../context/Index'

const Home_: React.FC<any> = () => {

  const [count, dispatch] = useCount();

  return (
    <>
      home
      <div>
        <p>
          <Link to='/mine'>我的</Link>
        </p>
        <p>
          <Link to='/list'>列表</Link>
        </p>
      </div>
      <p>---------------</p>
      <p>---------------</p>
      {/* <div>
        {count}
        <button onClick={() => dispatch({ type: 'increment' })}>+1</button>
        <button onClick={() => dispatch({ type: 'decrement' })}>-1</button>
        <button onClick={() => dispatch({ type: 'set', count: 0 })}>reset</button>
      </div> */}
    </>
  )
}

export default Home_