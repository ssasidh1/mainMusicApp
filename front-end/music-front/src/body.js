import React, { useEffect, useState } from 'react'
import { useToken } from './context';
import { BodyMain } from './bodyMain';
import { BodySelected } from './bodySelected';
function Body({playlist}) {
  const {sPlaylist} = useToken();
  console.log("body",sPlaylist)
  return (
    <div>
    {!sPlaylist ? (
      <BodyMain playlist={playlist} />
    ) : (
      <BodySelected />
    )}
  </div>
  )
}

export default Body