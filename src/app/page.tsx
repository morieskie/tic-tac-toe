import Image from "next/image";
import styles from "./page.module.css";
import Link from "next/link";

export default function Home() {
  const basePath = process.env.basePath;
  console.log('ENV', basePath)
  return (
    <div className={styles.page}>
      <main className={styles.main}>
        <Image
          className={styles.logo}
          src={`${basePath}/next.svg`}
          alt="Next logomark"
          width={120}
          height={40}
        />

        <div className={styles.ctas}>
          <Link className={"btn btn-primary"} href={"/game"}>
            Click to Play
          </Link>
        </div>
      </main>
      <footer className={styles.footer}></footer>
    </div>
  );
}
