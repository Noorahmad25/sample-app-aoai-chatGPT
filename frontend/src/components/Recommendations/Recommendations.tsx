import React, { useContext, useState } from 'react';
import { Text, Stack, DefaultButton, Image, Spinner, PrimaryButton } from '@fluentui/react';
import styles from '../../pages/chat/Chat.module.css'
import { useNavigate } from 'react-router-dom';
import { AppStateContext } from '../../state/AppProvider';
import { getValuePropositions, getWalkthroughData } from '../../api';
import { templete2, templete3 } from '../../constants/templete';

const About: React.FC = () => {
    const navigate = useNavigate();
    const appStateContext = useContext(AppStateContext);
    const [selectedItem, setSelectedItem] = useState<any>(null);
    const dummyData = appStateContext?.state?.recommendation;
    const isLoading = appStateContext?.state?.isLoadingRecommendations;

    const handleBoatSelection = (item: any): void => {
        setSelectedItem(item);
    }
    console.log({ selectedItem })
    const handleNextClick = (): void => {
        if (selectedItem) {

            try {
                appStateContext?.dispatch({ type: 'SET_VALUE_PROPOSITION_LOADING', payload: true })
                appStateContext?.dispatch({ type: 'SET_WALKTHROUGH_LOADING', payload: true })

                const valuePropositionsResponse = getValuePropositions({ question: templete2(selectedItem?.title) })
                const walkaroundResponse = getWalkthroughData({ question: templete3(selectedItem?.title) })
                const valuePropositionsData =
                {
                    "output": "{\"value_propositions\": [{\"title\": \"TRACK FORMED fence design with high-sheen finish\", \"detail\": \"Delivers enhanced aesthetic appeal and durability\"}, {\"title\": \"10\’ SUN TRACKER QuickLift Bimini top\", \"detail\": \"Provides easy and quick protection from the sun\"}, {\"title\": \"SUN TRACKER FLARE touchscreen gauge display & 12-button switch panel\", \"detail\": \"Offers modern, easy-to-use navigational and control features\"}, {\"title\": \"Wet Sounds stereo with Bluetooth & two 6.5\\\" upholstery speakers\", \"detail\": \"Ensures high-quality audio entertainment on the water\"}, {\"title\": \"New motor & adaptor harnesses\", \"detail\": \"Improves performance and compatibility with various accessories\"}]}"
                }
                const walkaroundData=
                {
                    "output": "{\"value_propositions\": [{\"title\": \"Driver Console\", \"detail\": \"Features an advanced 8\” TAHOE CRUISE\® digital touchscreen dashboard for unprecedented insight and control, paired with a sport steering wheel and responsive hydraulic steering.\"}, {\"title\": \"Seating Capacity\", \"detail\": \"Accommodates up to 11 passengers in a feature-rich interior, ensuring comfort during full days of cruising and adventure.\"}, {\"title\": \"Entertainment System\", \"detail\": \"Equipped with a powerful KICKER\® Bluetooth stereo system and an advanced phone management station for all-day entertainment.\"}, {\"title\": \"Storage Solutions\", \"detail\": \"Plentiful storage options are available for all your gear, keeping the deck clear and organized.\"}, {\"title\": \"Water Sports Features\", \"detail\": \"Comes with a removable ski tow pylon for water sports and adventure.\"}, {\"title\": \"Swim Platforms\", \"detail\": \"Features aft swim platforms with a boarding ladder, making it easy to access the water.\"}]}"
                }

                if (valuePropositionsData) {
                    const parsedDataValueProps = JSON.parse(valuePropositionsData?.output);
                    const valuePropositions = parsedDataValueProps?.value_propositions
                    appStateContext?.dispatch({ type: 'SET_VALUE_PROPOSITION_STATE', payload: valuePropositions })
                }
                if (walkaroundData) {
                    const parsedDataWalkThrough = JSON.parse(walkaroundData?.output);
                    const walkThrough = parsedDataWalkThrough?.value_propositions
                    appStateContext?.dispatch({ type: 'SET_WALKTHROUGH_STATE', payload: walkThrough })
                }
                //these calls will be removed 
                appStateContext?.dispatch({ type: 'SET_VALUE_PROPOSITION_LOADING', payload: false })
                appStateContext?.dispatch({ type: 'SET_WALKTHROUGH_LOADING', payload: false })
            } catch (error) {
                appStateContext?.dispatch({ type: 'SET_VALUE_PROPOSITION_LOADING', payload: false })
                appStateContext?.dispatch({ type: 'SET_WALKTHROUGH_LOADING', payload: false })

            }
            navigate("/productInfo");

        }
    }

    return (
        <div className={styles.chatContainer}>
            {isLoading ? (
                <div style={{ display: "flex", alignItems: "center", justifyContent: "center", height: "100%" }}>
                    <Spinner label="Loading recommendations..." />
                </div>
            ) : (
                <Stack
                    horizontalAlign="center"
                    styles={{ root: { height: '90vh', marginTop: 20 } }}
                >
                    <Stack
                        tokens={{ childrenGap: 20 }}
                        styles={{ root: { width: '100%', padding: 20, marginTop: 10 } }}
                    >
                        {dummyData && dummyData.length > 0 && (
                            <Text style={{ color: "white", marginBottom: 20 }} variant="xLarge">Top Recommendations for this store</Text>
                        )}
                        {dummyData && dummyData.length > 0 && dummyData.map((item, index) => (
                            <DefaultButton key={index} styles={{ root: { width: '100%', height: "100%", padding: "10px 10px", maxHeight: 150, borderRadius: 30, opacity: selectedItem === item ? 1 : 0.8, backgroundColor: selectedItem === item ? "#FFFFFF" : "#d0d0d0" } }} onClick={() => handleBoatSelection(item)}>
                                <Stack horizontal verticalAlign="center" tokens={{ childrenGap: 10 }} style={{ width: "100%" }}>
                                    <Image
                                        src={"https://images.unsplash.com/photo-1495433324511-bf8e92934d90"}
                                        alt={item.title}
                                        width={"30%"}
                                        height={100}
                                        styles={{ root: { borderRadius: '30%' } }}
                                    />

                                    <Stack tokens={{ childrenGap: 10 }} style={{ display: "flex", alignItems: "start", justifyContent: "center", textAlign: "initial", width: "70%" }}>
                                        <Text style={{ fontWeight: "bold" }} variant="large">{item.title}</Text>
                                        <Text >{item.detail}</Text>
                                    </Stack>
                                </Stack>
                            </DefaultButton>
                        ))}
                    </Stack>
                    {dummyData && dummyData.length === 0 && (
                        <div style={{ display: "flex", alignItems: "center", justifyContent: "center", height: "100%" }}>
                            <Text style={{ fontWeight: "bold", color: "#FFFFFF" }} variant="xLarge" >No Recommendations found</Text>
                        </div>
                    )}
                </Stack>
            )}
            <Stack
                tokens={{ childrenGap: 20 }}
                horizontalAlign='center'
                style={{ height: "10%", position: "fixed", bottom: 0 }}
                styles={{ root: { width: '100%', padding: 20, flexWrap: "wrap" } }}
            >
                <PrimaryButton style={{ width: "100%", height: "50px", fontSize: "0.875rem", borderRadius: 10, padding: 20, background: selectedItem ? "black" : "#191A1B", opacity: selectedItem ? 1 : 0.5, border: "none" }} onClick={handleNextClick}>Submit</PrimaryButton>
            </Stack>
        </div>
    );
};

export default About;
