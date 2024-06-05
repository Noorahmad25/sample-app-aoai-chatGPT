import { DefaultButton, Stack, Text, IconButton, PrimaryButton } from '@fluentui/react';
import React, { useEffect, useState } from 'react';
import { dummydata } from '../../constants/dummydata';
import { CategoryItem } from '../../types/DummyDataItem';
import CustomTextField from '../CustomTextField';
import CustomIconButton from '../CustomIconButton';
import { useNavigate } from 'react-router-dom';

interface Props {
    setPromptMessage: (value: string) => void;
}


const Home: React.FC<Props> = ({ setPromptMessage }) => {
    const [inputValue, setInputValue] = useState<string>('');
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

    const [showMore, setShowMore] = useState<{ [key: string]: boolean }>({});
    const [selectedKeys, setSelectedKeys] = useState<{ key: string, value: string, type: 'parent' | 'child' }[]>([]);

    const handleGroupSelection = (key: string, tag: string) => {
        if (Object.keys(dummydata).includes(key)) {
            const categoryArray = (dummydata as any)[key];
            const selectedCategory = categoryArray.find((categoryItem: CategoryItem) => categoryItem.category === tag);

            setTags(prevTags => {
                const updatedTags = { ...prevTags };

                if (selectedCategory) {
                    const categoryIndex = updatedTags[key].indexOf(tag);
                    console.log({ categoryIndex, tag, selectedCategory });
                    if (categoryIndex !== -1) {
                        updatedTags[key].splice(categoryIndex, 1, ...selectedCategory.child);
                    }
                }

                return updatedTags;
            });
            const type = selectedCategory ? 'parent' : 'child';
            const existingIndex = selectedKeys.findIndex(item => item.key === key && item.value === tag);

            if (existingIndex !== -1) {
                setSelectedKeys(prevKeys => prevKeys.filter((_, index) => index !== existingIndex));
            } else {
                setSelectedKeys(prevKeys => [
                    ...prevKeys,
                    { key, value: tag, type }
                ]);
            }
        }
    };

    const handleSave = () => {
        navigate("recommendations")
    };

    const toggleShowMore = (heading: string) => {
        setShowMore(prevState => ({
            ...prevState,
            [heading]: !prevState[heading]
        }));
    };

    const createStringLiterals = () => {
        const parentKeys = selectedKeys.filter(key => key.type === 'parent');
        const uniqueParents = Array.from(new Set(parentKeys.map(key => key.key)));
        return uniqueParents.map(parent => {
            const children = selectedKeys
                .filter(key => key.type === 'child' && key.key === parent)
                .map(key => key.key)
                .join(', ');
            return `From section ${parent}, you selected: [${children}]`;
        }).join('\n');
    };

    useEffect(() => {
        const stringLiterals = createStringLiterals();
        console.log(stringLiterals);
        setPromptMessage(stringLiterals);
    }, [selectedKeys]);
    console.log({ showMore })

    const handleSubmit = () => {
        navigate("recommendations");
    };
    return (
        <Stack
            horizontalAlign="center"
            styles={{ root: { height: '100vh', marginBottom: 20, marginTop: 20 } }}
        >
            <Stack
                tokens={{ childrenGap: 20 }}
                styles={{
                    root: {
                        width: '100%',padding: 20, flexWrap: "wrap",

                        '@media (max-width: 500px)': {
                            minWidth: "400px", maxWidth: "400px"
                        }
                    }
                }}
            >
                {Object.keys(tags).map((key) => (
                    <React.Fragment key={key}>
                        <Stack>
                            <Text style={{ color: "grey", textTransform: "capitalize" }} variant="medium">{key === "who" || key === "where" ? `${key}?` : key}</Text>
                        </Stack>
                        <Stack horizontal tokens={{ childrenGap: 20 }} wrap styles={{ root: { gap: 10, justifyContent: "space-between" } }}>
                            {(tags[key].slice(0, showMore[key] ? tags[key]?.length : 5)).map((tag, index) => (
                                <Stack.Item key={index} grow={1} disableShrink styles={{
                                    root: {
                                        width: "0%",
                                        '@media (max-width: 500px)': {
                                            minWidth: "100px", maxWidth: "80px"
                                        }
                                    }
                                }}>
                                    <DefaultButton
                                        style={{
                                            height: "40px",
                                            width: "100%",
                                            backgroundColor: selectedKeys.some(selected => selected.value === tag && selected.key === key) ? "green" : 'black',
                                            color: "#FFFFFF",
                                            fontSize: "0.75rem",
                                            border: "none",
                                            opacity: 0.5,
                                            borderRadius: 10
                                        }}
                                        onClick={() => typeof tag === 'string' && handleGroupSelection(key, tag)}
                                    >
                                        {tag}
                                    </DefaultButton>
                                </Stack.Item>
                            ))}
                            {tags[key].length > 5 && (
                                <Stack.Item grow={1} disableShrink styles={{ root: { minWidth: "80px", maxWidth: "80px" } }}>
                                    <IconButton
                                        iconProps={{ iconName: showMore[key] ? 'CalculatorSubtract' : 'Add' }}
                                        title={showMore[key] ? 'View Less' : 'View More'}
                                        ariaLabel={showMore[key] ? 'View Less' : 'View More'}
                                        onClick={() => toggleShowMore(key)}
                                        styles={{
                                            root: {
                                                height: "40px",
                                                width: "80%",
                                                backgroundColor: 'transparent',
                                                color: "#FFFFFF",
                                                border: "2px solid black",
                                                borderRadius: 10
                                            }
                                        }}
                                    />
                                </Stack.Item>
                            )}
                        </Stack>
                    </React.Fragment>
                ))}
            </Stack>
            <Stack
                tokens={{ childrenGap: 20 }}
                horizontalAlign='center'
                styles={{ root: { width: '100%', marginTop:50,padding: 20, flexWrap: "wrap" } }}
            >
                <CustomTextField placeholder='Anything else?' allowBorder={false} onButtonClick={handleSave} text={inputValue} setText={setInputValue} />
                <PrimaryButton style={{ width: "100%",maxWidth:"350px", borderRadius: 10, padding: 20, background: "black",opacity:0.5, border: "none" }} onClick={handleSubmit}>Submit</PrimaryButton>

            </Stack>


        </Stack>
    );
};

export default Home;
