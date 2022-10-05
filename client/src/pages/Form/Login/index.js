import { Link } from "react-router-dom";

import styles from "./styles.module.scss";

const LoginPage = () => {
    return (
        <div className={styles.container}>
            <h1 className={styles.title}>Login</h1>
            <p className={styles.text}>
                Or 
                <Link to="/register">
                    <span className={styles.link}> register</span>
                </Link>
            </p>
        </div>
    );
};

export default LoginPage;