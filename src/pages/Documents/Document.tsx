import { useQuery } from 'react-query';
import { useParams, useNavigate } from 'react-router-dom';
import { Box, Button, Text } from '@chakra-ui/react'

import { buyDocument, getDocumentById } from '../../api/documents';

export const Document = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { data: document, isLoading: documentLoading } = useQuery(["document", id], () => getDocumentById(id ? id : ""));
console.log("document", document);

  const handleDownload = () => {
    if (document?.data?.url) {
      window.open(document?.data?.url, "_blank");
    }
  }

  return (
    <Box display="flex" justifyContent="center">
      {documentLoading ? (<Text mt="36px">Loading...</Text>) : (
        <Box width="70%" mt="36px">
          <Box display='block' p="16px" border="1px solid #FF5800" borderRadius="8px">
            <Box display="flex" justifyContent="space-between" alignItems="center" mb="12px">
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
            {(document?.data?.teacher || document?.data?.url) &&
              <Box display="flex" justifyContent="space-between" alignItems="center" >
                {document?.data?.teacher && <Text fontSize={16} width="50%" display="flex">Author:
                  <Text fontSize={16} fontWeight={500} ml="4px"> {document?.data?.teacher?.name} {document?.data?.teacher?.middleName}</Text></Text>}
                {document?.data?.url && <Button onClick={handleDownload}>Download</Button>}
              </Box>}
          </Box>
          {document?.data?.url === null && (
            <Box display="flex" justifyContent="center" mt="16px">
              <Button onClick={() => {
                id && buyDocument(id).then((res) => {
                  if (res.data.success) {
                    alert("Document purchased successfully");
                    navigate(`/documents/bought/${id}`);
                  }
                  if (res.data.success === false) {
                    alert("Not enough money");
                  }
                })
              }}>Buy</Button>
            </Box>
          )}
        </Box>
      )}
    </Box>
  )
}