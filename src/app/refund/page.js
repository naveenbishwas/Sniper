// app/refund/page.jsx
"use client";
import Footer from "../components/footer/page";
import Header from "../components/header/page";
import "./refund.css";

export default function RefundPolicyPage() {
  return (
    <>
      <Header />
      <div className="refund-container">
        <h1>Refund Policy - September 2024</h1>
        <h2>HubHawks’ Refund Policy for Customers and Sellers</h2>

        <section>
          <h3>Customer Returns</h3>
          <ul>
            <li>
              Books can be returned within 10 days of delivery for a full
              refund.
            </li>
            <li>
              The item must be in its original condition, including the outer
              box, user manual, warranty cards, and invoice.
            </li>
            <li>
              Damaged, defective, or missing books are eligible for return.
            </li>
            <li>
              HubHawks may make exceptions and accept returns after the 10-day
              limit.
            </li>
            <li>
              For damaged or defective books, HubHawks will issue a refund if
              the item cant be replaced.
            </li>
            <li>
              Customised boxes cant be returned, but they can be refunded or
              replaced within 30 days if they are damaged, defective, or
              different from the ordered product.
            </li>
          </ul>
        </section>
      </div>
      <Footer />
    </>
  );
}
