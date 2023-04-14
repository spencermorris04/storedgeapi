import styles from "./index.module.css";
import { useState } from 'react';
import { NextPage } from "next";
import Head from "next/head";
import Link from "next/link";

const Home: NextPage = () => {
  const facilities = [
    { id: 'd88255d5-0b69-4b2b-b46e-99b348d7a412', name: 'AZ Storage - Clay' },
    { id: '9f5870cc-9c99-441b-a7fd-d64cd06d8a8c', name: 'Flex Storage - Canton' },
    //... add the rest of the facility IDs and names here
  ];

  const [selectedFacility, setSelectedFacility] = useState<string>('');

  const apiKey = '3aGJEUjyr8kxEkQS8FGDlvogbDQwCkthQeRLZ4u7';
  const apiSecret = 'e7EjTtVF94OT4qh4A1uWgXJq67NcTsbogR7dFjgY';

  const callAPI = async () => {
    try {
      const res = await fetch(`/api/units?facilityId=${selectedFacility}`);
      const data = await res.json();
      console.log(data);
    } catch (err) {
      console.log(err);
    }
  };

  const handleFacilityChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedFacility(e.target.value);
  };

  return (
    <>
      <Head>
        <title>Create T3 App</title>
        <meta name="description" content="Generated by create-t3-app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className={styles.main}>
        <div className={styles.container}>
          <h1>Select a Facility</h1>
          <select value={selectedFacility} onChange={handleFacilityChange}>
            <option value="">-- Select a facility --</option>
            {facilities.map((facility) => (
              <option key={facility.id} value={facility.id}>
                {facility.name}
              </option>
            ))}
          </select>
          <button onClick={callAPI} disabled={!selectedFacility}>
            Make API Call
          </button>
        </div>
      </main>
    </>
  );
};

export default Home;
