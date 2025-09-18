import {
    Box, Flex, Heading, Spacer, Button, Menu, MenuButton, MenuList, MenuItem, HStack
} from '@chakra-ui/react';
import { NavLink, useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { ChevronDownIcon } from '@chakra-ui/icons';

const Navbar = () => {
    const { t, i18n } = useTranslation();
    const navigate = useNavigate();
    const token = localStorage.getItem('token');

    const languages = {
        en: 'English',
        ml: 'മലയാളം',
        hi: 'हिन्दी',
        bn: 'বাংলা'
    };

    const handleLogout = () => {
        localStorage.removeItem('token');
        localStorage.removeItem('doctorName');
        navigate('/');
    };

    return (
        <Flex as="nav" p={4} bg="teal.500" color="white" alignItems="center">
            <Heading size="md">{t('appName')}</Heading>
            <Spacer />
            <HStack spacing={4}>
                {token && <Button as={NavLink} to="/dashboard" variant="ghost">{t('doctorDashboard')}</Button>}
                <Button as={NavLink} to="/gov-dashboard" variant="ghost">{t('govtDashboard')}</Button>

                <Menu>
                    <MenuButton as={Button} rightIcon={<ChevronDownIcon />}>
                        {languages[i18n.language]}
                    </MenuButton>
                    <MenuList color="black">
                        {Object.keys(languages).map(lang => (
                            <MenuItem key={lang} onClick={() => i18n.changeLanguage(lang)}>
                                {languages[lang]}
                            </MenuItem>
                        ))}
                    </MenuList>
                </Menu>

                {token && <Button colorScheme="red" onClick={handleLogout}>Logout</Button>}
            </HStack>
        </Flex>
    );
};

export default Navbar;
