{
  /* --- TESTIMONIALS SECTION --- */
}
<div className="bg-slate-50 py-24" id="reviews">
  <div className="max-w-7xl mx-auto px-6 lg:px-8">
    <div className="text-center mb-16">
      <h2 className="text-red-600 font-bold tracking-widest uppercase text-sm mb-3">
        Student Success Stories
      </h2>
      <h3 className="text-3xl font-bold text-slate-900">
        What Our Students Say
      </h3>
      <div className="flex justify-center items-center gap-2 mt-4">
        <div className="flex text-yellow-500">
          <Star fill="currentColor" size={20} />
          <Star fill="currentColor" size={20} />
          <Star fill="currentColor" size={20} />
          <Star fill="currentColor" size={20} />
          <Star fill="currentColor" size={20} />
        </div>
        <span className="font-bold text-slate-700">4.9/5 Average Rating</span>
      </div>
    </div>

    <div className="grid md:grid-cols-3 gap-8">
      {/* Review 1 */}
      <div className="bg-white p-8 rounded-xl shadow-sm border border-slate-100 flex flex-col h-full">
        <div className="flex items-center gap-4 mb-4">
          <div className="h-12 w-12 bg-indigo-100 rounded-full flex items-center justify-center text-indigo-700 font-bold text-xl">
            S
          </div>
          <div>
            <h4 className="font-bold text-slate-900">Simran Kaur</h4>
            <p className="text-slate-500 text-xs">a month ago</p>
          </div>
          <div className="ml-auto text-yellow-500">
            <Star fill="currentColor" size={16} />
          </div>
        </div>
        <div className="flex text-yellow-500 mb-4 text-xs">
          <Star fill="currentColor" size={14} />
          <Star fill="currentColor" size={14} />
          <Star fill="currentColor" size={14} />
          <Star fill="currentColor" size={14} />
          <Star fill="currentColor" size={14} />
        </div>
        <p className="text-slate-600 text-sm leading-relaxed mb-6 flex-grow">
          "I am currently pursuing my studies at IELTS Coachingg India, and I am
          extremely grateful to be part of such a prestigious institution. The
          faculty members are highly knowledgeable, supportive, and genuinely
          committed to students’ growth."
        </p>

        {/* Owner Response */}
        <div className="bg-slate-50 p-4 rounded-lg border-l-4 border-red-500 mt-auto">
          <p className="text-xs font-bold text-slate-900 mb-1">
            Response from the owner
          </p>
          <p className="text-xs text-slate-600 leading-relaxed">
            We sincerely thank you for sharing such encouraging feedback with
            us. Your kind words mean a lot and reassure us that our efforts are
            making a meaningful difference.
          </p>
        </div>
      </div>

      {/* Review 2 */}
      <div className="bg-white p-8 rounded-xl shadow-sm border border-slate-100 flex flex-col h-full">
        <div className="flex items-center gap-4 mb-4">
          <div className="h-12 w-12 bg-green-100 rounded-full flex items-center justify-center text-green-700 font-bold text-xl">
            K
          </div>
          <div>
            <h4 className="font-bold text-slate-900">Kamal Kumar</h4>
            <p className="text-slate-500 text-xs">3 months ago</p>
          </div>
          <div className="ml-auto text-yellow-500">
            <Star fill="currentColor" size={16} />
          </div>
        </div>
        <div className="flex text-yellow-500 mb-4 text-xs">
          <Star fill="currentColor" size={14} />
          <Star fill="currentColor" size={14} />
          <Star fill="currentColor" size={14} />
          <Star fill="currentColor" size={14} />
          <Star fill="currentColor" size={14} />
        </div>
        <p className="text-slate-600 text-sm leading-relaxed mb-6 flex-grow">
          "I had an amazing experience with the Spoken English course here. The
          classes were super engaging and easy to follow. My trainer was really
          supportive and made learning fun — we did lots of speaking activities,
          role plays, and discussions."
        </p>

        {/* Owner Response */}
        <div className="bg-slate-50 p-4 rounded-lg border-l-4 border-red-500 mt-auto">
          <p className="text-xs font-bold text-slate-900 mb-1">
            Response from the owner
          </p>
          <p className="text-xs text-slate-600 leading-relaxed">
            Thank you Kamal for such a heartfelt review! We’re delighted that
            our teaching methods and personalized approach helped you gain
            confidence and fluency.
          </p>
        </div>
      </div>

      {/* Review 3 */}
      <div className="bg-white p-8 rounded-xl shadow-sm border border-slate-100 flex flex-col h-full">
        <div className="flex items-center gap-4 mb-4">
          <div className="h-12 w-12 bg-purple-100 rounded-full flex items-center justify-center text-purple-700 font-bold text-xl">
            S
          </div>
          <div>
            <h4 className="font-bold text-slate-900">Shweta Singh</h4>
            <p className="text-slate-500 text-xs">a month ago</p>
          </div>
          <div className="ml-auto text-yellow-500">
            <Star fill="currentColor" size={16} />
          </div>
        </div>
        <div className="flex text-yellow-500 mb-4 text-xs">
          <Star fill="currentColor" size={14} />
          <Star fill="currentColor" size={14} />
          <Star fill="currentColor" size={14} />
          <Star fill="currentColor" size={14} />
          <Star fill="currentColor" size={14} />
        </div>
        <p className="text-slate-600 text-sm leading-relaxed mb-6 flex-grow">
          "I had joined the academy one week ago. I realised it is a very good
          platform to learn spoken English. When I come here to attend classes I
          get lots of confidence to speak English. Before coming here I have
          hesitation to speak any one in English."
        </p>

        {/* Owner Response */}
        <div className="bg-slate-50 p-4 rounded-lg border-l-4 border-red-500 mt-auto">
          <p className="text-xs font-bold text-slate-900 mb-1">
            Response from the owner
          </p>
          <p className="text-xs text-slate-600 leading-relaxed">
            Thank you very much for taking the time to share your positive
            feedback. We truly appreciate your kind words and encouragement.
          </p>
        </div>
      </div>
    </div>
  </div>
</div>;
