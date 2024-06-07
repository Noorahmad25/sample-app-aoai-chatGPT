import React from 'react';
import { DocumentCard, DocumentCardTitle, DocumentCardDetails, Stack, Text } from '@fluentui/react';

const abilities = [
  { title: 'Speed Boost', description: 'Increases the boat’s speed by 20%.' },
  { title: 'Enhanced Durability', description: 'Reinforced hull for increased durability.' },
  { title: 'Advanced Navigation System', description: 'State-of-the-art navigation system for easy tracking.' },
  { title: 'Auto-Pilot', description: 'Autonomous driving for hands-free navigation.' },
  { title: 'Luxury Interior', description: 'High-end materials andHigh-end materials andHigh-end materials andHigh-end materials andHigh-end materials and finishes for ultimate comfortHigh-end materials and finishes for ultimate comfortHigh-end materials and finishes for ultimate comfort.' },
];

const FlashCard: React.FC = () => {
  return (
    <>
      {abilities.map((ability, index) => (
        <DocumentCard
          key={index}
          styles={{
            root: {
              backgroundColor: '#75ac51',
              width: '100%',
              maxWidth: '100%',
              minWidth: '200px',
              borderRadius: 20,
              boxShadow: '1px 1px 0px black',
            },
          }}
        >
          <Stack styles={{ root: { padding: 20, width: '100%' } }}>
            <Stack.Item>
              <DocumentCardTitle title={ability.title} styles={{ root: { fontWeight: 'bold', textAlign: 'left', padding: 0, height: 20, color: 'white' } }} />
            </Stack.Item>
            <Stack.Item grow>
              <DocumentCardDetails styles={{ root: { marginTop: 10 } }}>
                <Text style={{ color: 'white' }}>{ability.description}</Text>
              </DocumentCardDetails>
            </Stack.Item>
          </Stack>
        </DocumentCard>
      ))}
      </>
  );
};

export default FlashCard;
