import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { Box, Button, FormControl, Heading, Input, VStack, useToast, Spinner, Text, HStack } from '@chakra-ui/react';
import { FaShieldAlt } from 'react-icons/fa';
import WorkerProfile from './WorkerProfile'; // We can reuse this for display!

const AccessPage = () => {
    const { workerId } = useParams();
    const toast = useToast();
    const [otp, setOtp] = useState('');
    const [isLoading, setIsLoading] = useState(true);
    const [accessGranted, setAccessGranted] = useState(false);
    const [workerData, setWorkerData] = useState(null);

    // Request access as soon as the page loads
    useEffect(() => {
        const requestAccess = async () => {
            try {
                await axios.post(`http://localhost:5001/api/workers/request-access/${workerId}`);
                toast({
                    title: 'OTP Sent',
                    description: "An OTP has been sent to the worker's registered mobile number.",
                    status: 'success',
                    duration: 5000,
                    isClosable: true,
                });
            } catch (error) {
                toast({ title: 'Error', description: 'Could not request access.', status: 'error' });
            } finally {
                setIsLoading(false);
            }
        };
        requestAccess();
    }, [workerId, toast]);

    const handleVerifyOtp = async () => {
        setIsLoading(true);
        try {
            const res = await axios.post('http://localhost:5001/api/workers/verify-otp', { workerId, otp });
            setWorkerData(res.data);
            setAccessGranted(true);
            toast({ title: 'Access Granted', status: 'success' });
        } catch (error) {
            toast({ title: 'Verification Failed', description: 'Invalid or expired OTP.', status: 'error' });
            setAccessGranted(false);
        } finally {
            setIsLoading(false);
        }
    };

    // If access is granted, we can redirect or show the profile directly.
    // For simplicity, we'll pass the fetched data to the WorkerProfile component.
    // Note: This is a simplified approach. A more robust solution might use React Context.
    if (accessGranted) {
        // We can't directly render WorkerProfile as it fetches its own data.
        // Let's display a success message and link.
        // A better implementation would redirect to a protected route.
        return (
             <Box p={8} maxW="container.md" mx="auto" textAlign="center">
                <Heading>Access Granted</Heading>
                <Text my={4}>You can now view the worker's profile.</Text>
                {/* For now, we'll just show the name as confirmation */}
                 <Text fontSize="2xl" fontWeight="bold">{workerData.worker.name}</Text>
                 <Text>ID: {workerData.worker.workerId}</Text>
                 <Text mt={4}>Full profile view would be shown here.</Text>
            </Box>
        )
    }

    return (
        <Box p={8} maxW="container.md" mx="auto" textAlign="center">
            <VStack spacing={6}>
                <FaShieldAlt size="3em" color="#319795" />
                <Heading>Worker Consent Required</Heading>
                <Text>An SMS with a 6-digit One-Time Password (OTP) has been sent to the worker's phone. Please ask for the OTP to proceed.</Text>
                {isLoading && <Spinner />}
                <FormControl>
                    <HStack>
                        <Input
                            placeholder="Enter OTP"
                            value={otp}
                            onChange={(e) => setOtp(e.target.value)}
                            isDisabled={isLoading}
                            maxLength={6}
                        />
                        <Button colorScheme="teal" onClick={handleVerifyOtp} isLoading={isLoading}>
                            Verify & Access
                        </Button>
                    </HStack>
                </FormControl>
            </VStack>
        </Box>
    );
};

export default AccessPage;
