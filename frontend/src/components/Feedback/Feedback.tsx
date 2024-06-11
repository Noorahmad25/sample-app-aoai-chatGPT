import React, { useContext, useState } from 'react';
import { Text, Stack, TextField, PrimaryButton, DefaultButton, ITextFieldStyles } from '@fluentui/react';
import { useNavigate } from 'react-router-dom';
import styles from '../../pages/chat/Chat.module.css';
import { ThumbDislikeRegular, ThumbLikeRegular } from '@fluentui/react-icons';
import { sendFeedback } from '../../api';
import { AppStateContext } from '../../state/AppProvider';

const Feedback: React.FC = () => {
    const [feedback, setFeedback] = useState<string>('');
  const appStateContext = useContext(AppStateContext);

  const conversationId = appStateContext?.state?.conversationId;

    const navigate = useNavigate();
    const [selectedButton, setSelectedButton] = useState<string>("");
    const [showThankYou, setShowThankYou] = useState<boolean>(false);
    const containerStyle: React.CSSProperties = {
        display: 'flex',
        alignItems: 'center',
        width: '100%',
        borderRadius: '35px',
        padding: '15px',
        boxShadow: 'none',
      };
    const textFieldStyle: React.CSSProperties = {
        flex: 1,
        width:"100%",
        border: 'none',
        outline: 'none',
        backgroundColor: 'inherit',
    };

    const textFieldWrapperStyle: React.CSSProperties = {
        flex: 1,
        borderRadius: '25px',
      };

    const handleFeedbackChange = (event: React.FormEvent<HTMLInputElement | HTMLTextAreaElement>, newValue?: string) => {
        setFeedback(newValue || '');
    };

    const handleSubmit = () => {
        console.log(conversationId)
        sendFeedback(feedback, selectedButton, conversationId || "")
        setFeedback('');
        setSelectedButton('');
        setShowThankYou(true);
    };

    const handleNaviagte = () => {
        navigate("/");
    }

    const handleIconClick = (selectedValue: string): void => {
        setSelectedButton(selectedValue);
    }

    return (
        <div className={styles.chatContainer}>
            <Stack
                horizontalAlign="center"
                verticalAlign={showThankYou ? "center" : "start"}
                styles={{ root: { height: '100vh', marginTop: !showThankYou ? "200px" : "0px" } }}
                tokens={{ childrenGap: 40 }}
            >
                {showThankYou ? (
                    <Stack tokens={{ childrenGap: 10 }} horizontalAlign="center" verticalAlign='center'>
                        <Text variant="xxLarge" style={{ color: "#FFFFFF", marginBottom: 20 }}>Thank you for your response!</Text>
                        <PrimaryButton style={{ width: "100%", height: "50px", borderRadius: 10, padding: 20, background: 'black', fontSize: "0.875rem", border: "none" }} onClick={handleNaviagte}>Go to Home</PrimaryButton>
                    </Stack>
                ) : (
                    <>
                        <Stack tokens={{ childrenGap: 10 }} horizontalAlign="center">
                            <Text style={{ color: "#EEE" }} variant="xLarge">Rate your experience</Text>
                        </Stack>
                        <Stack horizontal style={{ width: "350px" }} tokens={{ childrenGap: 15 }}>
                            <DefaultButton
                                style={{ width: "50%", height: "86px", backgroundColor: selectedButton === "Like" ? "teal" : "#151B1E", borderRadius: "21px", padding: "50px" ,border:"none"}}
                                onClick={() => handleIconClick("Like")}
                            >
                                <Stack horizontalAlign='center' verticalAlign='center' tokens={{ childrenGap: 5 }}>
                                    <ThumbLikeRegular color={selectedButton === "Like" ? "black" : 'green'} style={{ width: '100%', height: '100%',marginTop:"8px" }} />
                                    <Text style={{ color: "#EEE",marginBottom:"8px" }}>Good</Text>
                                </Stack>
                            </DefaultButton>
                            <DefaultButton
                                style={{ width: "50%", height: "86px", backgroundColor: selectedButton === "DisLike" ? "teal" : "#151B1E", borderRadius: "21px",  padding: "50px" ,border:"none" }}
                                onClick={() => handleIconClick("DisLike")}
                            >
                                <Stack horizontalAlign='center' verticalAlign='center' tokens={{ childrenGap: 5 }}>
                                    <ThumbDislikeRegular color={selectedButton === "DisLike" ? "black" : '#e46969'} style={{ width: '70%', height: '70%' }} />
                                    <Text style={{ color: "#EEE" }}>Improve</Text>
                                </Stack>
                            </DefaultButton>
                        </Stack>
                        <TextField
                            placeholder="Anything specific you would like to share?"
                            multiline
                            resizable={false}
                            rows={5}
                            value={feedback}
                            style={textFieldStyle}
                            onChange={handleFeedbackChange}
                            styles={{
                                root: {
                                  color: "#FFFFFF",
                                  width:"100%",
                                  overflow: 'hidden',
                                  background: "#232e34",
                                    borderRadius: 20,
                                },
                                fieldGroup: {
                                  borderRadius: '25px',
                                  backgroundColor: 'inherit',
                                  margin:"-2px",
                                  overflow: 'hidden',
                                  border: 'none',
                                },
                                field: {
                                    height: "200px",
                                    lineHeight: "1.6em",
                                    color: "white",
                                    padding: 20, selectors: {
                                        '::placeholder': {
                                            color: 'lightgray'
                                        }
                                    }
                                },
                              }}
                        />
                        <Stack
                            tokens={{ childrenGap: 20 }}
                            horizontalAlign='center'
                            style={{ height: "10%", position: "fixed", bottom: 0 }}
                            styles={{ root: { padding: 20, flexWrap: "wrap" ,
                                '@media (max-width: 1000px)': {
                                    width: "100%",
                                  },
                                  '@media (max-width: 2500px) and (min-width: 1000px)': {
                                    width: "30%",
                                  },
                            } }}
                        >
                            <PrimaryButton disabled={!selectedButton || feedback===""} style={{ width: "100%", height: "50px", fontSize: "0.875rem", borderRadius: 10, padding: 20, background: 'black', border: "none" }} onClick={handleSubmit}>Submit</PrimaryButton>
                        </Stack>
                    </>)}
            </Stack>
        </div>
    );
};

export default Feedback;
