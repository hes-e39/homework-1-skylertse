import fetch from 'node-fetch';
// Recommend using node-fetch for those familiar with JS fetch

const COLORS = 'https://nt-cdn.s3.amazonaws.com/colors.json';

/**
 * @param name filter for color name
 * @param hex filter for color hex code
 * @param compName filter for complementary color name
 * @param compHex filter for complementary color hex code
 * @returns Promise
 */
const fetchColors = ({ name, hex, compName, compHex }) => {
  return fetch(COLORS)
    .then(response => response.json())
    .then(colors => {
      // 根据过滤条件筛选数据; 我好累啊 （im so tired) lol
      let filteredColors = colors;
      // console.log(filteredColors);
      if (name) {
        filteredColors = filteredColors.filter(color => 
          color.name.toLowerCase().includes(name.toLowerCase())
        );
      }
      if (hex) {
        filteredColors = filteredColors.filter(color => 
          color.hex.toLowerCase().includes(hex.toLowerCase())
        );
      }
      if (compName) {
        filteredColors = filteredColors.filter(color =>
        color.comp.some(C=>C.name.toLowerCase().includes(compName.toLowerCase()))
        );
      }

      if (compHex) {
        filteredColors = filteredColors.filter(color =>
        color.comp.some(C=>C.hex.toLowerCase().includes(compHex.toLowerCase()))
        );
      }


      return filteredColors;
    }
    )
};


// Leave this here
export default fetchColors;
