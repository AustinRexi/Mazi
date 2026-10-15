const contact =
  "Questions, complaints, or requests may be sent to Support@maziinternational.com. Include your order number when the request concerns an order.";

export const policyPages = {
  "terms-and-conditions": {
    title: "Terms and Conditions",
    summary:
      "These terms govern the Mazi marketplace, where customers order food and groceries from independent vendors and deliveries are completed by couriers.",
    introduction:
      "Mazi International (Pty) Ltd operates a multi-vendor ordering and delivery platform. By creating an account, accessing the Platform, or placing an order, you agree to these Terms and Conditions.",
    sections: [
      {
        id: "marketplace",
        title: "1. Marketplace Role",
        paragraphs: [
          "Independent restaurants, food businesses, and grocery stores (Vendors) list, sell, prepare, or package products on Mazi. Independent delivery partners (Couriers) may collect and deliver accepted orders. Unless an item is expressly identified as sold by Mazi, the relevant Vendor is the seller of that item.",
          "Mazi provides the technology, ordering, payment collection, customer support, and delivery-coordination services that connect customers, Vendors, and Couriers.",
        ],
      },
      {
        id: "accounts",
        title: "2. Accounts and Acceptable Use",
        paragraphs: [
          "Users must provide accurate information, keep account credentials secure, and use the Platform only for lawful purposes. Fraudulent orders, payment abuse, threatening conduct, unauthorised access, and interference with the Platform are prohibited.",
        ],
      },
      {
        id: "products",
        title: "3. Products and Availability",
        paragraphs: [
          "Vendors are responsible for their menus, descriptions, pricing, stock, ingredients, preparation, packaging, and required licences. Images may be illustrative. All items remain subject to Vendor acceptance and availability after checkout.",
          "Customers with allergies, intolerances, or dietary requirements should contact the Vendor before ordering. Mazi cannot guarantee that products are free from allergens or cross-contamination.",
        ],
      },
      {
        id: "orders",
        title: "4. Orders",
        paragraphs: [
          "An order is an offer to purchase the selected items. It is confirmed when payment is authorised and the Vendor accepts it. Mazi or a Vendor may reject or cancel an order if an item is unavailable, payment cannot be confirmed, delivery is not reasonably possible, or fraud or misuse is suspected.",
        ],
      },
      {
        id: "payments",
        title: "5. Prices, PayFast, and Partner Withdrawals",
        paragraphs: [
          "The checkout total may include the product subtotal, delivery fee, service fee, applicable taxes, and any other charge disclosed before confirmation. Buyers pay for food and grocery orders through PayFast, which processes the payment for Mazi.",
          "Mazi records the portions of eligible orders attributable to Vendors and Couriers in their Platform wallets. Vendors and Couriers receive available balances by submitting withdrawal requests, subject to verification, adjustments, and processing requirements.",
        ],
      },
      {
        id: "delivery",
        title: "6. Delivery",
        paragraphs: [
          "Delivery times are estimates and may change because of preparation, traffic, weather, demand, address access, or safety conditions. Customers must provide an accurate address and reachable telephone number and be available to receive the order.",
        ],
      },
      {
        id: "refunds",
        title: "7. Cancellations and Refunds",
        paragraphs: [
          "Cancellation eligibility depends on the order status because food and other perishable items may be prepared specifically for the customer. Refunds and cancellations are governed by the separate Refund Policy and Cancellation Policy published on the Platform.",
        ],
      },
      {
        id: "liability",
        title: "8. Liability and Third Parties",
        paragraphs: [
          "To the extent permitted by law, Mazi is not liable for indirect or consequential loss or for failure caused by circumstances reasonably beyond its control. Nothing in these terms limits a right or remedy that cannot lawfully be limited under South African law.",
        ],
      },
      {
        id: "changes-contact",
        title: "9. Changes and Contact",
        paragraphs: [
          "Mazi may update these terms when its services or legal obligations change. The version displayed on the Platform applies from its stated effective date.",
          contact,
        ],
      },
    ],
  },

  "refund-policy": {
    title: "Refund Policy",
    summary:
      "Eligible refunds are returned through the original PayFast payment method after Mazi reviews the order with the Vendor and, where relevant, the Courier.",
    introduction:
      "This policy explains when Mazi customers may qualify for full or partial refunds for food and grocery orders placed through the Platform.",
    sections: [
      {
        id: "eligibility",
        title: "1. Refund Eligibility",
        paragraphs: ["A full or partial refund may be approved where:"],
        bullets: [
          "The Vendor rejects the order or a paid item is unavailable.",
          "The order is not delivered and the failure was not caused by the customer.",
          "An item is missing, materially incorrect, damaged, spoiled, or unsafe when delivered.",
          "The customer was charged more than once for the same order.",
          "Mazi approves a cancellation under the Cancellation Policy.",
        ],
      },
      {
        id: "exclusions",
        title: "2. When a Refund May Be Declined",
        paragraphs: [
          "A refund may be declined if the order was correctly prepared and delivered; the issue is personal taste rather than a defect or listing error; the customer supplied an incorrect address or could not be reached; reasonably requested evidence is not provided; or the request appears fraudulent or abusive.",
        ],
      },
      {
        id: "request",
        title: "3. Requesting a Refund",
        paragraphs: [
          "Contact Mazi as soon as possible with the order number, a description of the problem, and photographs or other evidence where relevant. Complaints about perishable products should normally be submitted within 24 hours of delivery so they can be properly investigated.",
        ],
      },
      {
        id: "review",
        title: "4. Review Process",
        paragraphs: [
          "Mazi may review Platform records and contact the Vendor, Courier, customer, or PayFast. An approval may cover the full order or only the affected item, delivery fee, or other relevant charge.",
        ],
      },
      {
        id: "method",
        title: "5. Refund Method and Timing",
        paragraphs: [
          "Approved electronic-payment refunds are submitted through PayFast to the original payment method. Mazi aims to submit an approved refund within 7 business days. The customer’s bank or payment provider may require additional time before the credit appears.",
          "Mazi does not issue cash refunds, pay refunds into unrelated accounts, or refund more than the amount originally paid.",
        ],
      },
      { id: "contact", title: "6. Contact", paragraphs: [contact] },
    ],
  },

  "shipping-policy": {
    title: "Shipping Policy",
    summary:
      "Mazi provides on-demand local delivery of food and groceries and does not currently offer conventional postal, parcel, or international shipping.",
    introduction:
      "Products ordered through Mazi are prepared or packaged by local Vendors and delivered by Couriers to the address selected at checkout.",
    sections: [
      {
        id: "scope",
        title: "1. No Conventional Shipping",
        paragraphs: [
          "Mazi orders are not sent through postal or parcel-shipping networks unless expressly stated for a particular item. This Shipping Policy clarifies that normal fulfilment is local, on-demand delivery.",
        ],
      },
      {
        id: "areas",
        title: "2. Service Areas",
        paragraphs: [
          "Availability depends on the customer’s address, Vendor delivery range and operating hours, and Courier availability. The Platform indicates whether an address can currently be served.",
        ],
      },
      {
        id: "fees",
        title: "3. Delivery Charges and Estimates",
        paragraphs: [
          "The delivery charge and estimated time are shown at checkout before payment. Charges may vary based on distance, demand, order requirements, and other operational factors.",
        ],
      },
      {
        id: "delivery-terms",
        title: "4. Delivery Terms",
        paragraphs: [
          "Order collection, handover, delays, failed delivery, and proof of delivery are governed by the Delivery Policy published on the Platform.",
          contact,
        ],
      },
    ],
  },

  "delivery-policy": {
    title: "Delivery Policy",
    summary:
      "After PayFast confirms payment and a Vendor accepts an order, the Vendor prepares or packages it and a Courier delivers it to the customer’s checkout address.",
    introduction:
      "Mazi coordinates local fulfilment between the customer, the selected Vendor, and an available Courier. This policy explains the process and each participant’s responsibilities.",
    sections: [
      {
        id: "process",
        title: "1. How Fulfilment Works",
        steps: [
          "The customer selects products, provides a delivery address, and pays through PayFast.",
          "The Vendor accepts the order and prepares or packages the products.",
          "An available Courier is assigned and collects the completed order.",
          "The Courier transports the order to the customer’s stated address.",
          "The Platform records order progress and completion.",
        ],
      },
      {
        id: "times",
        title: "2. Delivery Times",
        paragraphs: [
          "Times shown in the Platform are estimates, not guarantees. Preparation, traffic, weather, high demand, Vendor delays, Courier availability, safety restrictions, and address access may affect the actual time.",
        ],
      },
      {
        id: "customer",
        title: "3. Customer Responsibilities",
        paragraphs: [
          "Customers must provide a complete and accurate address, necessary access instructions, and a working telephone number. The customer or an authorised recipient must be available to receive the order and should check it promptly.",
        ],
      },
      {
        id: "handover",
        title: "4. Handover and Proof of Delivery",
        paragraphs: [
          "A delivery may require a one-time code, signature, in-app confirmation, photograph, or other reasonable proof. If a customer requests contactless delivery or asks that an order be left in a specific place, responsibility passes to the customer once it is left according to those instructions.",
        ],
      },
      {
        id: "failed",
        title: "5. Failed Delivery",
        paragraphs: [
          "If a Courier cannot locate or contact the customer, the Courier may wait for a reasonable time and attempt contact. If delivery fails because of an incorrect address, unavailable access, or inability to reach the customer, the order may be completed or cancelled without a refund for perishable items and costs already incurred.",
        ],
      },
      {
        id: "withdrawals",
        title: "6. Vendor and Courier Withdrawals",
        paragraphs: [
          "Mazi records eligible Vendor and Courier earnings in their respective Platform wallets. Vendors and Couriers receive those balances by submitting withdrawal requests, subject to account verification, review, available funds, and processing requirements.",
        ],
      },
      { id: "support", title: "7. Delivery Support", paragraphs: [contact] },
    ],
  },

  "cancellation-policy": {
    title: "Cancellation Policy",
    summary:
      "Because many products are perishable or prepared to order, cancellation eligibility depends on whether the Vendor has accepted or begun preparing the order.",
    introduction:
      "Customers should request cancellation as quickly as possible. A request is not confirmed until the Platform or Mazi support team confirms that the order has been cancelled.",
    sections: [
      {
        id: "customer",
        title: "1. Customer Cancellations",
        paragraphs: [
          "A full refund is normally available if cancellation is accepted before the Vendor accepts or begins preparing or packaging the order.",
          "Once preparation has started, a Courier has been assigned, or the order has been collected, cancellation may be refused or only partially refunded because the Vendor, Courier, or Mazi may already have incurred costs.",
        ],
      },
      {
        id: "changes",
        title: "2. Changes to an Order",
        paragraphs: [
          "Items, quantities, and delivery addresses cannot always be changed after confirmation. Contact support immediately. If the change cannot safely be made, the customer may need to cancel, if eligible, and place a new order.",
        ],
      },
      {
        id: "platform",
        title: "3. Vendor or Mazi Cancellations",
        paragraphs: [
          "A Vendor or Mazi may cancel an order if products are unavailable, the Vendor cannot fulfil it, no Courier can reasonably complete delivery, the address is outside the service area, payment is not confirmed, there is a safety concern, or fraud or misuse is suspected.",
          "If a paid order is cancelled for reasons not caused by the customer, the affected amount is eligible for review under the Refund Policy.",
        ],
      },
      {
        id: "failed-delivery",
        title: "4. Failed Delivery",
        paragraphs: [
          "An order may be treated as cancelled or completed without refund if delivery fails because the customer provided an incorrect address, did not provide reasonable access, or could not be reached after reasonable attempts.",
        ],
      },
      {
        id: "request",
        title: "5. Requesting Cancellation",
        paragraphs: [
          "Use the cancellation option shown for the order, where available, or contact Mazi support with the order number. The Platform’s order status and operational records will be used to assess eligibility.",
          contact,
        ],
      },
    ],
  },
};
