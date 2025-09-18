import { useState } from 'react';
import { Box, Button, FormControl, FormLabel, Input, Select, VStack, Heading, Grid, GridItem, useToast } from '@chakra-ui/react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

const RegisterWorker = () => {
    const { t } = useTranslation();
    const navigate = useNavigate();
    const toast = useToast();
    const [formData, setFormData] = useState({
        name: '',
        age: '',
        gender: 'Male',
        contactNumber: '',
        bloodGroup: 'O+',
        nativeLanguage: 'Hindi',
        nativeState: '',
        currentLocation: {
            district: '',
            panchayat: ''
        }
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleLocationChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            currentLocation: { ...prev.currentLocation, [name]: value }
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const res = await axios.post('http://localhost:5001/api/workers/register', formData);
            toast({
                title: 'Worker Registered Successfully.',
                description: `ID Card for ${res.data.name} generated.`,
                status: 'success',
                duration: 5000,
                isClosable: true,
            });
            navigate(`/health-card/${res.data.workerId}`);
        } catch (error) {
            toast({
                title: 'Registration Failed.',
                description: error.response?.data?.msg || 'An error occurred.',
                status: 'error',
                duration: 5000,
                isClosable: true,
            });
        }
    };

    return (
        <Box p={8} maxW="container.lg" mx="auto">
            <VStack as="form" onSubmit={handleSubmit} spacing={6}>
                <Heading>Register New Migrant Worker</Heading>
                <Grid templateColumns={{ base: '1fr', md: 'repeat(2, 1fr)' }} gap={6} width="full">
                    <GridItem>
                        <FormControl isRequired>
                            <FormLabel>Full Name</FormLabel>
                            <Input name="name" onChange={handleChange} />
                        </FormControl>
                    </GridItem>
                    <GridItem>
                        <FormControl isRequired>
                            <FormLabel>Age</FormLabel>
                            <Input name="age" type="number" onChange={handleChange} />
                        </FormControl>
                    </GridItem>
                    <GridItem>
                        <FormControl isRequired>
                            <FormLabel>Gender</FormLabel>
                            <Select name="gender" onChange={handleChange}>
                                <option value="Male">Male</option>
                                <option value="Female">Female</option>
                                <option value="Other">Other</option>
                            </Select>
                        </FormControl>
                    </GridItem>
                    <GridItem>
                        <FormControl isRequired>
                            <FormLabel>Contact Number</FormLabel>
                            <Input name="contactNumber" onChange={handleChange} />
                        </FormControl>
                    </GridItem>
                     <GridItem>
                        <FormControl isRequired>
                            <FormLabel>Blood Group</FormLabel>
                            <Select name="bloodGroup" onChange={handleChange}>
                                <option>O+</option><option>O-</option><option>A+</option>
                                <option>A-</option><option>B+</option><option>B-</option>
                                <option>AB+</option><option>AB-</option>
                            </Select>
                        </FormControl>
                    </GridItem>
                    <GridItem>
                        <FormControl isRequired>
                            <FormLabel>Native Language</FormLabel>
                            <Select name="nativeLanguage" onChange={handleChange}>
                                <option value="Hindi">Hindi</option>
                                <option value="Bengali">Bengali</option>
                                <option value="Odia">Odia</option>
                                <option value="Other">Other</option>
                            </Select>
                        </FormControl>
                    </GridItem>
                     <GridItem>
                        <FormControl isRequired>
                            <FormLabel>Native State</FormLabel>
                            <Input name="nativeState" placeholder="e.g., West Bengal" onChange={handleChange} />
                        </FormControl>
                    </GridItem>
                    <GridItem>
                        <FormControl isRequired>
                            <FormLabel>Current District (in Kerala)</FormLabel>
                            <Input name="district" placeholder="e.g., Ernakulam" onChange={handleLocationChange} />
                        </FormControl>
                    </GridItem>
                    <GridItem colSpan={{ base: 1, md: 2 }}>
                        <FormControl isRequired>
                            <FormLabel>Current Panchayat/Municipality</FormLabel>
                            <Input name="panchayat" placeholder="e.g., Kalamassery" onChange={handleLocationChange} />
                        </FormControl>
                    </GridItem>
                </Grid>
                <Button type="submit" colorScheme="teal" size="lg" width="full">
                    Register Worker and Generate Card
                </Button>
            </VStack>
        </Box>
    );
};

export default RegisterWorker;
