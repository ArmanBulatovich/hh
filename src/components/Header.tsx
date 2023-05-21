import { useNavigate } from "react-router-dom";
import {
  Box,
  Flex,
  Text,
  IconButton,
  Button,
  Stack,
  Collapse,
  Icon,
  Link,
  Popover,
  PopoverTrigger,
  PopoverContent,
  useColorModeValue,
  useBreakpointValue,
  useDisclosure,
  Menu,
  MenuList,
  MenuItem,
  MenuButton,
  MenuGroup,
  MenuDivider,
  Avatar,
} from "@chakra-ui/react";
import {
  HamburgerIcon,
  CloseIcon,
  ChevronDownIcon,
  ChevronRightIcon,
} from "@chakra-ui/icons";
import { useSnapshot } from "valtio";

import { store } from "../store/store";

export default function Header() {
  const { isOpen, onToggle } = useDisclosure();
  const navigate = useNavigate();
  const { isAuthenticated } = useSnapshot(store.auth);
  const role = localStorage.getItem('role');
  return (
    <Box position={"fixed"} top={0} width={"100%"} zIndex={9999}>
      <Flex
        bg={useColorModeValue("white", "gray.800")}
        color={useColorModeValue("gray.600", "white")}
        minH={"60px"}
        py={{ base: 2 }}
        px={{ base: 4 }}
        borderBottom={1}
        borderStyle={"solid"}
        borderColor={useColorModeValue("gray.200", "gray.900")}
        align={"center"}
      >
        <Flex
          flex={{ base: 1, md: "auto" }}
          ml={{ base: -2 }}
          display={{ base: "flex", md: "none" }}
        >
          <IconButton
            onClick={onToggle}
            icon={isOpen ? <CloseIcon w={3} h={3} /> : <HamburgerIcon w={5} h={5} />}
            variant={"ghost"}
            aria-label={"Toggle Navigation"}
          />
        </Flex>
        <Flex flex={{ base: 1 }} justify={{ base: "center", md: "start" }}>
          <Box onClick={() => navigate('/')} width="25px" height="25px" backgroundColor="red" borderRadius="12.5px" textAlign="center" color="white">Th</Box>
          <Flex display={{ base: "none", md: "flex" }} ml={10}>
            <DesktopNav />
          </Flex>
        </Flex>
        {isAuthenticated ? (
          <Menu>
            <MenuButton as={Button} colorScheme='purple'>
              Profile
            </MenuButton>
            <MenuList>
              <MenuGroup title='Profile'>
                <MenuItem onClick={() => { if (isAuthenticated) { role === '\"educational_institution\"' ? navigate('/profile-vuz') : navigate('/profile-user'); } }}>
                  My Account
                </MenuItem>
                <MenuItem
                  onClick={() => navigate("/balance")}
                >Payments</MenuItem>
              </MenuGroup>
              <MenuDivider />
              <MenuGroup title='Help'>
                <MenuItem>Docs</MenuItem>
                <MenuItem
                  onClick={() => {
                    localStorage.removeItem("token");
                    localStorage.removeItem("role");
                    store.auth.isAuthenticated = false;
                    navigate("/login");
                    // queryCache.clear();
                  }}
                >Logout</MenuItem>
              </MenuGroup>
            </MenuList>
          </Menu>
        ) : (
          <Stack
            flex={{ base: 1, md: 0 }}
            justify={"flex-end"}
            direction={"row"}
            spacing={6}
          >
            <Button
              as={"a"}
              fontSize={"sm"}
              fontWeight={400}
              variant={"link"}
              onClick={() => navigate("/login")}
              _hover={{
                textDecoration: "none",
                cursor: "pointer",
              }}
            >
              Sign In
            </Button>
            <Button
              onClick={() => navigate("/register")}
              display={{ base: "none", md: "inline-flex" }}
              fontSize={"sm"}
              fontWeight={600}
              color={"white"}
              bg={"pink.400"}
              _hover={{
                bg: "pink.300",
              }}
            >
              Sign Up
            </Button>
          </Stack>
        )}
      </Flex>

      <Collapse in={isOpen} animateOpacity>
        <MobileNav />
      </Collapse>
    </Box >
  );
}

const DesktopNav = () => {
  const linkColor = useColorModeValue("gray.600", "gray.200");
  const linkHoverColor = useColorModeValue("gray.800", "white");
  const popoverContentBgColor = useColorModeValue("white", "gray.800");
  const role = localStorage.getItem("role");
  return (
    <Stack direction={"row"} spacing={4}>
      {(role && role === '\"educational_institution\"') && (
        NAV_ITEMS_FOR_VUZ.map((navItem) => (
          <Box key={navItem.label}>
            <Popover trigger={"hover"} placement={"bottom-start"}>
              <PopoverTrigger>
                <Link
                  p={2}
                  href={navItem.href ?? "#"}
                  fontSize={"sm"}
                  fontWeight={500}
                  color={linkColor}
                  _hover={{
                    textDecoration: "none",
                    color: linkHoverColor,
                  }}
                >
                  {navItem.label}
                </Link>
              </PopoverTrigger>

              {navItem.children && (
                <PopoverContent
                  border={0}
                  boxShadow={"xl"}
                  bg={popoverContentBgColor}
                  p={4}
                  rounded={"xl"}
                  minW={"sm"}
                >
                  <Stack>
                    {navItem.children.map((child) => (
                      <DesktopSubNav key={child.label} {...child} />
                    ))}
                  </Stack>
                </PopoverContent>
              )}
            </Popover>
          </Box>
        )))}

      {(role && role === '\"teacher\"') && (
        NAV_ITEMS_FOR_TEACHER.map((navItem) => (
          <Box key={navItem.label}>
            <Popover trigger={"hover"} placement={"bottom-start"}>
              <PopoverTrigger>
                <Link
                  p={2}
                  href={navItem.href ?? "#"}
                  fontSize={"sm"}
                  fontWeight={500}
                  color={linkColor}
                  _hover={{
                    textDecoration: "none",
                    color: linkHoverColor,
                  }}
                >
                  {navItem.label}
                </Link>
              </PopoverTrigger>

              {navItem.children && (
                <PopoverContent
                  border={0}
                  boxShadow={"xl"}
                  bg={popoverContentBgColor}
                  p={4}
                  rounded={"xl"}
                  minW={"sm"}
                >
                  <Stack>
                    {navItem.children.map((child) => (
                      <DesktopSubNav key={child.label} {...child} />
                    ))}
                  </Stack>
                </PopoverContent>
              )}
            </Popover>
          </Box>
        )))}
    </Stack>
  );
};

const DesktopSubNav = ({ label, href, subLabel }: NavItem) => {
  return (
    <Link
      href={href}
      role={"group"}
      display={"block"}
      p={2}
      rounded={"md"}
      _hover={{ bg: useColorModeValue("pink.50", "gray.900") }}
    >
      <Stack direction={"row"} align={"center"}>
        <Box>
          <Text
            transition={"all .3s ease"}
            _groupHover={{ color: "pink.400" }}
            fontWeight={500}
          >
            {label}
          </Text>
          <Text fontSize={"sm"}>{subLabel}</Text>
        </Box>
        <Flex
          transition={"all .3s ease"}
          transform={"translateX(-10px)"}
          opacity={0}
          _groupHover={{ opacity: "100%", transform: "translateX(0)" }}
          justify={"flex-end"}
          align={"center"}
          flex={1}
        >
          <Icon color={"pink.400"} w={5} h={5} as={ChevronRightIcon} />
        </Flex>
      </Stack>
    </Link>
  );
};

const MobileNav = () => {
  const role = localStorage.getItem("role");
  return (
    <Stack
      bg={useColorModeValue("white", "gray.800")}
      p={4}
      display={{ md: "none" }}
    >
      {(role && role === '\"teacher\"') && (
        NAV_ITEMS_FOR_TEACHER.map((navItem) => (
          <MobileNavItem key={navItem.label} {...navItem} />
        )))}
      {(role && role === '\"educational_institution\"') && (
        NAV_ITEMS_FOR_VUZ.map((navItem) => (
          <MobileNavItem key={navItem.label} {...navItem} />
        )))}
    </Stack>
  );
};

const MobileNavItem = ({ label, children, href }: NavItem) => {
  const { isOpen, onToggle } = useDisclosure();

  return (
    <Stack spacing={4} onClick={children && onToggle}>
      <Flex
        py={2}
        as={Link}
        href={href ?? "#"}
        justify={"space-between"}
        align={"center"}
        _hover={{
          textDecoration: "none",
        }}
      >
        <Text
          fontWeight={600}
          color={useColorModeValue("gray.600", "gray.200")}
        >
          {label}
        </Text>
        {children && (
          <Icon
            as={ChevronDownIcon}
            transition={"all .25s ease-in-out"}
            transform={isOpen ? "rotate(180deg)" : ""}
            w={6}
            h={6}
          />
        )}
      </Flex>

      <Collapse in={isOpen} animateOpacity style={{ marginTop: "0!important" }}>
        <Stack
          mt={2}
          pl={4}
          borderLeft={1}
          borderStyle={"solid"}
          borderColor={useColorModeValue("gray.200", "gray.700")}
          align={"start"}
        >
          {children &&
            children.map((child) => (
              <Link key={child.label} py={2} href={child.href}>
                {child.label}
              </Link>
            ))}
        </Stack>
      </Collapse>
    </Stack>
  );
};

interface NavItem {
  label: string;
  subLabel?: string;
  children?: Array<NavItem>;
  href?: string;
}

const NAV_ITEMS_FOR_VUZ: Array<NavItem> = [
  {
    label: "Teachers",
    href: "/get-teachers",
  },
  {
    label: "Documents",
    children: [
      {
        label: 'My bought document(s)',
        subLabel: 'An exclusive lists of document(s) for contract work',
        href: '/documents/bought',
      },
      {
        label: 'Documents',
        subLabel: 'An exclusive lists of document(s) for contract work',
        href: "/documents",
      }
    ],
  },
  {
    label: "Vacancy",
    children: [
      {
        label: 'My vacancies',
        subLabel: 'My vacancies for contract work',
        href: '/vacancies',
      },
      {
        label: 'Create vacancy',
        subLabel: 'Create vacancy for contract work',
        href: "/vacancy/create",
      }
    ],
  },
];

const NAV_ITEMS_FOR_TEACHER: Array<NavItem> = [
  {
    label: "Adding Ads",
    href: "/adding-ads",
  },
  {
    label: "Documents",
    children: [
      {
        label: 'Own document(s)',
        subLabel: 'Own document(s) for contract work',
        href: "/documents/uploaded",
      },
      {
        label: 'My bought document(s)',
        subLabel: 'An exclusive lists of document(s) for contract work',
        href: '/documents/bought',
      },
      {
        label: 'Documents',
        subLabel: 'An exclusive lists of document(s) for contract work',
        href: "/documents",
      }
    ],
  },
];
