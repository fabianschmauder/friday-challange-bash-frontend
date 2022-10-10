import React, { useEffect, useState } from 'react';

interface Ec2Data {
  pid: string
  cpu: number
  user: string
}

function App() {
  const [ec2Data, setEc2Data] = useState<Ec2Data[]>();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);

  useEffect(() => {
    setLoading(true);
    setError(false);
    fetch("/monitoring-data.json")
      .then(response => response.json())
      .then(setEc2Data)
      .catch(setError)
      .finally(() => setLoading(false));
  }, []);

  return (
    <main >
      <h1>Fancy Dashboard</h1>
      <table>
        <thead>
          <tr>
            <th>ec2 instance</th>
            <th>cpu</th>
            <th>memory</th>
          </tr>
        </thead>
        <tbody>
          {ec2Data?.map(row => 
          <tr key={row?.pid || '-'}>
            <td>
              {row?.pid || '-'}
            </td>
            <td>
              {row?.cpu || '-'}%
            </td>

            <td>
              {row?.user || '-'}
            </td>
          </tr>
          )}
        </tbody>
      </table>
      {error && <p>failed to load data</p>}
      {loading &&
        //@ts-ignore
        <progress intermidate="true"></progress>}
    </main>
  );
}

export default App;