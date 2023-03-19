import LegalPage from "@/layouts/LegalPage";
import React from "react";

const CookiePolicy = () => {
  return (
    <LegalPage title="Cookie Policy">
      <h1>Cookie Policy</h1>
      <p>
        By using the Bingo Draw App website, you agree to our use of cookies as
        outlined below.
      </p>
      <h2>What are Cookies?</h2>
      <p>
        Cookies are small text files that are placed on your computer or mobile
        device when you visit a website. They are widely used in order to make
        websites work, or work more efficiently, as well as to provide
        information to the owners of the site.
      </p>
      <h2>How We Use Cookies</h2>
      <p>We use cookies for the following purposes:</p>
      <ul>
        <li>To provide functionality of the website</li>
        <li>To remember your preferences</li>
        <li>To analyze and improve the performance of the website</li>
        <li>To show you personalized content and advertisements</li>
      </ul>
      <h2>Types of Cookies We Use</h2>
      <p>We use the following types of cookies:</p>
      <ul>
        <li>
          Session Cookies: These cookies are stored in temporary memory and are
          not retained after you close the browser. Session cookies do not
          collect information from your computer.
        </li>
        <li>
          Persistent Cookies: These cookies remain on your computer until they
          expire or are deleted. Persistent cookies collect information about
          your browsing habits and help us to personalize the content of the
          website for you.
        </li>
        <li>
          Third-Party Cookies: These cookies are placed by third-party services
          that appear on our website. Third-party cookies collect information
          about your browsing habits and are used to show you personalized
          content and advertisements.
        </li>
      </ul>
      <h2>Managing Cookies</h2>
      <p>
        You can control the use of cookies at the individual browser level. If
        you reject cookies, you may still use our website, but your ability to
        use some features or areas of our website may be limited.
      </p>
      <h2>Changes to This Policy</h2>
      <p>
        We reserve the right to make changes to this cookie policy at any time
        without prior notice. Any changes we make to this policy will be
        reflected on this page.
      </p>
      <h2>Contact Us</h2>
      <p>
        If you have any questions about our cookie policy, please contact us at
        [email address].
      </p>
    </LegalPage>
  );
};

export default CookiePolicy;
