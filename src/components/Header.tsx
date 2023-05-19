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
            icon={
              isOpen ? <CloseIcon w={3} h={3} /> : <HamburgerIcon w={5} h={5} />
            }
            variant={"ghost"}
            aria-label={"Toggle Navigation"}
          />
        </Flex>
        <Flex flex={{ base: 1 }} justify={{ base: "center", md: "start" }}>

          <Box onClick={() => navigate('/')} width="25px" height="25px" backgroundColor="red" borderRadius="12.5px" textAlign="center" color="white">Th</Box>
          {/* <Avatar onClick={() => navigate('/')} name='Logo' width="25px" height="25px"
            src='data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAOEAAADhCAMAAAAJbSJIAAAAilBMVEXSChH////PAAD76erSBg7liIrhdnn/+fnOAAD//P3RAAfSAAv88fHxwcLieXv99vbZQ0bqpKXYPkHsqqznl5jaSUztr7DeZ2n21dbpnp/WMjbUJSnfbG7dYWPcWFvUGh/yxsfYNzvutrf43+Dif4DbUFL219jWLDDljY7VHSPjhIXcVlnstbbwvr8v1NrpAAALEklEQVR4nOWda2PiKhCGE5Jt18RW4zXWVu3F1u0e///fO0SNxmQGhgAGuu/HVgmPEBhgZghC2xpEm322+5hPX5dBqeXrdP6xy/abaGD9+YHFsgf5+Hu7ZCclaXwmjNOk/PNy+z3ObXJaIrzPs+f1gaDCBSlOD59aP2f5vZ2q2CDMJ9MDmxDtWgfO6SS3UBvThNHspaisuOGQ5iy++DKLDNfIKGG0GLWkq1KOFkYhzRH2syEfTjToSvFBaJj1jdXLFOHDiv/6BvCO4mWtHgzVzAhhf7I2iFdCridGGtIA4edcbdykio+v808HCDdT4813EZ9BNh0TPnxZ5Dsyfmm+kFqEmycjg6dYCXvSYtQgzIc34DsyDjWMndaE0Yvl/lkVt3VaWwFtCXc35Dsy7m5K+JBo2WZtxO25dq9jG8L+ysr8J1PKVm1MgBaE4xt30IsYG9+AsL+9eQe9KGZb5WZUJXzrrAGPYuzNLuFzhw14VMyee/YI39fdNuBRbP1ui3B2IxtGpoTN7BA+dt5DS8Xs0QLhYOhCDy3FRuQtViphFLgEyBEDqqFKJNw48gpelDDi2phGOHPmFbwoJo43JMKJWz20FJuYIty5CcgRKSsqAuGdq4Ac8c4E4aO7gBxRPjFKCZ0GpCDKCB3uokdJO6qE0NlB5iLZcCMmdHSauJZk0hASznwA5IjCqV9EuPEDkCOKDDgBYeSgqQYrZgIzHCccBK4Z27iSAF9M4YROrQdlYkN1Qsdn+rrwmR8j9GQYvQgdUBHCd29GmVIxQ3bgEMK1P6NMqWStQvjsWx8txJ7phG8+AnJEcMMfIux79xIeFTPo2AYi3PrZhLwRtzTCsa+AHBE4X2wS+tpHC0H9tEm48rcJeSOu5IQPPgNyxIY7Q4Mw6cIJwZzSREbowcaMWI1tmxqhZNUbN9SuGqbKgYqur4ZrhC/CJoxZQ63sV1PlgGIvIsJc3Ef5z9O7VvirTa9mg169HIP7siwXEErW9cB2SDvCZvCIScLr9f4VoWxzzQ/C2tbbFeGT5G3whDB5wgilk70nhNfTfpXwSzag+UKYfMGE8i1uXwiv3sQK4fQHEU4hwk/5M7whDNglFOVCOP9RhPMmYZ/wCH8Ig8tS+ExIOQz1ifB8bHomXBPWhR4Rpuf94ZKQtLT3iPAy65eEpN0ZrwjLHZsTIWWc8YvwPNacCLMfSJhdEdIOfP0iHFYJI1r5XhGWtQ0UOqlvhFmFcPQjCUcXQmIn9YzwVN0DIdUtwTfC2ZlQvEta+YpnhC9nQup5mmeEMSsJJfvAlZr5RXjcGy4IyV6k3hFOToTyDZryGzLC6wMJdD0mJSSWI63v9Eh4Tz7WFhMW1VpNHj6jXtiLPjfZ3RI7cBET8nLSl8nmkz+sKGdRJJxqBxkXDwoUXkMhYcrYXV6L7owWcNoMESEv56OeQeF98qddcG7xIgZkk01MyNIFmKsrXwHtiBPGbA2Ha2+mbdqxMNwCFRcvlJCxX2hwbv7VKB8lZAKv9E2LEN3CEYwT/iH/OBghGwmDAXf1Fx0jlMSifygjpn8KwgH9ewgh+xDVq/j5az0MJoylsWhvyq4+bMAJ6QMNTEiJA3y/RgQJU0Lei40qIh9qAhUnL5CQFMt5feoDEjJKDpq9YkdlY06oYJVAhL9pwaqL6lNAQlrSq281RPaLEyp4IgKEj3tSxcLwtfIYgHBOzSJE2bmuPGnLCZf0rwCE5PQGuZiQnEJIrZ+myzAYKLy8otAUqSp7zgAhXa8qrjcxGwTUHQxtwo0hQjUXbRYFCpOFHmHFstAiJK/Xj4/KA5V+LSaMHha73W6BDhmXZaiYMNpPeDkZWo7SUpLtA7rdLSTsLb5+l+u5R/hjOYWwXywjTvqGbTglD1g2DlTcLXHCrLoURNI59c7dCyecVMrh60RwKqKdIpWP2gUq5ixG2Kvljor5RAvofDiCEQ5GtXJ+gz+VwvzGbeaA4KAgI+w9NddHUHDHnYSw38yfApqEKtESbB5sFaYXhBB4YsyA9eJCQvjaLCeFgplUul2yDUYqTQ4SLqAHlqd3Vc3EhKCBDL2K4AMRpaNgqTC7gITwRhYU1LkREsIO2HWP30IqIS/xMljTPw0TwrutMUDxKSSE+16xSq9LyTRV4UMIA7ibQ1a6kBAxVYAoGBUzTFEQIfY4YEEbiQixeRx4JsEDr60gQuxIABgi+iJCbGkLzBfvtyX8i9Xsv8ZH70WEI2TWAn6pGxNie5FsoUSIHi0Av5TKgk9RACFqJEJbg7/L/wFrfLScrgnRHgOZpgJC1AUb6AuKhJrzIV4zNUJ05a5LuNa1afCaAdmNBISonQL0dhVCbtNo2qX/GSJEz6GBvqBCyO1SzbUFagUrEqL70pqEfG2huT40RYiuiDQJ+fpQc42PboIoEqLbS7qEH7r7NHjvcoRwp7vX5jxhprtf6jzhXnfP23nCXPfcwnnCSPfsyXHC4uxJ8/zQccLi/FDzDNhxwsMZsOY5vuOEvwz4YrhNODbgT+M2YW7EJ8plwsInSsF/wzvC4mDHjG+iq4Qn30Qj/qWOEmYGfYTdJMyN+nm7R1j6eRv01XeMsPTVtxNv4QRhGW9hJWbGCcIyZsZK3JMDhJe4Jyuxaw4QVmLXbMQfukB4iT+0EUPqAuElhhQ9gPWaMKnEAVN9cPwiPJ3LWYvHd4CwGo9vIadC54TXORUs5MXonvA6L4b53CbdE17nNjGfn6Zrwnp+GvM5hjonrOcYMp4nqmPCZp4o47m+OiYEcn2ZztfWNWEzXxsp517T1xM/xwcCS8+EzX/hngrNK7kIjQHl3KN4bcaNJM4BvrIUfNhUOQJCKG8iZbtGKUu14MOmykEBwdyXoTdXdMmF5C+V56D1RVgOWt8vDbgIzSMszQXtifBc0D+lEa8D+5VysvshUU52m7Eat5Mwrz5559Rh1S9iadxv0XUFtSW53+IH3FFSt9Qb98y0zzvlhNKGVd8gVM0e4piaQUTN+56wQCYvxP42eP7FO7t+/r1r/8Dded72U/r9hz//Dst/4B7SsOfjXbIBnPbvn70P2L8pA84YIyC0kxTWnqAtdgkhNYu5GzplJ1cjHAT+jDZJMGhB6NFog44yEkJ/NsGFySlFhGRvsI4lTi8qJKR7nnYpSWJXMWG7hOS3FZxXjEzo/rSIT4REwvDRbUT2KAOQErqNKAckELrcUaVdlEbo7nAjG2TIhK5OGtL833RCPvW7Z8BR8ojTCbkB55oZnpDyiNMJw/dmXspOxQJqFmoqYZFbtGuqitgIXy61JSxmDVdexpgyS7QgDMeOvIwJuiejSxi+t7hEw7zor6A6Ydh77rynxuwZvQ7FAGGx4d9tMzJ4694gYdjfdtiMseSeFiOExYDTVTMiicKNE4b9v524M6Tsr3IDtiQs3Blu34xIhnZLhIf7ZW7MR1kpmSQMo9UNGRlbtb54ojVhGObDG9k4CRtRb6ExSxiGD083YEzYk/wiKFuEnBG+HM+cGPvS4tMmPFxqZ4+RsSlxnWuRMAw/5xrXTAqUMjanXXNlm5CbALvAeEPyAndtJviGjBByPfDJwxxkcd+n5ut3lilC3pDZELt3VE0JY8PMSPMdZI4wLO4dHfFfX2fpUdzWOlpoXStVl1FCrmj2wlpSHq7IfZkZxQvNExbKJ1PVa3zT4gvTiYbpgsoGIdd9nhXX+Bac4uaMD2xs/ZzlWleV4bJEeNAgH39vl+UNXEmFNU6T8s/L7fc4J29+tpBNwqMG0Waf7T7m09flmXD5Op1/7LL9JrLJdtT/ooWo5w692nMAAAAASUVORK5CYII=' /> */}
          <Flex display={{ base: "none", md: "flex" }} ml={10}>
            <DesktopNav />
          </Flex>
        </Flex>
        {isAuthenticated ? (
          <Menu>
            <MenuButton as={Button} colorScheme='pink'>
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
