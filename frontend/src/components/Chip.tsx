import React from 'react';
import { Icon, Label, Stack, IStackStyles, ILabelStyles, IIconProps } from '@fluentui/react';

// Define styles for the Chip component
const stackStyles: IStackStyles = {
    root: {
        display: 'inline-flex',
        alignItems: 'center',
        justifyContent: "center",
        backgroundColor: 'transparent',
        cursor: 'pointer',
        marginLeft: 10,
        border: '1px solid #93A099',
        borderRadius: "30px",
        padding: '8px 8px',
        flexGrow: 1, // Allow the stack to grow
        '@media (max-width: 600px)': {
            height: "32px",
            padding: '4px 8px',
        },
        '@media (max-width: 1000px) and (min-width: 600px)': {
            height: "60px",
        },
        '@media (max-width: 1500px) and (min-width: 1000px)': {
            height: "60px",
            padding: '4px 8px',
        },
        '@media (max-width: 2500px) and (min-width: 1500px)': {
            height: "68px",
            padding: '4px 8px',
        },
    },
};

const labelStyles: ILabelStyles = {
    root: {
        margin: '0 6px 0 0',
        color: '#93A099',
        '@media (max-width: 600px)': {
            fontSize: "12px",
            fontWeight: 600,
            // padding: "0px 5px",

        },
        '@media (max-width: 1000px) and (min-width: 600px)': {
            fontSize: "24px",
            fontWeight: 600,
            margin: '0 12px 0 12px',

        },
        '@media (max-width: 1500px) and (min-width: 1000px)': {
            fontSize: "22px",
            fontWeight: 600,
        margin: '0 12px 0 12px',

            // padding: "0px 10px",
        },
        '@media (max-width: 2500px) and (min-width: 1500px)': {
            fontSize: "28px",
        margin: '0 12px 0 12px',

            // padding: "0px 10px",
        },
    },
};

const iconStyles: IIconProps = {
    iconName: 'Cancel',
    styles: {
        root: {

            '@media (max-width: 600px)': {
                fontSize: "14px",
                fontWeight: 800,
            },
            '@media (max-width: 1000px) and (min-width: 600px)': {
                fontSize: "20px",
                fontWeight: 600,
                margin: "4px 6px 0px 0px",

            },
            '@media (max-width: 1500px) and (min-width: 1000px)': {
                fontSize: "22px",
                fontWeight: 600,
                margin: "4px 6px 0px 0px",

            },
            '@media (max-width: 2500px) and (min-width: 1500px)': {
                fontSize: "28px",
                margin: "4px 6px 0px 0px",
            },
            color: '#93A099',
            cursor: 'pointer',
        },
    },
};

interface ChipProps {
    label: string;
    onRemove: () => void;
}

const Chip: React.FC<ChipProps> = ({ label, onRemove }) => {
    return (
        <Stack horizontal styles={stackStyles}>
            <Label styles={labelStyles}>{label}</Label>
            <Icon {...iconStyles} onClick={onRemove} />
        </Stack>
    );
};

export default Chip;
