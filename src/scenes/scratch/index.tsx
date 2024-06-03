import { SelectedPage } from '@/shared/types'
import React from 'react'

type Props = {
    setSelectedPage: (value: SelectedPage) => void;
}

const Scratch = ({setSelectedPage }: Props) => {
  return (
    <div>Scratch</div>
  )
}

export default Scratch