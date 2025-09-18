import { useState } from 'react';
import { Box, Button, FormControl, FormLabel, Input, VStack, Heading, useToast } from '@chakra-ui/react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

const DoctorLogin = () => {
    const { t } = useTranslation();
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();
    const toast = useToast();

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const res = await axios.post('http://localhost:5001/api/auth/login', { username, password });
            localStorage.setItem('token', res.data.token);
            localStorage.setItem('doctorName', res.data.doctorName);
            toast({
                title: 'Login Successful.',
                description: "Welcome back!",
                status: 'success',
                duration: 3000,
                isClosable: true,
            });
            navigate('/dashboard');
        } catch (error) {
            toast({
                title: 'Login Failed.',
                description: error.response?.data?.msg || 'An error occurred.',
                status: 'error',
                duration: 5000,
                isClosable: true,
            });
        }
    };

    return (
        <Box display="flex" alignItems="center" justifyContent="center" height="calc(100vh - 80px)">
            <Box p={8} maxWidth="500px" borderWidth={1} borderRadius={8} boxShadow="lg">
                <VStack as="form" onSubmit={handleSubmit} spacing={4}>
                    <Heading>{t('doctorLogin')}</Heading>
                    <FormControl isRequired>
                        <FormLabel>{t('username')}</FormLabel>
                        <Input type="text" value={username} onChange={(e) => setUsername(e.target.value)} />
                    </FormControl>
                    <FormControl isRequired>
                        <FormLabel>{t('password')}</FormLabel>
                        <Input type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
                    </FormControl>
                    <Button type="submit" colorScheme="teal" width="full">
                        {t('login')}
                    </Button>
                </VStack>
            </Box>
        </Box>
    );
};

export default DoctorLogin;
