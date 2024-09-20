// import React from 'react';
// import { Typography } from "antd";
// import Calender from "./Calender";
// import ChartDetail from "./ChartDetail";
// import Cardcomponent from "./Cardcomponent";
// import waveIcon from "../../utils/icons/emoji-wave.svg";

// const { Title } = Typography;

// const styles = {
//   section: {
//     backgroundColor: "#F8FBFB",
//     paddingLeft: 20,
//   },
//   header: {
//     display: "flex",
//     alignItems: "center",
//     justifyContent: "space-between",
//     width: "100%",
//     maxWidth: "1030px",
//     padding: 8,
//   },
//   greeting: {
//     display: "flex",
//     alignItems: "center",
//     gap: 8,
//   },
//   title: {
//     fontWeight: 600,
//     fontSize: "24px",
//     lineHeight: "32px",
//   },
//   waveIcon: {
//     marginBottom: "6px",
//   },
//   chartContainer: {
//     marginTop: "20px",
//   },
//   '@media (max-width: 768px)': {
//     section: {
//       paddingLeft: 10,
//     },
//     header: {
//       flexDirection: "column",
//       alignItems: "flex-start",
//       gap: 16,
//     },
//     title: {
//       fontSize: "20px",
//     },
//   },
// };

// const Board = () => {
//   const isMobile = window.innerWidth <= 768;

//   return (
//     <section style={{
//       ...styles.section,
//       ...(isMobile && styles['@media (max-width: 768px)'].section),
//     }}>
//       <div style={{
//         ...styles.header,
//         ...(isMobile && styles['@media (max-width: 768px)'].header),
//       }}>
//         <div style={styles.greeting}>
//           <Title
//             level={5}
//             style={{
//               ...styles.title,
//               ...(isMobile && styles['@media (max-width: 768px)'].title),
//             }}
//           >
//             Hello Tunde
//           </Title>
//           <img style={styles.waveIcon} src={waveIcon} alt="wave icon" />
//         </div>
//         <Calender />
//       </div>

//       <Cardcomponent />
//       <div style={styles.chartContainer}>
//         <ChartDetail />
//       </div>
//     </section>
//   );
// };

// export default Board;


import React, { useEffect, useState } from 'react';
import { Typography } from "antd";
import Calender from "./Calender";
import ChartDetail from "./ChartDetail";
import Cardcomponent from "./Cardcomponent";
import waveIcon from "../../utils/icons/emoji-wave.svg";

const { Title } = Typography;

const styles = {
  section: {
    backgroundColor: "#F8FBFB",
    paddingLeft: 20,
    fontFamily: "'Poppins', sans-serif", // Add a modern, clean font
  },
  header: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    width: "100%",
    maxWidth: "1030px",
    padding: 8,
  },
  greeting: {
    display: "flex",
    alignItems: "center",
    gap: 8,
  },
  title: {
    fontWeight: 600,
    fontSize: "28px", // Increased font size
    lineHeight: "36px", // Adjusted line height
    color: "#333", // Darker color for better contrast
    margin: 0, // Remove default margin
  },
  waveIcon: {
    marginBottom: "6px",
    width: "24px", // Set a specific size for the icon
    height: "24px",
  },
  chartContainer: {
    marginTop: "20px",
  },
  '@media (max-width: 768px)': {
    section: {
      paddingLeft: 10,
    },
    header: {
      flexDirection: "column",
      alignItems: "flex-start",
      gap: 16,
    },
    title: {
      fontSize: "24px", // Slightly smaller on mobile
      lineHeight: "32px",
    },
  },
};

const Board = () => {
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 768);
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return (
    <section style={{
      ...styles.section,
      ...(isMobile && styles['@media (max-width: 768px)'].section),
    }}>
      <div style={{
        ...styles.header,
        ...(isMobile && styles['@media (max-width: 768px)'].header),
      }}>
        <div style={styles.greeting}>
          <Title
            level={4} // Changed from level 5 to 4 for larger default size
            style={{
              ...styles.title,
              ...(isMobile && styles['@media (max-width: 768px)'].title),
            }}
          >
            Hello Tunde
          </Title>
          <img style={styles.waveIcon} src={waveIcon} alt="wave icon" />
        </div>
        <Calender />
      </div>

      <Cardcomponent />
      <div style={styles.chartContainer}>
        <ChartDetail />
      </div>
    </section>
  );
};

export default Board;
