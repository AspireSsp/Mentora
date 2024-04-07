import React from 'react'

const LeftChat = ({pic, message}) => {
  return (
    <div>
        <div class="flex mb-4 cursor-pointer">
            <div class="w-9 h-9 rounded-full flex items-center justify-center mr-2">
                <img src={pic} alt="User Avatar" class="w-8 h-8 rounded-full" />
            </div>
            <div class="flex max-w-96 bg-white border rounded-lg p-3 gap-3">
                <p class="text-gray-700">{message}</p>
            </div>
        </div>
    </div>
  )
}

export default LeftChat