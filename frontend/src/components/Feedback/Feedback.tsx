import React, { useState } from 'react';
import { Text, Stack, TextField, PrimaryButton, DefaultButton, ITextFieldStyles } from '@fluentui/react';
import { useNavigate } from 'react-router-dom';
import styles from '../../pages/chat/Chat.module.css';
import { ThumbDislikeRegular, ThumbLikeRegular } from '@fluentui/react-icons';

const Feedback: React.FC = () => {
    const [feedback, setFeedback] = useState<string>('');
    const navigate = useNavigate();
    const [selectedButton, setSelectedButton] = useState<string>("");
    const [showThankYou, setShowThankYou] = useState<boolean>(false);


    const handleFeedbackChange = (event: React.FormEvent<HTMLInputElement | HTMLTextAreaElement>, newValue?: string) => {
        setFeedback(newValue || '');
    };

    const handleSubmit = () => {

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
                styles={{ root: { height: '100vh', marginTop: !showThankYou ? "100px" : "0px" } }}
                tokens={{ childrenGap: 50 }}
            >
                {showThankYou ? (
                    <Stack tokens={{ childrenGap: 10 }} horizontalAlign="center" verticalAlign='center'>
                        <Text variant="xxLarge" style={{ color: "#FFFFFF", marginBottom: 20 }}>Thank you for your response!</Text>
                        <PrimaryButton style={{ width: "350px", borderRadius: 10, padding: 20, background: 'black', opacity: 0.5, border: "none" }} onClick={handleNaviagte}>Go to Home</PrimaryButton>
                    </Stack>
                ) : (
                    <>
                        <Stack tokens={{ childrenGap: 10 }} horizontalAlign="center">
                            <Text style={{ color: "#EEE" }} variant="xLarge">Rate your experience</Text>
                        </Stack>
                        <Stack horizontal style={{ width: "350px" }} tokens={{ childrenGap: 20 }}>
                            <DefaultButton
                                style={{ width: "50%", height: "100%", backgroundColor: selectedButton === "Like" ? "teal" : "black", borderRadius: 20, padding: 10 }}
                                onClick={() => handleIconClick("Like")}
                            >
                                <Stack horizontalAlign='center' verticalAlign='center' tokens={{ childrenGap: 10 }}>
                                    <ThumbLikeRegular color={selectedButton === "Like" ? "black" : 'green'} style={{ width: '100%', height: '100%' }} />
                                    <Text style={{ color: "#EEE" }}>Good</Text>
                                </Stack>
                            </DefaultButton>
                            <DefaultButton
                                style={{ width: "50%", height: "100%", backgroundColor: selectedButton === "DisLike" ? "teal" : "black", borderRadius: 20, padding: 10 }}
                                onClick={() => handleIconClick("DisLike")}
                            >
                                <Stack horizontalAlign='center' verticalAlign='center' tokens={{ childrenGap: 10 }}>
                                    <ThumbDislikeRegular color={selectedButton === "DisLike" ? "black" : '#e46969'} style={{ width: '70%', height: '70%' }} />
                                    <Text style={{ color: "#EEE" }}>Improve</Text>
                                </Stack>
                            </DefaultButton>
                        </Stack>
                        <TextField
                            style={{ outline: "none" }}
                            placeholder="Anything specific you would like to share?"
                            multiline
                            resizable={false}
                            rows={5}
                            value={feedback}
                            onChange={handleFeedbackChange}
                            styles={{
                                root: { width: 350, opacity: 0.3 }, fieldGroup: { borderRadius: 20, background: "black", border: "none" }, field: {
                                    color:"white",
                                    padding: 20, selectors: {
                                        '::placeholder': {
                                            color: 'lightgray'
                                        }
                                    }
                                }
                            }}
                        />
                        <PrimaryButton style={{ width: "350px", borderRadius: 10, padding: 20, background: 'black', opacity: 0.5, border: "none" }} onClick={handleSubmit}>Submit</PrimaryButton>
                    </>)}
            </Stack>
        </div>
    );
};

export default Feedback;
