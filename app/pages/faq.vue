<template>
  <main class="container mx-auto px-4 py-8">
    <section class="mb-12 text-center">
      <h1 class="text-4xl md:text-5xl font-bold text-gray-800 mb-4">Welcome to Smart Commerce</h1>
      <p class="text-lg text-gray-600 max-w-2xl mx-auto">
        Discover quality products, unbeatable prices, and a seamless shopping experience tailored
        just for you.
      </p>
    </section>

    <section class="mb-12">
      <h2 class="text-2xl font-semibold text-gray-700 mb-4">Why shop with us?</h2>
      <ul
        class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 list-disc list-inside text-gray-600"
      >
        <li>Free shipping on orders over $50</li>
        <li>30-day hassle-free returns</li>
        <li>Secure payments & buyer protection</li>
        <li>24/7 customer support</li>
        <li>Exclusive member discounts</li>
        <li>Fast delivery worldwide</li>
      </ul>
    </section>

    <section class="mb-12">
      <h2 class="text-2xl font-semibold text-gray-700 mb-4">Featured Categories</h2>
      <div class="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div class="bg-gray-100 rounded-lg p-4 text-center hover:shadow-md transition">
          <p class="font-medium">Electronics</p>
        </div>
        <div class="bg-gray-100 rounded-lg p-4 text-center hover:shadow-md transition">
          <p class="font-medium">Fashion</p>
        </div>
        <div class="bg-gray-100 rounded-lg p-4 text-center hover:shadow-md transition">
          <p class="font-medium">Home & Garden</p>
        </div>
        <div class="bg-gray-100 rounded-lg p-4 text-center hover:shadow-md transition">
          <p class="font-medium">Toys & Hobbies</p>
        </div>
      </div>
    </section>

    <section>
      <h2 class="text-2xl font-semibold text-gray-700 mb-4">FAQ</h2>
      <div class="space-y-4">
        <FaqBlock
          v-for="item in faqItems"
          :key="item.question"
          :question="item.question"
          :answer="item.answer"
        />
      </div>
    </section>
  </main>
</template>

<script setup lang="ts">
import FaqBlock from '~/components/FaqBlock.vue'

const faqItems = [
  {
    question: 'Delivery',
    answer:
      'We deliver nationwide. Delivery times depend on your region and usually range from 2 to 5 business days. You can track your order using the tracking number we will send you via SMS and email after shipment.'
  },
  {
    question: 'Cashback & Promo Codes',
    answer:
      'Cashback is 5% of the purchase amount and can be used to pay for future orders. Promo codes give up to 20% discount — subscribe to our newsletter to receive the latest codes.'
  },
  {
    question: 'About Us',
    answer:
      'We are a young team of enthusiasts who created Smart Commerce to make shopping convenient, fast, and profitable. Our mission is to offer only quality products at fair prices with excellent service.'
  },
  {
    question: 'Order Process',
    answer:
      'To place an order, add items to your cart, go to the checkout page, fill in your contact details, and choose a convenient delivery and payment method. After order confirmation, we will start processing it.'
  },
  {
    question: 'Payment',
    answer:
      'We accept payments via bank cards (Visa, MasterCard, MIR), e-wallets, as well as cash on delivery. All transactions are secured with modern encryption protocols.'
  },
  {
    question: 'Suppliers',
    answer:
      'We work only with verified suppliers who have passed a strict selection process. If you want to become our partner, please fill out the form on the "Partnership" page and we will get in touch with you.'
  }
]
</script>
