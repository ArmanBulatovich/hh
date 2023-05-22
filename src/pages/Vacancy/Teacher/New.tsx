import { useQuery } from 'react-query';

import { getResponsesByCode } from '../../../api/vacancy';

export default function New() {
  const { data: responses, isLoading: responsesLoading } = useQuery(`vacancy-request/own/reject`, () => getResponsesByCode('reject'));
  console.log("responses", responses);

  return (
    <div>New</div>
  )
}
