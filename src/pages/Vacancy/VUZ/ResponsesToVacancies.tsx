import { Box, Tab, TabList, TabPanel, TabPanels, Tabs } from '@chakra-ui/react';

import Refused from './Refused';
import Invited from './Invited';
import New from './New';

export default function ResponsesToVacancies() {
  return (
    <Box m="30px 50px">
      <Tabs isFitted variant='enclosed' colorScheme='black'>
        <TabList>
          <Tab fontSize={20}>Refused</Tab>
          <Tab fontSize={20}>Invited</Tab>
          <Tab fontSize={20}>New</Tab>
        </TabList>
        <TabPanels>
          <TabPanel>
            <Refused />
          </TabPanel>
          <TabPanel>
            <Invited />
          </TabPanel>
          <TabPanel>
            <New />
          </TabPanel>
        </TabPanels>
      </Tabs>
    </Box>
  )
}