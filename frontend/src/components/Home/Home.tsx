import { DefaultButton, Stack, Text } from '@fluentui/react';
import React, { useContext, useEffect, useMemo, useState } from 'react';
import { dummydata } from '../../constants/dummydata';
import { CategoryItem, ChildItem } from '../../types/DummyDataItem';
import CustomTextField from '../CustomTextField';
import CustomIconButton from '../CustomIconButton';
import { useNavigate } from 'react-router-dom';
import { AppStateContext } from '../../state/AppProvider';
import template from '../../constants/templete';
import { getRecommendations } from '../../api';

const Home: React.FC = () => {

    const appStateContext = useContext(AppStateContext)
    const [inputValue, setInputValue] = useState<string>('');
    const [isTextFieldFocused, setIsTextFieldFocused] = useState<boolean>(false);
    const [showMore, setShowMore] = useState<{ [key: string]: boolean }>({});
    const [selectedKeys, setSelectedKeys] = useState<{ key: string, value: string, type: 'parent' | 'child',promptValue:string }[]>([]);

    const navigate = useNavigate();
    const [tags, setTags] = useState<{ [key: string]: string[] }>(() => {
        const initialTags: { [key: string]: string[] } = {};
        for (const [key, value] of Object.entries(dummydata)) {
            if (key !== "id") {
                const categories = value.map((item: any) => item.category);
                initialTags[key] = categories;
            }
        }
        return initialTags;
    });

    const handleGroupSelection = (key: string, tag: string) => {
        if (Object.keys(dummydata).includes(key)) {
            const categoryArray = (dummydata as any)[key];
            const selectedCategory = categoryArray.find((categoryItem: CategoryItem) => categoryItem.category === tag && categoryItem?.child?.length > 0);

            setTags(prevTags => {
                const updatedTags = { ...prevTags };

                if (selectedCategory) {
                    const categoryIndex = updatedTags[key].indexOf(tag);
                    if (categoryIndex !== -1) {
                        const childTags = selectedCategory.child.map((child: ChildItem) => Object.keys(child)[0]);
                        updatedTags[key].splice(categoryIndex, 1, ...childTags);
                    }
                }

                return updatedTags;
            });

            const type = selectedCategory || key === "prioritize" ? 'parent' : 'child';
            const existingIndex = selectedKeys.findIndex(item => item.key === key && item.value === tag);
            let promptValue: string;
            if (type === "child") {
                const matchingChild = categoryArray.reduce((result: string | undefined, categoryItem: CategoryItem) => {
                    if (result) return result; 
                    const matchingChild = categoryItem.child.find((child: ChildItem) => Object.keys(child)[0] === tag);
                    if (matchingChild) {
                        promptValue = Object.values(matchingChild)[0]; 
                        return Object.values(matchingChild)[0]; 
                    }
                    return result;
                }, undefined);
            }
            if (existingIndex !== -1) {
                setSelectedKeys(prevKeys => prevKeys.filter((_, index) => index !== existingIndex));
            } else {
                setSelectedKeys(prevKeys => [
                    ...prevKeys,
                    { key, value: tag, type, promptValue: promptValue }
                ]);
            }
        }
    };

    const toggleShowMore = (heading: string) => {
        setShowMore(prevState => ({
            ...prevState,
            [heading]: !prevState[heading]
        }));
    };

    const capitalizeFirstLetter = (string: string) => {
        return string.charAt(0).toUpperCase() + string.slice(1);
    };

    const processTemplate = () => {
        let result = '';
    
        (Object.keys(template) as (keyof typeof template)[]).forEach((key) => {
            const parentKey = selectedKeys.find(item => item.key === key && item.type === 'parent');
            const childKeys = selectedKeys.filter(item => item.key === key && item.type === 'child');
    
            let processedValue = template[key];
    
            if (parentKey) {
                processedValue = processedValue.replace(`[${capitalizeFirstLetter(key)} Level 1]`, parentKey.value);
            }
    
            const validChildKeys = childKeys.filter(item => item.promptValue);
            if (validChildKeys.length > 0) {
                const children = validChildKeys.map(item => item.promptValue).join(', ');
                processedValue = processedValue.replace(`[${capitalizeFirstLetter(key)} Level 2]`, children);
            } else {
                const level2Placeholder = `[${capitalizeFirstLetter(key)} Level 2]`;
                processedValue = processedValue.replace(`,including ${level2Placeholder}`, '');
                processedValue = processedValue.replace(`,specially ${level2Placeholder}`, '');
                processedValue = processedValue.replace(`with ${level2Placeholder}`, '');
            }
    
            if (parentKey || validChildKeys.length > 0) {
                result += processedValue.trim() + ' ';
            }
        });
        result += "What are the top 3 boat models we should recommend?";
    
        return result.trim();
    };
    
    useEffect(() => {
        const processedTemplate = processTemplate();
        if (processedTemplate.trim() !== "" && selectedKeys?.length > 0) {
            setInputValue(processedTemplate);
        }
    }, [selectedKeys]);

    const buttonDisabled = useMemo(() => {
        return inputValue === "" && selectedKeys?.length === 0;
    }, [selectedKeys, inputValue]);

    const handleSubmit = async () => {
        try {
            appStateContext?.dispatch({ type: 'SET_RECOMMENDATIONS_LOADING', payload: true })
            const response = getRecommendations({ question: inputValue })
            const data = {
                "output": "{\"value_propositions\": [{\"title\": \"REGENCY 250 LE3 Sport\", \"detail\": \"Offers a luxurious and comfortable experience for a crew of 14, perfect for watersports with its 350-horsepower rating and ski tow pylon.\"}, {\"title\": \"TAHOE 2150\", \"detail\": \"Combines spacious luxury with sporting capability, also featuring the POWERGLIDE\® hull and ski tow pylon, ideal for families enjoying watersports.\"}, {\"title\": \"Sun Tracker Sportfish\", \"detail\": \"A versatile option that combines a fishing boat's utility with the comfort of a party barge, perfect for Lake George outings.\"}]}"
            }

            const parsedData = JSON.parse(data?.output);
            const actuallRecommendations = parsedData?.value_propositions
            appStateContext?.dispatch({ type: 'SET_RECOMMENDATIONS_STATE', payload: actuallRecommendations })
            appStateContext?.dispatch({ type: 'SET_RECOMMENDATIONS_LOADING', payload: false })
            navigate("/recommendations");

        } catch (error) {
            appStateContext?.dispatch({ type: 'SET_RECOMMENDATIONS_LOADING', payload: false })
        }
    };

    return (
        <Stack
            horizontalAlign="center"
            style={{
                width: "100%",
                height: "100%",
                padding: "0px 20px 0px 20px",
            }}
        >
            <Stack
                tokens={{ childrenGap: 20 }}
                style={{
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    height: "80%",
                    maxHeight: "80%",
                    width: "100%",
                    marginTop: 50,
                    opacity: isTextFieldFocused ? 0 : 1,
                    overflowY: "auto",
                    position: "relative"
                }}
            >
                {!isTextFieldFocused && Object.keys(tags).map((key) => (
                    <React.Fragment key={key}>
                        <Stack horizontalAlign='start' style={{ width: "100%" }}>
                            <Text
                                style={{
                                    color: "#819188",
                                    textTransform: "capitalize",
                                    marginLeft: 5,
                                    fontSize: "1.25rem",
                                    fontWeight: "500"
                                }}
                                variant="medium"
                            >
                                {key === "who" || key === "where" ? `${key}?` : key}
                            </Text>
                        </Stack>
                        <Stack
                            horizontal
                            style={{
                                width: "100%",
                                display: "block",
                                alignItems: "flex-start",
                                justifyContent: "flex-start",
                                marginBottom: 10,
                                marginTop: 10,
                                flexWrap: 'wrap'
                            }}
                        >
                            {tags[key].slice(0, showMore[key] ? tags[key]?.length : 5).map((tag, index) => (
                                <Stack.Item key={index} grow={1} disableShrink styles={{
                                    root: {
                                        marginLeft: 5,
                                        marginRight: 5,
                                        marginTop: 10,
                                        '@media (max-width: 1000px)': {
                                            display: "inline-table"
                                        }
                                    }
                                }}>
                                    <DefaultButton
                                        style={{
                                            height: "50px",
                                            padding: "0px 25px",
                                            backgroundColor: selectedKeys.some(selected => selected.value === tag && selected.key === key) ? "black" : '#101417',
                                            color: "#FFFFFF",
                                            fontSize: "0.875rem",
                                            border: "none",
                                            fontWeight: 300,
                                            opacity: selectedKeys.some(selected => selected.value === tag && selected.key === key) ? 1 : 0.9,
                                            borderRadius: 15,
                                            whiteSpace: "nowrap",
                                        }}
                                        onClick={() => typeof tag === 'string' && handleGroupSelection(key, tag)}
                                    >
                                        {tag}
                                    </DefaultButton>
                                </Stack.Item>
                            ))}
                            {tags[key].length > 5 && (
                                <Stack.Item grow={1}
                                    disableShrink
                                    styles={{
                                        root: {
                                            minWidth: "90px",
                                            maxWidth: "90px",
                                            marginLeft: 10,
                                            marginTop: 10,
                                            display: "inline-table"
                                        }
                                    }}>
                                    <DefaultButton
                                        styles={{
                                            root: {
                                                height: "50px",
                                                backgroundColor: 'transparent',
                                                color: "#819188",
                                                border: "1px solid black",
                                                borderRadius: 10
                                            }
                                        }}
                                        onClick={() => toggleShowMore(key)}
                                    >
                                        {showMore[key] ? "Less" : "More"}
                                    </DefaultButton>
                                </Stack.Item>
                            )}
                        </Stack>
                    </React.Fragment>
                ))}
            </Stack>
            <Stack
                tokens={{ childrenGap: 20 }}
                horizontalAlign='center'
                style={{
                    width: "100%",
                    position: "fixed",
                    zIndex: 99999,
                    display: "flex",
                    flexDirection: isTextFieldFocused ? "column" : "row",
                    alignItems: "center",
                    justifyContent: "center",
                    height: "15%",
                    bottom: isTextFieldFocused ? 80 : 0,
                    padding: "0px 20px"
                }}
            >
                <CustomTextField
                    placeholder='Anything else?'
                    allowBorder={false}
                    text={inputValue}
                    setText={setInputValue}
                    isButtonRequired={isTextFieldFocused}
                    onFocus={() => setIsTextFieldFocused(true)} // Set focused state on focus
                    onBlur={() => setIsTextFieldFocused(false)}
                    isTextFieldFocused={isTextFieldFocused} // Remove focused state on blur
                />
                {!isTextFieldFocused &&
                    <CustomIconButton onButtonClick={handleSubmit} disabled={buttonDisabled} />
                }
            </Stack>
        </Stack>
    );
};

export default Home;
