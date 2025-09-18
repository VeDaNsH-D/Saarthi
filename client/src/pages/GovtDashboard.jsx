import { useState, useEffect } from 'react';
import { Box, Heading, Table, Thead, Tbody, Tr, Th, Td, Badge, VStack, Text } from '@chakra-ui/react';
import axios from 'axios';
import { useTranslation } from 'react-i18next';

const GovtDashboard = () => {
    const { t } = useTranslation();
    const [alerts, setAlerts] = useState([]);

    useEffect(() => {
        const fetchAlerts = async () => {
            try {
                const res = await axios.get('http://localhost:5001/api/gov/alerts');
                setAlerts(res.data);
            } catch (error) {
                console.error("Failed to fetch alerts", error);
            }
        };
        fetchAlerts();
    }, []);

    return (
        <Box p={8} maxW="container.xl" mx="auto">
            <VStack spacing={6} align="stretch">
                <Heading textAlign="center">{t('notifiableDiseaseAlerts')}</Heading>
                {alerts.length > 0 ? (
                    <Box borderWidth={1} borderRadius={8} boxShadow="md" overflowX="auto">
                        <Table variant="simple">
                            <Thead bg="gray.100">
                                <Tr>
                                    <Th>{t('disease')}</Th>
                                    <Th>{t('location')}</Th>
                                    <Th>{t('workerId')}</Th>
                                    <Th>{t('reportedOn')}</Th>
                                </Tr>
                            </Thead>
                            <Tbody>
                                {alerts.map((alert) => (
                                    <Tr key={alert._id}>
                                        <Td>
                                            <Badge colorScheme="red" fontSize="md">{alert.disease}</Badge>
                                        </Td>
                                        <Td>{`${alert.location.panchayat}, ${alert.location.district}`}</Td>
                                        <Td>{alert.workerId}</Td>
                                        <Td>{new Date(alert.timestamp).toLocaleString()}</Td>
                                    </Tr>
                                ))}
                            </Tbody>
                        </Table>
                    </Box>
                ) : (
                    <Text textAlign="center" color="gray.500" fontSize="lg">{t('noAlerts')}</Text>
                )}
            </VStack>
        </Box>
    );
};

export default GovtDashboard;
