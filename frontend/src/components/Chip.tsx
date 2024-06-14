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
        border: '1px solid #151B1E',
        borderRadius: "30px",
        padding: '4px 8px',
        flexGrow: 1, // Allow the stack to grow
        '@media (max-width: 600px)': {
            height: "40px",
            padding: '4px 8px',
        },
        '@media (max-width: 1000px) and (min-width: 600px)': {
            height: "60px",
            padding: '4px 8px',
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
        margin: '0 4px',
        color: '#FFFFFF',
        '@media (max-width: 600px)': {
            fontSize: "14px",
            fontWeight: 600,
            padding: "0px 5px",

        },
        '@media (max-width: 1000px) and (min-width: 600px)': {
            fontSize: "24px",
            fontWeight: 600,
            padding: "0px 10px",
        },
        '@media (max-width: 1500px) and (min-width: 1000px)': {
            fontSize: "22px",
            fontWeight: 600,
            padding: "0px 10px",
        },
        '@media (max-width: 2500px) and (min-width: 1500px)': {
            fontSize: "28px",
            padding: "0px 10px",
        },
    },
};

const iconStyles: IIconProps = {
    iconName: 'Cancel',
    styles: {
        root: {

            '@media (max-width: 600px)': {
                fontSize: "14px",
                fontWeight: 600,
            marginTop: 2,

            },
            '@media (max-width: 1000px) and (min-width: 600px)': {
                fontSize: "18px",
                fontWeight: 600,
                marginTop: 4,
            },
            '@media (max-width: 1500px) and (min-width: 1000px)': {
                fontSize: "22px",
                fontWeight: 600,
            },
            '@media (max-width: 2500px) and (min-width: 1500px)': {
                fontSize: "28px",
                marginTop: 4,
            },
            color: '#FFFFFF',
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
