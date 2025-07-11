import React from 'react'
import Navbar from './Navbar'
import { albumsData } from '../assets/assets.js'
import Albumitem from './Albumitem'
import { songsData } from '../assets/assets.js'


const DisplayHome = () => {
  return (
    <>
    <Navbar/>
    <div className='mb-4'>
        <h1 className='my-5 font-bold text-2xl'>Featured Charts</h1>
        <div className='flex overflow-auto'>
             {albumsData.map((item,index)=>(<Albumitem key={index} name={item.name} desc={item.desc} id={item.id} image={item.image}/>))}
        </div>
    </div>

    <div className='mb-4'>
        <h1 className='my-5 font-bold text-2xl'>Today's Biggest Hits</h1>
        <div className='flex overflow-auto'>
             {songsData.map((item, index) => (
                <Albumitem
                    key={index}
                    name={item.name}
                    desc={item.desc}
                    id={item.id}
                    image={item.image}
                />
                ))}

        </div>
    </div>





    </>
  )
}

export default DisplayHome
