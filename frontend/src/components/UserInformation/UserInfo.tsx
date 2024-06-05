import * as React from 'react';
import { ComboBox, DefaultButton, Stack, TextField, IComboBoxOption, IComboBox } from '@fluentui/react';
import CustomTextField from '../CustomTextField';
import { useNavigate } from 'react-router-dom';

interface FormData {
  location: string;
  username: string;
}

const UserInfo: React.FC = () => {
  const [formData, setFormData] = React.useState<FormData>({ location: '', username: '' });
  const [inputValue, setInputValue] = React.useState<string>('');
const navigate=useNavigate();
  const handleLocationChange = (event: React.FormEvent<IComboBox>, option?: IComboBoxOption) => {
    if (option) {
      setFormData({ ...formData, location: option.key.toString() });
    }
  };

  const handleUsernameChange = (event: React.FormEvent<HTMLInputElement | HTMLTextAreaElement>, newValue?: string) => {
    if (newValue !== undefined) {
      setFormData({ ...formData, username: newValue });
    }
  };

  const handleSave = () => {
    const dataToSave = { name:inputValue, id: 4 };
    localStorage.setItem('userInfo', JSON.stringify([dataToSave]));
    window.location.reload();
  };

  return (
    <Stack tokens={{ childrenGap: 20 }} styles={{ root: { width: 350, margin: 'auto' } }}>
      <CustomTextField placeholder='Enter your Full Name' allowBorder={true} onButtonClick={handleSave} text={inputValue} setText={setInputValue} />
    </Stack>
  );
};

export default UserInfo;
