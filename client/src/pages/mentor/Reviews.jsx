import React, { useEffect, useState } from 'react'
import StarRating from '../../component/StarRating'
import { get } from '../../api/apis';

const Reviews = () => {
  const [ratings, setRatings] = useState([]);
  
  const getRatings = async ()=>{
    const res = await get('user/mentor/ratings');
    setRatings(res.data.ratings)
  }
  useEffect(() => {
    getRatings();
  }, [])
  
  return (
    <div>
      <div class="lg:p-10 p-6 font-[sans-serif] text-[#333] bg-gray-100">
            <div class="mb-20 text-center">
                <h2 class="text-3xl font-extrabold">Reviews</h2>
            </div>
            <div class="grid md:grid-cols-3 md:gap-6 max-md:gap-10 max-w-6xl mx-auto">
              {
                ratings.map((rating, index)=>(
                  <div key={index} class="max-w-[350px] h-auto py-8 px-4 lg:px-8 rounded-md mx-auto bg-white relative">
                      <img src={rating?.userId?.pic} class="w-14 h-14 rounded-full absolute right-0 left-0 border-4 border-white shadow-xl mx-auto -top-7" />
                      <div>
                        <StarRating rating={rating.rating} />
                      </div>
                      <div class="mt-4">
                          <p class="text-sm leading-relaxed">{rating?.comment}</p>
                          <h4 class="text-base whitespace-nowrap font-extrabold mt-4">{rating?.userId?.name}</h4>
                          <p class="mt-1 text-xs text-gray-400">Founder of Rubik</p>
                      </div>
                  </div>
                ))
              }
            </div>
        </div>
    </div>
  )
}

export default Reviews