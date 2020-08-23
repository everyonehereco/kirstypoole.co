import React from 'react'

const BlogCard = ({ title, img, description, date }) => (
    <div class="h-full">
        <div>{img && <img class="h-64 w-full" src={img} />}</div>
        {date && (
            <p class="text-xs font-normal mt-4 text-gray-700 uppercase">
                {date}
            </p>
        )}
        <h3 class="text-2xl font-semibold mt-4">{title}</h3>
        {description && (
            <p class="text-sm text-gray-700 font-light mt-4">{description}</p>
        )}
    </div>
)

export default BlogCard
