import React from 'react'

const BlogRollCard = ({ title, img, description, date }) => (
    <div class="flex bg-white h-full shadow-lg p-4 border border-white hover:bg-pink-100 hover:border hover:border-gray-500 hover:shadow-md">
        <div>{img && <img class="object-cover h-40" src={img} />}</div>
        <div class="ml-4">
            <h3 class="text-lg font-semibold">{title}</h3>
            {description && <p class="text-base mt-2">{description}</p>}
            {date && <p class="text-base mt-2 text-gray-600">{date}</p>}
        </div>
    </div>
)

export default BlogRollCard
