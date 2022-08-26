import { Typography } from "@mui/material";
import type { GetServerSideProps, NextPage } from "next";
import Head from "next/head";
import { useState } from "react";
import { CalendarScheduler } from "../components/CalendarScheduler";
import { mapArrayEventCalendar } from "../domain/EventCalendar";
import { getAllEventsCalendar } from "../services/eventCalendarApi";
import { ContainerMain } from "../styles/Home";

interface IHomeProps {
  listAllEventsCalendar: any;
}

const Home = ({ listAllEventsCalendar }: IHomeProps) => {
  const [listEventsCalendar, setListEventsCalendar] = useState<any[]>(listAllEventsCalendar);
  
  return (
    <>
      <Head>
        <title>Full Calendar Scheduler</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <ContainerMain>
        <Typography variant="h2"> Full Calendar Scheduler </Typography>
        <CalendarScheduler eventsCalendar={listEventsCalendar} />
      </ContainerMain>
    </>
  );
};

export const getServerSideProps: GetServerSideProps = async () => {
  const eventsCalendar = await getAllEventsCalendar();
  const listAllEventsCalendar = mapArrayEventCalendar(eventsCalendar)

  return {
    props: {
      listAllEventsCalendar: listAllEventsCalendar ?? [],
    },
  };
};

export default Home;
