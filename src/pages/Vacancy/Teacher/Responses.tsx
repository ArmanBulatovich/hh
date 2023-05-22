import { Box, Tab, TabList, TabPanel, TabPanels, Tabs } from '@chakra-ui/react';

import Refused from './Refused';
import Invited from './Invited';
import New from './New';

export default function Responses() {
  return (
    <Box m="30px 50px">
      <Tabs isFitted variant='enclosed' colorScheme='black'>
        <TabList>
          <Tab fontSize={20}>Refused</Tab>
          <Tab fontSize={20}>Invited</Tab>
          <Tab fontSize={20}>New</Tab>
        </TabList>
        <TabPanels>
          <TabPanel border="1px solid red">
            <Refused />
          </TabPanel>
          <TabPanel border="1px solid red">
            <Invited />
          </TabPanel>
          <TabPanel border="1px solid red">
            <New />
          </TabPanel>
        </TabPanels>
      </Tabs>
    </Box>
  )
}