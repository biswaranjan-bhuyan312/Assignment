import styles from "./Home.module.css"

const Home = ()=>{
  return (
    <>
        <div className={styles.container}>
          <div className={styles.containerbody}>
            <h3>Welcome to QuizzApp</h3>
          </div>
        </div>
    </>
  );
}

export default Home;