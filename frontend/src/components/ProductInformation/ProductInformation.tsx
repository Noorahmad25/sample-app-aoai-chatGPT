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

  return (
    <div className={styles.chatContainer}>
      <Stack horizontalAlign="center" styles={{ root: { height: '100vh', padding: 20,marginTop:50, width: "100%" } }}>
        <Stack horizontal tokens={{ childrenGap: 10 }} style={{ marginBottom: 10,height:"8%",width:"100%",padding:"0px 15px" }}>
          <PrimaryButton
            onClick={() => handleOptionClick('FlashCard')}
            styles={{
              root: {
                height: 50,
                width: "50%",
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
                width: "50%",
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
        <Stack
          style={{height:"82%",width:"100%",display:"flex",flexDirection:"column",flexWrap:"wrap",flexFlow:"column",overflowY:"auto",alignItems:"center"}}
        tokens={{childrenGap:10}}
        >
        {selectedOption === 'WalkAround' ? <WalkAround /> : <FlashCard />}
        </Stack>
        <Stack
          tokens={{ childrenGap: 20 }}
          horizontalAlign='center'
          style={{height:"10%",position:"fixed",bottom:0}}
          styles={{ root: { width: '100%', padding: 20, flexWrap: "wrap" } }}
        >
          <PrimaryButton style={{ width: "100%", borderRadius: 10, padding: 20, background: "black", opacity: 0.5, border: "none" }} onClick={handleNextClick}>Submit</PrimaryButton>
        </Stack>
      </Stack>
    </div>
  );
};

export default ProductInformation;
