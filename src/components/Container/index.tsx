import React, {ReactNode} from 'react'
import Navbar from "../Navbar"

type Props = {
    children: ReactNode
}

const index = ({children}: Props) => {
  return (
    <main>
        <Navbar />
        {children}
    </main>
  )
}

export default index