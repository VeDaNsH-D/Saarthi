import React, { useState, useEffect } from 'react';
import { useParams, Link as RouterLink } from 'react-router-dom';
import axios from 'axios';
import { Box, Heading, Text, VStack, Spinner, Alert, AlertIcon, SimpleGrid, Card, CardHeader, CardBody, Button, useDisclosure, HStack, Badge } from '@chakra-ui/react';
import { FaPlus, FaLanguage } from 'react-icons/fa';
import AddRecordModal from '../components/AddRecordModal'; // Import the new modal

const WorkerProfile = () => {
    const { workerId } = useParams();
    const { isOpen, onOpen, onClose } = useDisclosure();
    const [worker, setWorker] = useState(null);
    const [records, setRecords] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');
    const [showOriginal, setShowOriginal] = useState({});

    const fetchWorkerData = async () => {
        try {
            setLoading(true);
            const res = await axios.get(`http://localhost:5001/api/workers/${workerId}`);
            setWorker(res.data.worker);
            setRecords(res.data.records);
            setError('');
        } catch (err) {
            setError('Worker not found or error fetching data.');
            setWorker(null);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchWorkerData();
    }, [workerId]);

    const toggleShowOriginal = (recordId) => {
        setShowOriginal(prev => ({ ...prev, [recordId]: !prev[recordId] }));
    };

    if (loading) return <Spinner />;
    if (error) return <Alert status="error"><AlertIcon />{error}</Alert>;

    return (
        <Box p={8} maxW="container.xl" mx="auto">
            {worker && (
                <>
                    <VStack spacing={8} align="stretch">
                        <Card>
                            <CardHeader><Heading size='md'>Worker Profile</Heading></CardHeader>
                            <CardBody>
                                <SimpleGrid columns={{ base: 2, md: 4 }} spacing={4}>
                                    <Box><Text fontWeight="bold">Name:</Text> {worker.name}</Box>
                                    <Box><Text fontWeight="bold">Worker ID:</Text> {worker.workerId}</Box>
                                    <Box><Text fontWeight="bold">Age:</Text> {worker.age}</Box>
                                    <Box><Text fontWeight="bold">Gender:</Text> {worker.gender}</Box>
                                    <Box><Text fontWeight="bold">Contact:</Text> {worker.contactNumber}</Box>
                                    <Box><Text fontWeight="bold">Blood Group:</Text> {worker.bloodGroup}</Box>
                                    <Box><Text fontWeight="bold">Location:</Text> {`${worker.currentLocation.panchayat}, ${worker.currentLocation.district}`}</Box>
                                    <Box><Button as={RouterLink} to={`/health-card/${workerId}`} size="sm" colorScheme="blue">View Health Card</Button></Box>
                                </SimpleGrid>
                            </CardBody>
                        </Card>

                        <Box>
                            <HStack justify="space-between" mb={4}>
                                <Heading size="lg">Medical History</Heading>
                                <Button leftIcon={<FaPlus />} colorScheme="teal" onClick={onOpen}>Add New Record</Button>
                            </HStack>
                            <VStack spacing={4} align="stretch">
                                {records.length > 0 ? (
                                    records.map(record => {
                                        const hasTranslation = record.translatedPrescription && record.translatedPrescription.items.length > 0;
                                        const displayTranslated = hasTranslation && !showOriginal[record._id];
                                        const prescriptionItems = displayTranslated ? record.translatedPrescription.items : record.prescription;

                                        return (
                                        <Card key={record._id} variant="outline">
                                            <CardHeader>
                                                <HStack justify="space-between">
                                                    <Heading size="md">{record.diagnosis}</Heading>
                                                    <Text fontSize="sm" color="gray.600">{new Date(record.createdAt).toLocaleDateString()}</Text>
                                                </HStack>
                                                <Text fontSize="sm" color="gray.500">Consulted Dr. {record.doctorName}</Text>
                                            </CardHeader>
                                            <CardBody>
                                                <Text fontWeight="bold">Symptoms:</Text>
                                                <Text mb={4}>{record.symptoms || 'N/A'}</Text>
                                                <HStack mb={2} justify="space-between">
                                                    <Text fontWeight="bold">Prescription:</Text>
                                                    {hasTranslation && (
                                                        <Button size="xs" variant="outline" leftIcon={<FaLanguage />} onClick={() => toggleShowOriginal(record._id)}>
                                                            {displayTranslated ? 'Show Original (English)' : `Show Translation (${worker.nativeLanguage})`}
                                                        </Button>
                                                    )}
                                                </HStack>
                                                {displayTranslated && <Badge colorScheme="green" mb={2}>{`Translated to ${worker.nativeLanguage}`}</Badge>}
                                                {prescriptionItems.map((p, i) => (
                                                    <Text key={i}>{`- ${p.medicine} (${p.dosage}) - ${p.duration}`}</Text>
                                                ))}
                                            </CardBody>
                                        </Card>
                                    )})
                                ) : (
                                    <Text>No medical records found.</Text>
                                )}
                            </VStack>
                        </Box>
                    </VStack>

                    {/* Use the new modal component */}
                    <AddRecordModal isOpen={isOpen} onClose={onClose} worker={worker} onRecordAdded={fetchWorkerData} />
                </>
            )}
        </Box>
    );
};

export default WorkerProfile;
