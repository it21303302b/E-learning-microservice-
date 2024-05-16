import { Swiper } from 'swiper/react'
import ItemCard from '../../common/itemCard'
import { ReactTyped } from 'react-typed'

import 'swiper/css'
import 'swiper/css/navigation'
import 'swiper/css/pagination'
import 'swiper/css/scrollbar'
import { useRef, useCallback, useState, useEffect } from 'react'

const ItemSlider = (props) => {
  const [isBeginning, setIsBeginning] = useState(true)
  const [isEnd, setIsEnd] = useState(false)
  const sliderRef = useRef(null)

  const handlePrev = useCallback(() => {
    if (!sliderRef.current) return
    sliderRef.current.swiper.slidePrev()
  }, [])

  const handleNext = useCallback(() => {
    if (!sliderRef.current) return
    sliderRef.current.swiper.slideNext()
  }, [])

  const handleSwiper = useCallback((swiper) => {
    setIsBeginning(swiper.isBeginning)
    setIsEnd(swiper.isEnd)
  }, [])

  useEffect(() => {
    if (!sliderRef.current) return
    sliderRef.current.swiper.on('reachBeginning', () => {
      setIsBeginning(true)
    })
    sliderRef.current.swiper.on('fromEdge', () => {
      setIsEnd(false)
    })
    sliderRef.current.swiper.on('reachEnd', () => {
      setIsEnd(true)
      setIsBeginning(false)
    })
  }, [])
  return (
    <div className="form-bg-img px-10 py-5">
      <p className="text-blue-900 font-black text-start text-2xl">
        Latest Releases <ReactTyped strings={['>>>']} typeSpeed={120} backSpeed={100} loop />
      </p>
      <Swiper ref={sliderRef} spaceBetween={30} slidesPerView={4} onSwiper={handleSwiper}>
        <ItemCard />
      </Swiper>
      <div className="mt-7 w-full flex justify-end">
        <button className={`prev-arrow w-10 h-7 bg-red bg-green-800 text-white mr-2 rounded-sm transform -translate-y-1/2  shadow-md z-10 ${isBeginning ? 'opacity-50 cursor-default' : 'cursor-pointer'}`} onClick={handlePrev} disabled={isBeginning}>
          {'<'}
        </button>
        <button className={`next-arrow w-10 h-7 bg-red bg-green-800 text-white mr-2  rounded-sm  transform -translate-y-1/2  shadow-md z-10 ${isEnd ? 'opacity-50 cursor-default' : 'cursor-pointer'}`} onClick={handleNext} disabled={isEnd}>
          {'>'}
        </button>
      </div>
    </div>
  )
}

export default ItemSlider
