import React from 'react'

const RightChat = ({pic, message}) => {
  return (
    <div>
        <div class="flex justify-end mb-4 cursor-pointer">
            <div class="flex max-w-96 bg-indigo-500 text-white rounded-lg p-3 gap-3">
            <p>{message}</p>
            </div>
            <div class="w-9 h-9 rounded-full flex items-center justify-center ml-2">
                <img src={pic} alt="My Avatar" class="w-8 h-8 rounded-full" />
            </div>
        </div>
    </div>
  )
}

export default RightChat