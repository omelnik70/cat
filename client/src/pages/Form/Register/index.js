import { Link } from "react-router-dom";

import styles from "./styles.module.scss";

const Register = () => {
    return (
        <div className={styles.container}>
            <h1 className={styles.title}>Register</h1>
            <p className={styles.text}>
                Already have an account? 
                <Link to="/login">
                    <span className={styles.link}> Sign in</span>
                </Link>
            </p>
        </div>
    );
};

export default Register;