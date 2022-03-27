import { useState, useEffect, useRef } from 'react'
import { API_GET_DATA } from '../../global/constants'

import Edit from './components/Edit'
import List from './components/List'
import './index.css'

async function fetchData(setData) {
  const res = await fetch(API_GET_DATA)
  const { data } = await res.json()
  setData(data)
}

async function fetchSetData(data) {
  await fetch(API_GET_DATA, {
    method: 'PUT',
    headers: {
      'Content-type': 'application/json'
    },
    body: JSON.stringify({ data })
  })
}

const Home = () => {
  const [data, setData] = useState([])
  const submittingStatus = useRef(false)

  useEffect(() => {
    console.log('NODE ENV', process.env.NODE_ENV)
    // 控制初次 render 不觸發，手動更改資料才觸發
    if (!submittingStatus.current) {
      return
    }
    fetchSetData(data).then(() => (submittingStatus.current = false))
  }, [data])

  useEffect(() => {
    fetchData(setData)
  }, [])

  return (
    <div className='app'>
      <Edit add={setData} submittingStatus={submittingStatus} />
      <List listData={data} deleteData={setData} submittingStatus={submittingStatus} />
    </div>
  )
}

export default Home
