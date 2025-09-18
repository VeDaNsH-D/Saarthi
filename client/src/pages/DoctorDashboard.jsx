import { useState } from 'react';
import { Box, Button, Input, VStack, Heading, Text, Divider, HStack, FormControl, FormLabel } from '@chakra-ui/react';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { FaQrcode, FaIdCard } from 'react-icons/fa';

const DoctorDashboard = () => {
    const { t } = useTranslation();
    const [workerId, setWorkerId] = useState('');
    const navigate = useNavigate();

    const handleSearch = () => {
        if (workerId) {
            navigate(`/worker/${workerId.trim()}`);
        }
    };

    return (
        <Box p={8} maxW="container.md" mx="auto">
            <VStack spacing={8} align="stretch">
                <Heading textAlign="center">{t('doctorDashboard')}</Heading>

                <Box p={6} borderWidth={1} borderRadius={8} boxShadow="md">
                    <VStack spacing={4}>
                        <FaQrcode size="3em" color="#319795" />
                        <Heading size="md">{t('scanQRCode')}</Heading>
                        <Text color="gray.500">Feature coming in Phase 2. Use ID Search for now.</Text>
                    </VStack>
                </Box>

                <HStack align="center">
                    <Divider />
                    <Text px={4} color="gray.500" whiteSpace="nowrap">{t('orEnterID')}</Text>
                    <Divider />
                </HStack>

                <Box p={6} borderWidth={1} borderRadius={8} boxShadow="md">
                    <VStack spacing={4}>
                        <FaIdCard size="3em" color="#319795" />
                        <FormControl>
                            <FormLabel htmlFor="workerId">{t('workerId')}</FormLabel>
                            <Input
                                id="workerId"
                                placeholder="e.g., MHW-KL-000001"
                                value={workerId}
                                onChange={(e) => setWorkerId(e.target.value)}
                            />
                        </FormControl>
                        <Button colorScheme="teal" onClick={handleSearch} width="full">
                            {t('search')}
                        </Button>
                    </VStack>
                </Box>

                <Divider />

                <Button colorScheme="green" onClick={() => navigate('/register-worker')}>
                    {t('registerNewWorker')}
                </Button>
            </VStack>
        </Box>
    );
};

export default DoctorDashboard;
