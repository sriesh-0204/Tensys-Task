import React from 'react'
import { Images } from '../../assets/images'

function Loader() {
  return (
    <div>
      <img src={Images.LoaderGif} className="loader" />
    </div>
  )
}

export default Loader
