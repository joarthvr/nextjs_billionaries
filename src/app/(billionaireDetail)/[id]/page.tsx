import Image from "next/image";
import { API_URL } from "../../constants";
import styles from "../styles/billionaireDetail.module.css";

type PageProps = {
  params: Promise<{ id: string }>;
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
};

interface FinancialAsset {
  exchange: string;
  ticker: string;
  companyName: string;
  numberOfShares: number;
  sharePrice: number;
  currencyCode: string;
  exchangeRate: number;
  interactive: boolean;
  currentPrice: number;
  exerciseOptionPrice?: number;
}

interface Billionaire {
  id: string;
  state: string;
  city: string;
  name: string;
  country: string;
  position: number;
  industries: string[];
  financialAssets: FinancialAsset[];
  thumbnail: string;
  squareImage: string;
  bio: string[];
  about: string[];
  netWorth: number;
}

async function getBillionaire(id: string): Promise<Billionaire> {
  const response = await fetch(`${API_URL}/person/${id}`);
  const json = await response.json();
  return json;
}

function formatCurrency(amount: number): string {
  return new Intl.NumberFormat("ko-KR", {
    style: "currency",
    currency: "USD",
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(amount);
}

function formatNumber(num: number): string {
  return new Intl.NumberFormat("ko-KR").format(num);
}

function formatNetWorth(netWorth: number): string {
  const billions = netWorth / 1000;
  return `$${billions.toFixed(1)}B`;
}

export default async function BillionaireDetail({ params }: PageProps) {
  const { id } = await params;
  const billionaire = await getBillionaire(id);

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <div className={styles.imageContainer}>
          {billionaire.squareImage && (
            <Image
              src={billionaire.squareImage}
              alt={`${billionaire.name}의 사진`}
              width={300}
              height={300}
              className={styles.profileImage}
            />
          )}
        </div>

        <div className={styles.basicInfo}>
          <h1 className={styles.name}>{billionaire.name}</h1>

          <div className={styles.infoGrid}>
            <div className={styles.infoCard}>
              <div className={styles.infoLabel}>순자산</div>
              <div className={`${styles.infoValue} ${styles.netWorth}`}>
                {formatNetWorth(billionaire.netWorth)}
              </div>
            </div>

            <div className={styles.infoCard}>
              <div className={styles.infoLabel}>국가</div>
              <div className={styles.infoValue}>{billionaire.country}</div>
            </div>

            <div className={styles.infoCard}>
              <div className={styles.infoLabel}>도시</div>
              <div className={styles.infoValue}>
                {billionaire.city}, {billionaire.state}
              </div>
            </div>

            <div className={styles.infoCard}>
              <div className={styles.infoLabel}>산업</div>
              <div className={styles.infoValue}>
                {billionaire.industries.join(", ")}
              </div>
            </div>
          </div>
        </div>
      </div>

      {billionaire.bio && billionaire.bio.length > 0 && (
        <div className={styles.bioSection}>
          <h2 className={styles.sectionTitle}>소개</h2>
          {billionaire.bio.map((paragraph, index) => (
            <p key={index} className={styles.bioText}>
              {paragraph}
            </p>
          ))}
        </div>
      )}

      {billionaire.financialAssets &&
        billionaire.financialAssets.length > 0 && (
          <div className={styles.financialAssets}>
            <h2 className={styles.sectionTitle}>금융 자산</h2>
            <div className={styles.assetsGrid}>
              {billionaire.financialAssets.map((asset, index) => (
                <div key={index} className={styles.assetCard}>
                  <div className={styles.ticker}>{asset.ticker}</div>
                  <div className={styles.companyName}>{asset.companyName}</div>

                  <div className={styles.assetDetails}>
                    <div className={styles.assetDetail}>
                      <span className={styles.assetLabel}>보유 주식:</span>
                      <span className={`${styles.assetValue} ${styles.shares}`}>
                        {formatNumber(asset.numberOfShares)}주
                      </span>
                    </div>

                    {asset.exerciseOptionPrice && (
                      <div className={styles.assetDetail}>
                        <span className={styles.assetLabel}>행사 가격:</span>
                        <span
                          className={`${styles.assetValue} ${styles.exercisePrice}`}
                        >
                          {formatCurrency(asset.exerciseOptionPrice)}
                        </span>
                      </div>
                    )}

                    <div className={styles.assetDetail}>
                      <span className={styles.assetLabel}>현재 주가:</span>
                      <span
                        className={`${styles.assetValue} ${styles.sharePrice}`}
                      >
                        {formatCurrency(asset.currentPrice)}
                      </span>
                    </div>

                    <div className={styles.assetDetail}>
                      <span className={styles.assetLabel}>거래소:</span>
                      <span className={styles.assetValue}>
                        {asset.exchange}
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

      {billionaire.about && billionaire.about.length > 0 && (
        <div className={styles.aboutSection}>
          <h2 className={styles.sectionTitle}>추가 정보</h2>
          <ul className={styles.aboutList}>
            {billionaire.about.map((item, index) => (
              <li key={index} className={styles.aboutItem}>
                {item}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}
