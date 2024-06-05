import React from 'react';
import { Text, Stack, DefaultButton, Image } from '@fluentui/react';
import styles from '../../pages/chat/Chat.module.css'
import { useNavigate } from 'react-router-dom';

interface DummyDataItem {
    image: string;
    title: string;
    description: string;
}

const dummyData: DummyDataItem[] = [
    {
        image: 'https://images.unsplash.com/photo-1495433324511-bf8e92934d90',
        title: 'Tahoe',
        description: 'A fishing boat out on the ocean during.'
    },
    {
        image: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e',
        title: 'Suntracker',
        description: 'A fishing boat out on the ocean during.'
    },
    {
        image: 'https://images.unsplash.com/photo-1506765515384-028b60a970df',
        title: 'Luxury Yacht',
        description: 'A luxury yacht anchored near a island.'
    },
];


const About: React.FC = () => {
    const navigate = useNavigate();
    const handleBoatSelection = (): void => {
        navigate("/productInfo")
    }
    return (
        <div className={styles.chatContainer}>
            <Stack
                horizontalAlign="center"
                styles={{ root: { height: '100vh',marginTop:20 } }}
            >
                <Stack
                    tokens={{ childrenGap: 20 }}
                    styles={{ root: { width: '100%', padding: 20 } }}
                >
                    <Text style={{color:"white"}} variant="xLarge">Top Recommendations for this store</Text>
                    {dummyData.map((item, index) => (
                        <DefaultButton key={index} styles={{ root: { width: '100%', height: 130, borderRadius: 30 ,backgroundColor:"#EEE"} }} onClick={handleBoatSelection}>
                            <Stack horizontal verticalAlign="center" tokens={{ childrenGap: 10 }} style={{ width: "100%" }}>
                                <Image
                                    src={item.image}
                                    alt={item.title}
                                    width={100}
                                    height={100}
                                    styles={{ root: { borderRadius: '30%' } }} 
                                />

                                <Stack tokens={{ childrenGap: 10 }} style={{ display: "flex", alignItems: "start",justifyContent:"center" }}>
                                    <Text style={{fontWeight:"bold"}} variant="large">{item.title}</Text>
                                    <Text >{item.description}</Text>
                                </Stack>
                            </Stack>
                        </DefaultButton>
                    ))}
                </Stack>
            </Stack>
        </div>
    );
};

export default About;
