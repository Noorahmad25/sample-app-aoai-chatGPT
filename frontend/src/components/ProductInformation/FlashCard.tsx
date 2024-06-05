import React from 'react';
import { DocumentCard, DocumentCardTitle, DocumentCardDetails, Stack, Text } from '@fluentui/react';

const abilities = [
  { title: 'Speed Boost', description: 'Increases the boat’s speed by 20%.' },
  { title: 'Enhanced Durability', description: 'Reinforced hull for increased durability.' },
  { title: 'Advanced Navigation System', description: 'State-of-the-art navigation system for easy tracking.' },
  { title: 'Auto-Pilot', description: 'Autonomous driving for hands-free navigationAutonomous driving for hands-free .' },
  { title: 'Luxury Interior', description: 'High-end materials and finishes for ultimate comfort.' }
];

const FlashCard: React.FC = () => {
  return (
    <Stack horizontalAlign='center' wrap tokens={{ childrenGap: 20 }} styles={{ root: { marginTop: 20 ,width:"100%"} }}>
      {abilities.map((ability, index) => (
        <DocumentCard key={index} 
        styles={{
          root: {
            backgroundColor:"#75ac51",
            width: '100%',
            maxWidth: '500px',
            minWidth: '200px',
            margin: '10px',
            borderRadius:20,
            boxShadow:"1px 1px 0px black",
            '@media (max-width: 480px)': {
              maxWidth: '350px'
            },
            '@media (min-width: 481px)': {
              maxWidth: '400px'
            }
          }
        }}
        >
          <Stack styles={{ root: { padding: 20 ,width:"100%"} }}>
            <Stack.Item>
              <DocumentCardTitle title={ability.title} styles={{root:{fontWeight:"bold",textAlign:"left",padding:0,height:20,color:"white"}}} />
            </Stack.Item>
            <Stack.Item grow>
              <DocumentCardDetails styles={{root:{marginTop:10}}}>
                <Text style={{color:"white"}}>{ability.description}</Text>
              </DocumentCardDetails>
            </Stack.Item>
          </Stack>
        </DocumentCard>
      ))}
    </Stack>
  );
};

export default FlashCard;
