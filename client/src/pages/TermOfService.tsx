import { Link } from 'wouter';
import { ArrowLeft } from 'lucide-react';

export default function TermOfService() {
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
          <h1 className="text-xl font-bold">Term of Service</h1>
          <div className="w-20"></div>
        </div>
      </nav>

      {/* Main Content */}
      <main className="flex-1 container mx-auto px-4 py-12 max-w-4xl">
        <article className="prose prose-lg max-w-none">
          <h1>Term of Service</h1>

          <section className="my-8">
            <h2>OVERVIEW</h2>
            <p>
              This website is operated by OXEC Immigration. Throughout the site, the terms "we", "us" and "our" refer to OXEC Immigration. OXEC Immigration offers this website, including all information, tools and services available from this site to you, the user, conditioned upon your acceptance of all terms, conditions, policies and notices stated here.
            </p>
            <p>
              By visiting our site and/or purchasing something from us, you engage in our "Service" and agree to be bound by the following terms and conditions ("Terms of Service", "Terms"), including those additional terms and conditions and policies referenced herein and/or available by hyperlink. These Terms of Service apply to all users of the site, including without limitation users who are browsers, vendors, customers, merchants, and/or contributors of content.
            </p>
            <p>
              Please read these Terms of Service carefully before accessing or using our website. By accessing or using any part of the site, you agree to be bound by these Terms of Service. If you do not agree to all the terms and conditions of this agreement, then you may not access the website or use any services.
            </p>
            <p>
              Any new features or tools which are added to the current site shall also be subject to the Terms of Service. You can review the most current version of the Terms of Service at any time on this page. We reserve the right to update, change or replace any part of these Terms of Service by posting updates and/or changes to our website. It is your responsibility to check this page periodically for changes. Your continued use of or access to the website following the posting of any changes constitutes acceptance of those changes.
            </p>
          </section>

          <section className="my-8">
            <h2>SECTION 1 – ONLINE SERVICES TERMS</h2>
            <p>
              By agreeing to these Terms of Service, you represent that you are at least the age of majority in your state or province of residence, or that you are the age of majority in your state or province of residence and you have given us your consent to allow any of your minor dependents to use this site.
            </p>
            <p>
              You may not use our services for any illegal or unauthorized purpose nor may you, in the use of the Service, violate any laws in your jurisdiction (including but not limited to copyright laws).
            </p>
            <p>
              You must not transmit any worms or viruses or any code of a destructive nature.
            </p>
            <p>
              A breach or violation of any of the Terms will result in an immediate termination of your Services.
            </p>
          </section>

          <section className="my-8">
            <h2>SECTION 2 – GENERAL CONDITIONS</h2>
            <p>
              We reserve the right to refuse service to anyone for any reason at any time.
            </p>
            <p>
              You understand that your content (not including personal information), may be transferred unencrypted and involve (a) transmissions over various networks; and (b) changes to conform and adapt to technical requirements of connecting networks or devices.
            </p>
            <p>
              You agree not to reproduce, duplicate, copy, sell, resell or exploit any portion of the Service, use of the Service, or access to the Service or any contact on the website through which the service is provided, without express written permission by us.
            </p>
            <p>
              The headings used in this agreement are included for convenience only and will not limit or otherwise affect these Terms.
            </p>
          </section>

          <section className="my-8">
            <h2>SECTION 3 – ACCURACY, COMPLETENESS AND TIMELINESS OF INFORMATION</h2>
            <p>
              We are not responsible if information made available on this site is not accurate, complete or current. The material on this site is provided for general information only and should not be relied upon or used as the sole basis for making decisions without consulting primary, more accurate, more complete or more timely sources of information. Any reliance on the material on this site is at your own risk.
            </p>
            <p>
              This site may contain certain historical information. Historical information, necessarily, is not current and is provided for your reference only. We reserve the right to modify the contents of this site at any time, but we have no obligation to update any information on our site. You agree that it is your responsibility to monitor changes to our site.
            </p>
          </section>

          <section className="my-8">
            <h2>SECTION 4 – MODIFICATIONS TO THE SERVICE AND PRICES</h2>
            <p>
              Prices for our services are subject to change without notice.
            </p>
            <p>
              We reserve the right at any time to modify or discontinue the Service (or any part or content thereof) without notice at any time.
            </p>
            <p>
              We shall not be liable to you or to any third-party for any modification, price change, suspension or discontinuance of the Service.
            </p>
          </section>

          <section className="my-8">
            <h2>SECTION 5 – SERVICES</h2>
            <p>
              Certain services may be available exclusively online through the website. These services may have limited availability and are subject to our Service Agreement terms.
            </p>
            <p>
              We reserve the right, but are not obligated, to limit the provision of our services to any person, geographic region or jurisdiction. We may exercise this right on a case-by-case basis. All descriptions of services or service pricing are subject to change at anytime without notice, at the sole discretion of us. We reserve the right to discontinue any service at any time.
            </p>
            <p>
              We do not warrant that the quality of any services, information, or other material provided by you will meet your expectations, or that any errors in the Service will be corrected.
            </p>
          </section>

          <section className="my-8">
            <h2>SECTION 6 – ACCURACY OF ACCOUNT INFORMATION</h2>
            <p>
              We reserve the right to refuse any request you place with us. We may, in our sole discretion, limit or cancel services provided per person, per household or per request.
            </p>
            <p>
              You agree to provide current, complete and accurate information for all services requested through our site. You agree to promptly update your account and other information, including your email address and contact details, so that we can complete your transactions and contact you as needed.
            </p>
          </section>

          <section className="my-8">
            <h2>SECTION 7 – THIRD-PARTY LINKS</h2>
            <p>
              Certain content and services available via our Service may include materials from third-parties.
            </p>
            <p>
              Third-party links on this site may direct you to third-party websites that are not affiliated with us. We are not responsible for examining or evaluating the content or accuracy and we do not warrant and will not have any liability or responsibility for any third-party materials or websites, or for any other materials, products, or services of third-parties.
            </p>
            <p>
              We are not liable for any harm or damages related to the purchase or use of goods, services, resources, content, or any other transactions made in connection with any third-party websites. Please review carefully the third-party's policies and practices and make sure you understand them before you engage in any transaction.
            </p>
          </section>

          <section className="my-8">
            <h2>SECTION 8 – USER COMMENTS, FEEDBACK AND OTHER SUBMISSIONS</h2>
            <p>
              If, at our request, you send certain specific submissions or without a request from us you send creative ideas, suggestions, proposals, plans, or other materials, whether online, by email, by postal mail, or otherwise (collectively, 'comments'), you agree that we may, at any time, without restriction, edit, copy, publish, distribute, translate and otherwise use in any medium any comments that you forward to us. We are and shall be under no obligation (1) to maintain any comments in confidence; (2) to pay compensation for any comments; or (3) to respond to any comments.
            </p>
            <p>
              We may, but have no obligation to, monitor, edit or remove content that we determine in our sole discretion are unlawful, offensive, threatening, libelous, defamatory, pornographic, obscene or otherwise objectionable or violates any party's intellectual property or these Terms of Service.
            </p>
            <p>
              You agree that your comments will not violate any right of any third-party, including copyright, trademark, privacy, personality or other personal or proprietary right. You further agree that your comments will not contain libelous or otherwise unlawful, abusive or obscene material, or contain any computer virus or other malware that could in any way affect the operation of the Service or any related website.
            </p>
          </section>

          <section className="my-8">
            <h2>SECTION 9 – PERSONAL INFORMATION</h2>
            <p>
              Your submission of personal information through the site is governed by our Privacy Policy.
            </p>
          </section>

          <section className="my-8">
            <h2>SECTION 10 – ERRORS, INACCURACIES AND OMISSIONS</h2>
            <p>
              Occasionally there may be information on our site or in the Service that contains typographical errors, inaccuracies or omissions that may relate to service descriptions, pricing, promotions, offers, or availability. We reserve the right to correct any errors, inaccuracies or omissions, and to change or update information without prior notice.
            </p>
            <p>
              We undertake no obligation to update, amend or clarify information in the Service or on any related website, including without limitation, pricing information, except as required by law.
            </p>
          </section>

          <section className="my-8">
            <h2>SECTION 11 – PROHIBITED USES</h2>
            <p>
              In addition to other prohibitions as set forth in the Terms of Service, you are prohibited from using the site or its content: (a) for any unlawful purpose; (b) to solicit others to perform or participate in any unlawful acts; (c) to violate any international, federal, provincial or state regulations, rules, laws, or local ordinances; (d) to infringe upon or violate our intellectual property rights or the intellectual property rights of others; (e) to harass, abuse, insult, harm, defame, slander, disparage, intimidate, or discriminate based on gender, sexual orientation, religion, ethnicity, race, age, national origin, or disability; (f) to submit false or misleading information; (g) to upload or transmit viruses or any other type of malicious code that will or may be used in any way that will affect the functionality or operation of the Service or of any related website; (h) to collect or track the personal information of others; (i) to spam, phish, or scrape; (j) for any obscene or immoral purpose; or (k) to interfere with or circumvent the security features of the Service or any related website.
            </p>
            <p>
              We reserve the right to terminate your use of the Service or any related website for violating any of the prohibited uses.
            </p>
          </section>

          <section className="my-8">
            <h2>SECTION 12 – DISCLAIMER OF WARRANTIES; LIMITATION OF LIABILITY</h2>
            <p>
              We do not guarantee, represent or warrant that your use of our service will be uninterrupted, timely, secure or error-free.
            </p>
            <p>
              We do not warrant that the results that may be obtained from the use of the service will be accurate or reliable.
            </p>
            <p>
              You agree that any content downloaded or otherwise obtained through the use of the service is downloaded at your own risk and that you will be solely responsible for any damage to your computer system or loss of data that results from the download of any such content.
            </p>
          </section>

          <section className="my-8">
            <h2>SECTION 13 – LIMITATION OF LIABILITY</h2>
            <p>
              In no case shall OXEC Immigration, our directors, officers, employees, affiliates, agents, contractors, interns, suppliers, service providers or licensors be liable for any injury, loss, claim, or any direct, indirect, incidental, punitive, special, or consequential damages of any kind, including, without limitation lost profits, lost revenue, lost savings, loss of data, replacement costs, or any similar damages, whether based in contract, tort (including negligence), strict liability or otherwise, arising from your use of any of the service or any products procured using the service, or for any other claim related in any way to your use of the service, even if OXEC Immigration has been advised of the possibility of such damages.
            </p>
          </section>

          <section className="my-8">
            <h2>SECTION 14 – INDEMNIFICATION</h2>
            <p>
              You agree to indemnify, defend and hold harmless OXEC Immigration and our parent, subsidiaries, affiliates, partners, officers, directors, agents, contractors, licensors, service providers, employees, and successors from any claim or demand, including reasonable attorneys' fees, made by any third-party due to or arising out of your breach of these Terms of Service or the documents they incorporate by reference, or your violation of any law or the rights of a third-party.
            </p>
          </section>

          <section className="my-8">
            <h2>SECTION 15 – SEVERABILITY</h2>
            <p>
              In the event that any provision of these Terms of Service is determined to be unlawful, void or unenforceable, such provision shall nonetheless be enforceable to the fullest extent permitted by applicable law, and the unenforceable provision shall be severed from these Terms of Service, such determination shall not affect the validity and enforceability of the other remaining provisions.
            </p>
          </section>

          <section className="my-8">
            <h2>SECTION 16 – TERMINATION</h2>
            <p>
              The obligations and liabilities of the parties incurred before the termination date shall survive the termination of this agreement for all due purposes.
            </p>
            <p>
              These Terms of Service are effective unless and until terminated by either you or us. You may terminate these Terms of Service at any time by notifying us that you no longer wish to use our Services, or when you cease using our site.
            </p>
            <p>
              If in our sole judgment you violate, or appear to be violating, any term or provision of these Terms of Service, or you are acting in manner which we believe to be inappropriate or unlawful, we also may terminate your use of our site and your right to access to our Services, without notice and without any liability to you.
            </p>
          </section>

          <section className="my-8">
            <h2>SECTION 17 – ENTIRE AGREEMENT</h2>
            <p>
              These Terms of Service and any policies or operating rules posted by us on this site or in respect to The Service constitutes the entire agreement and understanding between you and OXEC Immigration and govern your use of the Service, superseding any prior or contemporaneous agreements, communications and proposals, whether oral or written, between you and OXEC Immigration (including, but not limited to, any prior versions of the Terms of Service).
            </p>
            <p>
              Any ambiguity in the interpretation of these Terms of Service shall not be construed against the drafter.
            </p>
          </section>

          <section className="my-8">
            <h2>SECTION 18 – GOVERNING LAW</h2>
            <p>
              These Terms and Conditions and any separate agreements we provide to render the Service are governed by and construed in accordance with the laws of the Province of British Columbia, Canada, and you irrevocably submit to the exclusive jurisdiction of the courts in that location.
            </p>
          </section>

          <section className="my-8">
            <h2>SECTION 19 – CONTACT INFORMATION</h2>
            <p>
              If you have any questions about these Terms of Service, please contact us at:
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
        </article>
      </main>
    </div>
  );
}
