import './footer.css';

const Footer = () => {
  return (
    <footer className="footer">
      <ul className="social_list">
        <li className="contactTeam">
          <a
            href="https://www.linkedin.com/in/aurelien-ferrand-970149220/"
            target="_blank"
            rel="noreferrer"
          >
            Aurelien Ferrand
          </a>
        </li>
        <li className="contactTeam">
          <a
            href="https://www.linkedin.com/in/fatima-ait-khelifa-4ab840215"
            target="_blank"
            rel="noreferrer"
          >
            Fatima Ait Khelifa
          </a>
        </li>
        <li className="contactTeam">
          {' '}
          <a
            href="https://www.linkedin.com/in/julienroth"
            target="_blank"
            rel="noreferrer"
          >
            Julien Roth
          </a>
        </li>
        <li className="contactTeam">
          {' '}
          <a
            href="https://www.linkedin.com/in/nicolas-bas-09ab32124/"
            target="_blank"
            rel="noreferrer"
          >
            Nicolas Bas
          </a>
        </li>
      </ul>
      <p>
        <br />
        Copyright @2021 | Réalisé par Umami Fr Remote <br /> <br />
        Projet conçu pour la formation de développeur Web à la WildCodeSchool.
      </p>
    </footer>
  );
};

export default Footer;
