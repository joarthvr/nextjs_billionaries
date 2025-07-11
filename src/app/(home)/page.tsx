import { API_URL } from "../constants";
import styles from "../styles/home.module.css";
import Billionaries from "../components/billionaire";

export const metadata = {
  title: "Home",
};

interface Billionaire {
  id: string;
  name: string;
  squareImage: string;
  netWorth: string;
  industries: string[];
}

async function getBillionaries(): Promise<Billionaire[]> {
  const response = await fetch(API_URL);
  const json = await response.json();
  return json;
}

export default async function HomePage() {
  const billionaires: Billionaire[] = await getBillionaries();
  return (
    <div className={styles.container}>
      {billionaires.map((billionaire: Billionaire) => (
        <Billionaries
          key={billionaire.id}
          id={billionaire.id}
          name={billionaire.name}
          squareImage={billionaire.squareImage}
          netWorth={billionaire.netWorth}
          industries={billionaire.industries}
        />
      ))}
    </div>
  );
}

export const runtime = "edge";
