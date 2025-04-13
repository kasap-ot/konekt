import { View, Text, Button } from 'react-native'
import React, { useState } from 'react'

function useCounter(initialValue: number = 0) {
  const [counter, setCounter] = useState(initialValue);
  function decrement() { setCounter(prevValue => prevValue - 1) }
  function increment() { setCounter(prevValue => prevValue + 1) }

  return {
    counter,
    decrement,
    increment,
  }
}

export default function TestCustomHooks() {
  const { counter, decrement, increment } = useCounter();

  return (
    <View>
      <Text>My Counter: {counter}</Text>
      <Button title='Increment' onPress={increment} />
      <Button title='Decrement' onPress={decrement} />
    </View>
  )
}