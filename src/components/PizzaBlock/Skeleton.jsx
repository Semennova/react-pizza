import React from "react"
import ContentLoader from "react-content-loader"

const Skeleton = (props) => (
    <ContentLoader 
    className="pizza-block"
      speed={2}
      width={280}
      height={466}
      viewBox="0 0 280 466"
      backgroundColor="#f3f3f3"
      foregroundColor="#ecebeb"
      {...props}
    >
      <circle cx="138" cy="125" r="125" /> 
      <rect x="61" y="214" rx="0" ry="0" width="1" height="1" /> 
      <rect x="0" y="293" rx="10" ry="10" width="280" height="88" /> 
      <rect x="0" y="396" rx="10" ry="10" width="90" height="27" /> 
      <rect x="127" y="390" rx="22" ry="22" width="152" height="45" /> 
      <rect x="185" y="396" rx="0" ry="0" width="1" height="1" /> 
      <rect x="0" y="257" rx="10" ry="10" width="280" height="27" />
    </ContentLoader>
  )

export default Skeleton