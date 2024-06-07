import React from 'react';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import { Text, Stack, mergeStyles } from '@fluentui/react';

const dummyData = [
  {
    id: 1,
    title: 'Exterior',
    descriptions: [
      'Sleek and sporty design enhances aesthetic appeal and ensures head-turning looks on the water.',
      'Durable construction guarantees long-lasting performance and reliability.',
      'Latest model year features include cutting-edge technology and modern design elements.',
    ],
  },
  {
    id: 2,
    title: 'Cockpit and Helm',
    descriptions: [
      'User-friendly driver console with advanced 8” TAHOE CRUISE® digital touchscreen dashboard for intuitive control.',
      'Sport steering wheel and responsive hydraulic steering offer precise control for a better driving experience.',
      'Blend of technology and comfort designed to make the captain feel at ease and in command.',
    ],
  },
  {
    id: 3,
    title: 'Seating and Comfort',
    descriptions: [
      'Plush seating arrangements, including spacious bow and stern seats, ensure comfort for all passengers.',
      'High-quality materials and ergonomic design provide a luxurious and relaxing experience.',
      'Adjustable seating and ample legroom enhance overall comfort during long rides.',
    ],
  },
  {
    id: 4,
    title: 'Entertainment Features',
    descriptions: [
      'State-of-the-art sound system controlled via the digital touchscreen for an immersive audio experience.',
      'Bluetooth connectivity and multiple strategically placed speakers for seamless music enjoyment.',
      'Charging ports available for keeping devices powered throughout the journey.',
    ],
  },
  {
    id: 5,
    title: 'Storage Solutions',
    descriptions: [
      'Under-seat storage compartments and dedicated spaces for fishing gear, life jackets, and other essentials.',
      'Lockable storage areas for valuables ensure security and peace of mind.',
      'High capacity and easy access to storage solutions make organization simple and convenient.',
    ],
  },
];

const carouselContainerStyle = mergeStyles({
  marginTop: 20,
  width: '90%',
  backgroundColor: '#eccb3c',
  borderRadius: 10,
  height: "80%",
  // padding: 20,
});

const slideStyle = mergeStyles({
  padding: "50px 10px",
  textAlign: 'center',
  boxSizing: 'border-box',
  height: "80%",
  display: 'flex',
  flexDirection: 'column',
  position: 'relative', // To position the title
});

const titleStyle = mergeStyles({
  position: 'absolute', // Position title absolutely
  top: 10, // Positioning from top
  left: 20, // Positioning from left
  fontWeight: 'bold',
});

const contentStackStyle = mergeStyles({
  height: '100%',
  justifyContent: 'center',
  alignItems: 'flex-start',
  paddingLeft: 20,
});

const CarouselComponent: React.FC = () => {
  const settings = {
    dots: true,
    infinite: false,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows: false, // Remove arrows
  };

  return (
    <div className={carouselContainerStyle}>
      <Slider {...settings}>
        {dummyData.map((item) => (
          <div key={item.id} className={slideStyle}>
            <Text variant="xLarge" className={titleStyle}>
              {item.title}
            </Text>
            <Stack tokens={{ childrenGap: 10 }} className={contentStackStyle}>
              <ul style={{ padding: '0 20px', margin: 0, listStyle: 'disc', display:"flex",alignItems:'center',flexDirection:"column",marginTop:20 }}>
                {item.descriptions.map((description, index) => (
                  <li key={index} style={{ fontWeight: 500,textAlign:"justify",marginBottom:10,marginTop:10 }}>
                    {description}
                  </li>
                ))}
              </ul>
            </Stack>
          </div>
        ))}
      </Slider>
    </div>
  );
};

export default CarouselComponent;
