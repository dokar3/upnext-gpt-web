import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description: "Privacy Policy of the UpNextGPT App",
};

export default function PrivacyPolicy() {
  return (
    <div className="p-16 flex justify-center text-gray-100">
      <div className="max-w-3xl">
        <h1 id="privacy-policy" className="text-3xl font-bold">
          Privacy Policy
        </h1>
        <p className="mt-8">
          <em>Last updated: July 11, 2023</em>
        </p>

        <h2 id="introduction" className="mt-8 mb-2 text-xl font-bold">
          Introduction
        </h2>
        <p>
          Our app, <strong>UpNext GPT</strong> (&quot;we&quot;, &quot;our&quot;,
          or &quot;us&quot;) is committed to protecting your privacy. This
          Privacy Policy explains how we collect, use, and disclose your
          information when you use our mobile application (the &quot;App&quot;)
          on the Google Play Store. Please read this Privacy Policy carefully
          before using the App.
        </p>
        <p>
          By using the App, you agree to the collection and use of information
          in accordance with this Privacy Policy. If you do not agree with any
          part of this Privacy Policy, please do not use the App.
        </p>

        <h2
          id="information-collection-and-use"
          className="mt-8 mb-2 text-2xl font-bold"
        >
          Information Collection and Use
        </h2>

        <h3 id="information-we-collect" className="my-2 text-xl font-bold">
          Information We Collect
        </h3>
        <p>When you use the App, we only collect the following information:</p>
        <ul>
          <li>
            <strong>Music App Notifications</strong>: We access and read your
            music app notifications to collect the track information (e.g.,
            title, artist, and album) to submit to our backend server to
            generate recommendations for the next track.
          </li>
        </ul>

        <h3 id="how-we-use-your-information" className="my-2 text-xl font-bold">
          How We Use Your Information
        </h3>
        <p>We use the collected information for the following purposes:</p>
        <ul>
          <li>
            <strong>Generating Track Recommendations</strong>: We use the track
            information from your music app notifications to generate
            personalized recommendations for your next track.
          </li>
        </ul>

        <h3 id="information-storage" className="my-2 text-xl font-bold">
          Information Storage
        </h3>
        <ul>
          <li>
            <strong>Backend Server</strong>: We do not store any of your data on
            our backend server. Once the track recommendation is generated, the
            track information we collected from your music app notifications
            will be discarded and not saved on our server.
          </li>
          <li>
            <strong>Local Storage</strong>: Your playback history, which
            includes the track information collected from your music app
            notifications, will only be stored locally on your device. We do not
            access or store this information on our backend server.
          </li>
        </ul>

        <h2 id="security" className="mt-8 mb-2 text-2xl font-bold">
          Security
        </h2>
        <p>
          We take the security of your information very seriously. While no
          method of data transmission or storage is 100% secure, we implement
          reasonable technical and organizational measures to protect your
          information from unauthorized access, use, or disclosure.
        </p>

        <h2 id="children-s-privacy" className="mt-8 mb-2 text-2xl font-bold">
          Children&#39;s Privacy
        </h2>
        <p>
          Our App is not intended for use by children under the age of 13. We do
          not knowingly collect personal information from children under 13. If
          we become aware that a child under 13 has provided us with personal
          information, we will take steps to delete such information from our
          systems.
        </p>

        <h2
          id="changes-to-this-privacy-policy"
          className="mt-8 mb-2 text-2xl font-bold"
        >
          Changes to This Privacy Policy
        </h2>
        <p>
          We may update our Privacy Policy from time to time. We will notify you
          of any changes by posting the new Privacy Policy on this page. You are
          advised to review this Privacy Policy periodically for any changes.
          Changes to this Privacy Policy are effective when they are posted on
          this page.
        </p>

        <h2 id="contact-us" className="mt-8 mb-2 text-2xl font-bold">
          Contact Us
        </h2>
        <p>
          If you have any questions or concerns about our Privacy Policy or your
          data privacy, please contact us at:
        </p>
        <p>
          Email:
          <a href="mailto:themaninpaper@gmail.com" className="ml-2 underline">
            themaninpaper@gmail.com
          </a>
        </p>
      </div>
    </div>
  );
}
