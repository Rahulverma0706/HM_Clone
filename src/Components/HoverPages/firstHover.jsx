import { useState } from 'react';
import '../../Styles/HoverMenu/FirstHover.css'

const HoverCardMenu = () => {
  const [isHovered, setIsHovered] = useState(false);

  const handleMouseEnter = () => {
    setIsHovered(true);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
  };

  return (
    <div
      className="hover-card-container"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <button>Hover Here</button>
      {isHovered && (
        <div className="hover-card">
          {/* Content for the hover card menu */}
          <label>New Arrivals</label>
         <ul>
             <li>View All</li>
             <li>Clothes</li>
         </ul>
        
         <label >Offers</label>
         <ul>
             <li>Member Exclusive Prices</li>
             <li>Up to 40% off</li>
         </ul>
         <label >Trending Now</label>
         <ul>
             <li>Trending Now</li>
         </ul>
        </div>
      )}
    </div>
  );
};

export default HoverCardMenu;

 
// const FirstHover = () => {
//   return (
//     <div>
      
//         
        
        
//     </div>
//   )
// }

// export default FirstHover
