import { useState, useEffect } from 'react';
import { useQuery } from 'react-query';
import { useParams } from 'react-router-dom';
import { Box, Button, Input, Text } from '@chakra-ui/react'

import { getDocumentById } from '../../api/documents';

export const Document = () => {
  const { id } = useParams();
  const { data: document, isLoading: documentLoading } = useQuery(["document", id], () => getDocumentById(id ? id : ""));
  console.log("document", document?.currency?.name);

  return (
    <Box display="flex" justifyContent="center">
      {documentLoading ? (<Text mt="30px">Loading...</Text>) : (
        <Box width="80%" mt="30px">
          <Box display='block' p="16px" border="1px solid #FF5800" borderRadius="8px">
            <Box display="flex" justifyContent="space-between" alignItems="center">
              <Text fontSize="2xl" fontWeight="500">{document?.data?.type?.name} {document?.data?.name}</Text>
              <Text fontSize="2xl" fontWeight={500}>{document?.data?.price} {document?.data?.currency?.name}</Text>
            </Box>
            <Box display="flex" justifyContent="space-between" alignItems="center">
              <Text fontSize={16} width="50%">{document?.data?.description}</Text>
              <Text fontSize={16}>{document?.data?.language.name}</Text>
            </Box>
            <Box display="flex" justifyContent="flex-end" alignItems="center">
              <Text fontSize={16}>{document?.data?.created_at.slice(0, 10)}</Text>
            </Box>
          </Box>
          <Button onClick={() => { }}>Buy</Button>
        </Box>
      )}
    </Box >
  )
}