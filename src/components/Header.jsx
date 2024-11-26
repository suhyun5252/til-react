import styles from "./header.module.css";

const Header = () => {
  return (
    <header>
      <div className={styles.layout}>
        <a href="#" className={styles.link}>
          로고
        </a>
        <div>
          <ul>
            <li>
              <a href="#">주메뉴1</a>
            </li>
            <li>
              <a href="#">주메뉴2</a>
            </li>
            <li>
              <a href="#">주메뉴3</a>
            </li>
            <li>
              <a href="#">주메뉴4</a>
            </li>
          </ul>
        </div>
      </div>
    </header>
  );
};

export default Header;
