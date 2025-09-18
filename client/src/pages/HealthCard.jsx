import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import QRCode from 'qrcode.react';
import axios from 'axios';
import {
    Box, VStack, Text, Heading, SimpleGrid, Spinner, Alert, AlertIcon, Button,
    useStyleConfig, chakra, Image
} from '@chakra-ui/react';
import { FaPrint } from 'react-icons/fa';

const HealthCard = () => {
    const { workerId } = useParams();
    const [worker, setWorker] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchWorker = async () => {
            try {
                const res = await axios.get(`http://localhost:5001/api/workers/${workerId}`);
                setWorker(res.data.worker);
            } catch (err) {
                console.error(err);
            } finally {
                setLoading(false);
            }
        };
        fetchWorker();
    }, [workerId]);

    const printStyles = {
        '@media print': {
            '.no-print': {
                display: 'none',
            },
            body: {
                '-webkit-print-color-adjust': 'exact',
            },
        },
    };

    if (loading) return <Spinner />;
    if (!worker) return <Alert status="error"><AlertIcon />Worker not found.</Alert>;

    return (
        <Box sx={printStyles} p={8} display="flex" flexDirection="column" alignItems="center">
            <VStack spacing={6} w={{ base: '100%', md: '500px' }} borderWidth={2} borderRadius="lg" p={6} boxShadow="xl" bg="white">
                <Heading size="lg" color="teal.600">Migrant Worker Health Card</Heading>
                <Text color="gray.500">കേരള കുടിയേറ്റ തൊഴിലാളി ആരോഗ്യ കാർഡ്</Text>

                <VStack spacing={4} align="center">
                    <Box boxSize="150px" borderWidth={1} p={2} borderRadius="md">
                        <QRCode value={worker.workerId} size={142} level={"H"} />
                    </Box>
                    <Image
                        borderRadius='full'
                        boxSize='100px'
                        src={worker.photoUrl || 'https://via.placeholder.com/150'}
                        alt={worker.name}
                        mb={4}
                    />
                    <Heading size="md">{worker.name}</Heading>
                    <Text fontSize="xl" fontWeight="bold" color="gray.700">{worker.workerId}</Text>
                </VStack>

                <SimpleGrid columns={2} spacingX={10} spacingY={2} w="full">
                    <Text fontWeight="bold">Age:</Text><Text>{worker.age}</Text>
                    <Text fontWeight="bold">Gender:</Text><Text>{worker.gender}</Text>
                    <Text fontWeight="bold">Blood Group:</Text><Text fontSize="lg" color="red.500" fontWeight="extrabold">{worker.bloodGroup}</Text>
                    <Text fontWeight="bold">Contact:</Text><Text>{worker.contactNumber}</Text>
                    <Text fontWeight="bold">Native State:</Text><Text>{worker.nativeState}</Text>
                </SimpleGrid>
            </VStack>
            <Button
                className="no-print"
                mt={8}
                leftIcon={<FaPrint />}
                colorScheme="teal"
                onClick={() => window.print()}
            >
                Print Card
            </Button>
        </Box>
    );
};

export default HealthCard;
