import { useState, useEffect } from 'react';
import { useParams, Link as RouterLink } from 'react-router-dom';
import axios from 'axios';
import {
    Box, Heading, Text, VStack, Spinner, Alert, AlertIcon, SimpleGrid, Card, CardHeader, CardBody,
    Button, Modal, ModalOverlay, ModalContent, ModalHeader, ModalFooter, ModalBody, ModalCloseButton,
    useDisclosure, FormControl, FormLabel, Input, Textarea, Select, useToast, HStack, IconButton, Divider
} from '@chakra-ui/react';
import { FaPlus, FaTrash } from 'react-icons/fa';
import { useTranslation } from 'react-i18next';

const WorkerProfile = () => {
    const { t } = useTranslation();
    const { workerId } = useParams();
    const { isOpen, onOpen, onClose } = useDisclosure();
    const toast = useToast();

    const [worker, setWorker] = useState(null);
    const [records, setRecords] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');

    // State for new record form
    const [diagnosis, setDiagnosis] = useState('');
    const [symptoms, setSymptoms] = useState('');
    const [prescription, setPrescription] = useState([{ medicine: '', dosage: '', duration: '' }]);
    const [notifiableDisease, setNotifiableDisease] = useState('');

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

    const handleAddPrescription = () => {
        setPrescription([...prescription, { medicine: '', dosage: '', duration: '' }]);
    };

    const handleRemovePrescription = (index) => {
        const list = [...prescription];
        list.splice(index, 1);
        setPrescription(list);
    };

    const handlePrescriptionChange = (e, index) => {
        const { name, value } = e.target;
        const list = [...prescription];
        list[index][name] = value;
        setPrescription(list);
    };

    const handleAddRecord = async () => {
        const finalDiagnosis = notifiableDisease || diagnosis;
        const doctorName = localStorage.getItem('doctorName') || 'Dr. Anonymous';

        try {
            await axios.post('http://localhost:5001/api/records/add', {
                workerId,
                doctorName,
                diagnosis: finalDiagnosis,
                symptoms,
                prescription
            });
            toast({ title: 'Record added', status: 'success', duration: 3000 });
            onClose();
            fetchWorkerData(); // Refresh data
            // Reset form
            setDiagnosis(''); setSymptoms(''); setPrescription([{ medicine: '', dosage: '', duration: '' }]); setNotifiableDisease('');
        } catch (err) {
            toast({ title: 'Error adding record', description: err.message, status: 'error', duration: 5000 });
        }
    };

    if (loading) return <Spinner />;
    if (error) return <Alert status="error"><AlertIcon />{error}</Alert>;

    return (
        <Box p={8} maxW="container.xl" mx="auto">
            {worker && (
                <VStack spacing={8} align="stretch">
                    <Card>
                        <CardHeader>
                            <Heading size='md'>Worker Profile</Heading>
                        </CardHeader>
                        <CardBody>
                            <SimpleGrid columns={{ base: 2, md: 4 }} spacing={4}>
                                <Box><Text fontWeight="bold">Name:</Text> {worker.name}</Box>
                                <Box><Text fontWeight="bold">Worker ID:</Text> {worker.workerId}</Box>
                                <Box><Text fontWeight="bold">Age:</Text> {worker.age}</Box>
                                <Box><Text fontWeight="bold">Gender:</Text> {worker.gender}</Box>
                                <Box><Text fontWeight="bold">Contact:</Text> {worker.contactNumber}</Box>
                                <Box><Text fontWeight="bold">Blood Group:</Text> {worker.bloodGroup}</Box>
                                <Box><Text fontWeight="bold">Location:</Text> {`${worker.currentLocation.panchayat}, ${worker.currentLocation.district}`}</Box>
                                <Box>
                                    <Button as={RouterLink} to={`/health-card/${workerId}`} size="sm" colorScheme="blue">
                                        View Health Card
                                    </Button>
                                </Box>
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
                                records.map(record => (
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
                                            <Text fontWeight="bold">Prescription:</Text>
                                            {record.prescription.map((p, i) => (
                                                <Text key={i}>{`- ${p.medicine} (${p.dosage}) - ${p.duration}`}</Text>
                                            ))}
                                        </CardBody>
                                    </Card>
                                ))
                            ) : (
                                <Text>No medical records found.</Text>
                            )}
                        </VStack>
                    </Box>
                </VStack>
            )}

            {/* Add New Record Modal */}
            <Modal isOpen={isOpen} onClose={onClose} size="xl">
                <ModalOverlay />
                <ModalContent>
                    <ModalHeader>Add New Medical Record</ModalHeader>
                    <ModalCloseButton />
                    <ModalBody>
                        <VStack spacing={4}>
                            <FormControl>
                                <FormLabel>Notifiable Disease (if applicable)</FormLabel>
                                <Select placeholder="Select if it's a notifiable disease" onChange={(e) => setNotifiableDisease(e.target.value)}>
                                    <option value="Tuberculosis">Tuberculosis</option>
                                    <option value="Malaria">Malaria</option>
                                    <option value="Dengue">Dengue</option>
                                    <option value="COVID-19">COVID-19</option>
                                    <option value="Cholera">Cholera</option>
                                    <option value="Leprosy">Leprosy</option>
                                </Select>
                            </FormControl>
                            <FormControl isRequired>
                                <FormLabel>Diagnosis (if not listed above)</FormLabel>
                                <Input value={diagnosis} onChange={(e) => setDiagnosis(e.target.value)} isDisabled={!!notifiableDisease} />
                            </FormControl>
                            <FormControl>
                                <FormLabel>Symptoms</FormLabel>
                                <Textarea value={symptoms} onChange={(e) => setSymptoms(e.target.value)} />
                            </FormControl>
                            <Divider />
                            <Heading size="sm" alignSelf="flex-start">Prescription</Heading>
                            {prescription.map((x, i) => (
                                <HStack key={i} width="full">
                                    <Input name="medicine" placeholder="Medicine Name" value={x.medicine} onChange={e => handlePrescriptionChange(e, i)} />
                                    <Input name="dosage" placeholder="Dosage (e.g., 1-0-1)" value={x.dosage} onChange={e => handlePrescriptionChange(e, i)} />
                                    <Input name="duration" placeholder="Duration (e.g., 5 days)" value={x.duration} onChange={e => handlePrescriptionChange(e, i)} />
                                    <IconButton icon={<FaTrash />} onClick={() => handleRemovePrescription(i)} colorScheme="red" variant="ghost"/>
                                </HStack>
                            ))}
                            <Button onClick={handleAddPrescription} size="sm" alignSelf="flex-start">Add More Medicine</Button>
                        </VStack>
                    </ModalBody>
                    <ModalFooter>
                        <Button variant='ghost' mr={3} onClick={onClose}>Cancel</Button>
                        <Button colorScheme='teal' onClick={handleAddRecord}>Save Record</Button>
                    </ModalFooter>
                </ModalContent>
            </Modal>
        </Box>
    );
};

export default WorkerProfile;
