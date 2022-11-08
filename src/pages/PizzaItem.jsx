import axios from 'axios'
import React from 'react'
import { useState } from 'react'
import { useEffect } from 'react'
import { useNavigate, useParams } from 'react-router-dom'

export default function PizzaItem() {
  const [pizza, setPizza] = useState()
  const { id } = useParams()
  const navigate = useNavigate()

  const fetchPizzas = async () => {
    try {
      const { data } = await axios.get(`https://6332bc21573c03ab0b4f552f.mockapi.io/items/${id}`)
      setPizza(data)
    } catch (error) {
      alert('Somthing went wrong', error)
      navigate('/')
    }
  }

  useEffect(() => {
    fetchPizzas()
  }, [])

  if(!pizza){
    return 'Loading...'
  }
  return (
    <div>
        <img src={pizza.imageUrl}/>
      <h1>{pizza.name}</h1>
      
      <h4>{pizza.price} ₽</h4>
    </div>
  )
}
