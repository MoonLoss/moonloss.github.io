import React from 'react'
import styles from 'styles/footer.module.css'
import siteConfig from '../../config/blog-config'

const Footer = () => (
  <footer className={styles.footer}>
    {siteConfig.copyright}
    <br />
    Powered by&nbsp;
    <a
      href="https://www.gatsbyjs.org"
      target="_blank"
      rel="noopener noreferrer"
    >
      Gatsby
    </a>
  </footer>
)

export default Footer
