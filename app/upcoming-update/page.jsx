import React from 'react'

const page = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-blue-600 text-white p-6">
      <div className="max-w-2xl text-center space-y-6">
        <h1 className="text-3xl font-bold">🚀 Upcoming Updates</h1>
        <p className="text-lg">
          We are excited to introduce new features to enhance your experience!
        </p>
        <div className="bg-white text-blue-900 p-6 rounded-2xl shadow-lg space-y-4">
          <h2 className="text-xl font-semibold">🔊 Speechly Integration</h2>
          <p>
            Soon, you can generate prompts <strong>hands-free</strong> using <strong>Speechly AI</strong>. Just speak, and let our platform do the rest!
          </p>
        </div>
        <div className="bg-white text-blue-900 p-6 rounded-2xl shadow-lg space-y-4">
          <h2 className="text-xl font-semibold">💳 Razorpay Payment System</h2>
          <p>
            Enjoy <strong>5 free usages</strong>, and after that, securely process payments using <strong>Razorpay</strong> to continue accessing premium features.
          </p>
        </div>
        <p className="text-sm mt-6">Stay tuned for these exciting updates!</p>
      </div>
    </div>
  )
}

export default page
