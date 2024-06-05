import * as React from 'react';
import { Carousel } from 'react-responsive-carousel';
import 'react-responsive-carousel/lib/styles/carousel.min.css';

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

const CarouselComponent: React.FC = () => {
  return (
    <Carousel >
      {dummyData.map((item) => (
        <div
          key={item.id}
          style={{
            backgroundColor: '#eccb3c',
            padding: '20px',
            borderRadius: '10px',
            color: '#000000',
            textAlign: 'center',
            width: '350px', 
            margin: '0 auto', 
            boxSizing: 'border-box',
            height: '450px', 
            display: 'flex',
            flexDirection: 'column',
          }}
        >
          <h3 style={{ fontWeight: 'bold', margin: '0 0 50px',marginBottom:50 }}>{item.title}</h3>
          <ul style={{ textAlign: 'left', paddingLeft: '20px', margin: 0 }}>
            {item.descriptions.map((description, index) => (
              <li key={index} style={{ fontWeight: '500', marginBottom: '10px',padding:10 }}>
                {description}
              </li>
            ))}
          </ul>
        </div>
      ))}
    </Carousel>
  );
};

export default CarouselComponent;
