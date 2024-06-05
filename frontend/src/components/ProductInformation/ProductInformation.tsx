import React, { useState } from 'react';
import { DefaultButton, PrimaryButton, Stack, Text, mergeStyles } from '@fluentui/react';
import WalkAround from './WalkAround';
import FlashCard from './FlashCard';
import styles from '../../pages/chat/Chat.module.css'
import { useNavigate } from 'react-router-dom';
import { Library16Filled, VehicleShip16Filled } from '@fluentui/react-icons';

const ProductInformation: React.FC = () => {
  const [selectedOption, setSelectedOption] = useState<string>('FlashCard');
  const navigate = useNavigate();

  const handleOptionClick = (option: string) => {
    setSelectedOption(option);
  };

  const handleNextClick = () => {
    navigate("/feedback");
  };

  // Define button styles inside the component
  const buttonStyles = mergeStyles({

  });

  return (
    <div className={styles.chatContainer}>
      <Stack horizontalAlign="center" styles={{ root: { height: '100vh', padding: 20, width: "100%" } }}>
        <Stack horizontal tokens={{ childrenGap: 10 }} style={{ marginBottom: 20 }}>
          <PrimaryButton
            onClick={() => handleOptionClick('FlashCard')}
            styles={{
              root: {
                height: 50,
                width: 150,
                background: "transparent",
                borderRadius: 5,
                color: '#FFFFFF',
                boxShadow: 'none',
                border: `1px solid ${selectedOption === 'FlashCard' ? 'black' : 'transparent'}`,

                selectors: {
                  ':hover': {
                    background: "transparent",
                  },
                  ':active': {
                    background: "transparent",
                  },
                  ':focus': {
                    background: "transparent",
                  },
                },
              }
            }}
          >
            <Library16Filled />
            <Text style={{ color: "#FFFFFF", marginLeft: 5 }} >{"Value Props"}</Text>
          </PrimaryButton>
          <PrimaryButton
            onClick={() => handleOptionClick('WalkAround')}
            styles={{
              root: {
                height: 50,
                width: 150,
                background: "transparent",
                borderRadius: 5,
                border: `1px solid ${selectedOption === 'WalkAround' ? 'black' : 'transparent'}`,
                color: '#FFFFFF',
                boxShadow: 'none',
                selectors: {
                  ':hover': {
                    background: "transparent",
                  },
                  ':active': {
                    background: "transparent",

                  },
                  ':focus': {
                    background: "transparent",
                  },
                },
              }
            }}
          >
            <VehicleShip16Filled />
            <Text style={{ color: "#FFFFFF", marginLeft: 5 }} >{"Walk Around"}</Text>
          </PrimaryButton>
        </Stack>
        {selectedOption === 'WalkAround' ? <WalkAround /> : <FlashCard />}
        <Stack
          tokens={{ childrenGap: 20 }}
          horizontalAlign='center'
          styles={{ root: { width: '100%', padding: 20, flexWrap: "wrap" } }}
        >
          <PrimaryButton style={{ width: "100%", maxWidth: "350px", borderRadius: 10, padding: 20, background: "black", opacity: 0.5, border: "none" }} onClick={handleNextClick}>Submit</PrimaryButton>
        </Stack>
      </Stack>
    </div>
  );
};

export default ProductInformation;
