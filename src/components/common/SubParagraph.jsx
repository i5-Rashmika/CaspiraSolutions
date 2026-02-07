import React from 'react'

const SubParagraph = ({ title, className = "" }) => {
    return (
      
            <p className={`text-sm md:text-base font-normal max-w-[730px] text-center mx-auto text-[#FFFFFF99] leading-6 px-2 font_mmr ${className}`}>
                {title}
            </p>
    )
}

export default SubParagraph
