import React from 'react'

const Title = ({title1, title2, titleStyles, title1Styles, paraStyles }) => {
  return (
    <div className={`${title1Styles} pb-1 `}>
        <h3 className={`${titleStyles} h3`}>
            {title1}
            <span className='text-secondary !font-light'>{title2}</span>
        </h3>
        <p className={`${paraStyles} hidden`}>Discover the best deals on our top-quality products</p>
    </div>
  )
}

export default Title