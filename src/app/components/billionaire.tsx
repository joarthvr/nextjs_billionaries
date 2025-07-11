"use client";

import Link from "next/link";
import Image from "next/image";
import styles from "../styles/billionarie.module.css";

interface BillionaireProps {
  id: string;
  name: string;
  netWorth: string;
  squareImage: string;
  industries: string[];
}

export default function Billionaire({
  id,
  name,
  squareImage,
  netWorth,
  industries,
}: BillionaireProps) {
  return (
    <div className={styles.billionaire}>
      <Link href={`/${id}`} prefetch>
        <h2>{name}</h2>
        {squareImage && (
          <Image
            src={squareImage}
            alt={`${name}의 사진`}
            width={200}
            height={200}
            className={styles.image}
          />
        )}
        <div className={styles.info}>
          <div className={styles.industries}>
            {netWorth}/{industries.join(", ")}
          </div>
        </div>
      </Link>
    </div>
  );
}
