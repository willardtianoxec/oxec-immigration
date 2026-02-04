import { Link } from 'wouter';
import { ArrowLeft } from 'lucide-react';

export default function TermOfUse() {
  return (
    <div className="min-h-screen flex flex-col bg-background">
      {/* Navigation Bar */}
      <nav className="sticky top-0 z-50 bg-white border-b border-border shadow-sm py-4">
        <div className="container flex items-center justify-between">
          <Link href="/">
            <div className="flex items-center gap-2 cursor-pointer hover:opacity-80 transition">
              <ArrowLeft className="w-5 h-5" />
              <span>返回主页</span>
            </div>
          </Link>
          <h1 className="text-xl font-bold">Term of Use</h1>
          <div className="w-20"></div>
        </div>
      </nav>

      {/* Main Content */}
      <main className="flex-1 container mx-auto px-4 py-12 max-w-4xl">
        <article className="prose prose-lg max-w-none">
          <h1>Term of Use</h1>

          <section className="my-8">
            <h2>SECTION 1 – WHAT DO WE DO WITH YOUR INFORMATION?</h2>
            <p>
              When you use our services, as part of the service process, we collect the personal information you give us such as your name, address and email address.
            </p>
            <p>
              When you browse our website, we also automatically receive your computer's internet protocol (IP) address in order to provide us with information that helps us learn about your browser and operating system.
            </p>
            <p>
              Email communication (if applicable): With your permission, we may send you emails about our services, updates and other information.
            </p>
          </section>

          <section className="my-8">
            <h2>SECTION 2 – CONSENT</h2>
            <h3>How do you get my consent?</h3>
            <p>
              When you provide us with personal information to complete a transaction, verify your information, place a request, arrange for a consultation or use our services, we imply that you consent to our collecting it and using it for that specific reason only.
            </p>
            <p>
              If we ask for your personal information for a secondary reason, like marketing, we will either ask you directly for your expressed consent, or provide you with an opportunity to say no.
            </p>
            <h3>How do I withdraw my consent?</h3>
            <p>
              If after you opt-in, you change your mind, you may withdraw your consent for us to contact you, for the continued collection, use or disclosure of your information, at anytime, by contacting us at business@oxecimm.com or mailing us at: OXEC Immigration, 4710 Kingsway, Metrotower 1, Burnaby, BC V5H 4M2, Canada.
            </p>
          </section>

          <section className="my-8">
            <h2>SECTION 3 – DISCLOSURE</h2>
            <p>
              We may disclose your personal information if we are required by law to do so or if you violate our Terms of Service.
            </p>
          </section>

          <section className="my-8">
            <h2>SECTION 4 – OXEC IMMIGRATION DATA MANAGEMENT</h2>
            <p>
              Our website is hosted on secure cloud-based infrastructure. We provide you with the online platform that allows us to deliver our services to you.
            </p>
            <p>
              Your data is stored through secure data storage systems and databases. We store your data on a secure server behind a firewall.
            </p>
            <h3>Payment Processing:</h3>
            <p>
              If you choose a direct payment gateway to complete your payment, payment processors store your credit card data. It is encrypted through the Payment Card Industry Data Security Standard (PCI-DSS). Your payment transaction data is stored only as long as is necessary to complete your transaction. After that is complete, your payment transaction information is deleted.
            </p>
            <p>
              All direct payment gateways adhere to the standards set by PCI-DSS as managed by the PCI Security Standards Council, which is a joint effort of brands like Visa, MasterCard, American Express and Discover.
            </p>
            <p>
              PCI-DSS requirements help ensure the secure handling of credit card information by our organization and its service providers.
            </p>
          </section>

          <section className="my-8">
            <h2>SECTION 5 – THIRD-PARTY SERVICES</h2>
            <p>
              In general, the third-party providers used by us will only collect, use and disclose your information to the extent necessary to allow them to perform the services they provide to us.
            </p>
            <p>
              However, certain third-party service providers, such as payment gateways and other payment transaction processors, have their own privacy policies in respect to the information we are required to provide to them for your transaction-related activities.
            </p>
            <p>
              For these providers, we recommend that you read their privacy policies so you can understand the manner in which your personal information will be handled by these providers.
            </p>
            <p>
              In particular, remember that certain providers may be located in or have facilities that are located in a different jurisdiction than either you or us. So if you elect to proceed with a transaction that involves the services of a third-party service provider, then your information may become subject to the laws of the jurisdiction(s) in which that service provider or its facilities are located.
            </p>
            <p>
              Once you leave our website or are redirected to a third-party website or application, you are no longer governed by this Term of Use or our website's Terms of Service.
            </p>
            <h3>Links</h3>
            <p>
              When you click on links on our website, they may direct you away from our site. We are not responsible for the privacy practices of other sites and encourage you to read their privacy statements.
            </p>
          </section>

          <section className="my-8">
            <h2>SECTION 6 – SECURITY</h2>
            <p>
              To protect your personal information, we take reasonable precautions and follow industry best practices to make sure it is not inappropriately lost, misused, accessed, disclosed, altered or destroyed.
            </p>
            <p>
              If you provide us with your credit card information, the information is encrypted using secure socket layer technology (SSL) and stored with AES-256 encryption. Although no method of transmission over the Internet or electronic storage is 100% secure, we follow all PCI-DSS requirements and implement additional generally accepted industry standards.
            </p>
          </section>

          <section className="my-8">
            <h2>SECTION 7 – COOKIES</h2>
            <p>
              Here is a list of cookies that we use. We've listed them here so you can choose if you want to opt-out of cookies or not.
            </p>
            <ul>
              <li><strong>_session_id</strong>: Unique token, sessional. Allows OXEC Immigration to store information about your session (referrer, landing page, etc).</li>
              <li><strong>_visit</strong>: No data held, persistent for 30 minutes from the last visit. Used by our website provider's internal stats tracker to record the number of visits.</li>
              <li><strong>_uniq</strong>: No data held, expires midnight (relative to the visitor) of the next day. Counts the number of visits to our site by a single customer.</li>
              <li><strong>cart</strong>: Unique token, persistent for 2 weeks. Stores information about the contents of your cart.</li>
              <li><strong>_secure_session_id</strong>: Unique token, sessional.</li>
              <li><strong>storefront_digest</strong>: Unique token, indefinite. If the site has a password, this is used to determine if the current visitor has access.</li>
            </ul>
          </section>

          <section className="my-8">
            <h2>SECTION 8 – AGE OF CONSENT</h2>
            <p>
              By using this site, you represent that you are at least the age of majority in your state or province of residence, or that you are the age of majority in your state or province of residence and you have given us your consent to allow any of your minor dependents to use this site.
            </p>
          </section>

          <section className="my-8">
            <h2>SECTION 9 – CHANGES TO THIS TERM OF USE</h2>
            <p>
              We reserve the right to modify this term of use at any time, so please review it frequently. Changes and clarifications will take effect immediately upon their posting on the website. If we make material changes to this policy, we will notify you here that it has been updated, so that you are aware of what information we collect, how we use it, and under what circumstances, if any, we use and/or disclose it.
            </p>
            <p>
              If our organization is acquired or merged with another company, your information may be transferred to the new owners so that we may continue to provide services to you.
            </p>
          </section>

          <section className="my-8">
            <h2>QUESTIONS AND CONTACT INFORMATION</h2>
            <p>
              If you would like to: access, correct, amend or delete any personal information we have about you, register a complaint, or simply want more information contact us at:
            </p>
            <p>
              Email: <a href="mailto:business@oxecimm.com" className="text-blue-600 hover:underline">business@oxecimm.com</a>
            </p>
            <p>
              Address: 4710 Kingsway, Metrotower 1, Burnaby, BC V5H 4M2, Canada
            </p>
            <p>
              Phone: +1 (236) 521-5115
            </p>
          </section>

          <section className="my-8">
            <h2>DISCLAIMER</h2>
            <p>
              The information on these pages is for general use only and should not be relied upon as legal advice. It does not establish a lawyer-client relationship.
            </p>
            <p>
              No information from this website, emails, or other correspondence from OXEC Immigration except professional legal advice given during a formal consultation or a retainer agreement constitutes legal advice. OXEC Immigration disclaims any liability from reliance on such information.
            </p>
            <p>
              OXEC Immigration highly recommends consulting with a competent lawyer before acting on any information from this website.
            </p>
          </section>

          <section className="my-8">
            <h2>ACKNOWLEDGEMENT</h2>
            <p>
              OXEC Immigration is located in the heart of Burnaby, in a secure, private office designed to ensure client privacy and confidentiality.
            </p>
            <p>
              We have the capacity and technology to assist clients all over Canada and the world utilizing secure cloud-based solutions.
            </p>
            <p>
              We acknowledge that our main physical and virtual offices are located on the traditional, ancestral, unceded, and stolen territories of the Coast Salish peoples of the Musqueam, Squamish, Tsleil-Waututh, and Qayqayt Nations.
            </p>
          </section>
        </article>
      </main>
    </div>
  );
}
