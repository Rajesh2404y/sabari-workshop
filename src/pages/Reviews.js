import React from "react";
import { ReviewForm, ReviewsList } from "../components/Reviews";

export default function ReviewsPage() {
  return (
    <div className="bg-white">
      {/* Header */}
      <div className="bg-[#0f0f0f] py-16 text-center">
        <p className="mb-2 text-xs font-semibold uppercase tracking-[0.2em] text-[#ff3b3b]">
          Testimonials
        </p>
        <h1 className="mb-3 text-4xl font-extrabold text-white">Customer Reviews</h1>
        <p className="mx-auto max-w-sm text-sm text-gray-400">
          Real feedback from our customers. Share your experience too!
        </p>
      </div>

      {/* Submit form */}
      <section className="bg-gray-50 py-14">
        <div className="mx-auto max-w-lg px-4 sm:px-6">
          <div className="rounded-2xl border border-gray-100 bg-white p-6 shadow-sm sm:p-8">
            <h2 className="mb-1 text-xl font-bold text-[#0f0f0f]">Write a Review</h2>
            <p className="mb-6 text-sm text-gray-500">
              Visited Sabari Auto Workshop? Tell others about your experience.
            </p>
            <ReviewForm />
          </div>
        </div>
      </section>

      {/* All reviews */}
      <section className="bg-white py-14">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <h2 className="mb-10 text-center text-3xl font-bold text-[#0f0f0f]">
            All Reviews
          </h2>
          <ReviewsList maxItems={12} />
        </div>
      </section>
    </div>
  );
}
