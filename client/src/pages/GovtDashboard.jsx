import { useState, useEffect } from 'react';
import { Box, Heading, Table, Thead, Tbody, Tr, Th, Td, Badge, VStack, Text, Alert, AlertIcon, AlertTitle, AlertDescription } from '@chakra-ui/react';
import axios from 'axios';
import { useTranslation } from 'react-i18next';

const GovtDashboard = () => {
    const { t } = useTranslation();
    const [alerts, setAlerts] = useState([]);
    const [hotspots, setHotspots] = useState([]); // New state for hotspots

    useEffect(() => {
        const fetchAlerts = async () => {
            try {
                // Fetch both regular alerts and trend data
                const alertsRes = await axios.get('http://localhost:5001/api/gov/alerts');
                const trendsRes = await axios.get('http://localhost:5001/api/gov/trends');
                setAlerts(alertsRes.data);
                setHotspots(trendsRes.data);
            } catch (error) {
                console.error("Failed to fetch dashboard data", error);
            }
        };
        fetchAlerts();
    }, []);

    return (
        <Box p={8} maxW="container.xl" mx="auto">
            <VStack spacing={8} align="stretch">
                <Heading textAlign="center">{t('govtDashboard')}</Heading>

                {/* --- NEW HOTSPOTS SECTION --- */}
                <Box>
                    <Heading size="lg" mb={4}>🚨 Potential Hotspots</Heading>
                    {hotspots.length > 0 ? (
                        <VStack spacing={4} align="stretch">
                            {hotspots.map((spot, index) => (
                                <Alert
                                    key={index}
                                    status='warning'
                                    variant='solid'
                                    flexDirection='column'
                                    alignItems='center'
                                    justifyContent='center'
                                    textAlign='center'
                                    p={4}
                                    borderRadius="md"
                                >
                                    <AlertIcon boxSize='40px' mr={0} />
                                    <AlertTitle mt={4} mb={1} fontSize='lg'>
                                        High Alert: {spot._id.disease}
                                    </Aler tTitle>
                                    <AlertDescription maxWidth='sm'>
                                        <strong>{spot.count} cases</strong> reported in the last 14 days in <strong>{spot._id.panchayat}, {spot._id.district}</strong>. Immediate surveillance recommended.
                                    </AlertDescription>
                                </Alert>
                            ))}
                        </VStack>
                    ) : (
                        <Text color="gray.500">No significant disease clusters detected in the last 14 days.</Text>
                    )}
                </Box>

                {/* --- EXISTING ALERTS LIST --- */}
                <Box>
                    <Heading size="lg" mb={4}>Individual Case Alerts</Heading>
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
                </Box>
            </VStack>
        </Box>
    );
};

export default GovtDashboard;
