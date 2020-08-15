import React from 'react'

const BlogCard = ({ title, img, description, date }) => (
    <div class="bg-white h-full shadow-lg p-4 border border-white hover:bg-pink-100 hover:border hover:border-gray-500 hover:shadow-md">
        <div>{img && <img class="object-cover h-40 w-full" src={img} />}</div>
        <h3 class="text-lg font-semibold mt-4">{title}</h3>
        {description && <p class="text-base mt-2">{description}</p>}
        {date && <p class="text-base mt-2 text-gray-600">{date}</p>}
    </div>
)

export default BlogCard
