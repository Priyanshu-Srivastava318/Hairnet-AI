import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Sparkles, Activity, TrendingUp, CheckCircle2, Brain, LineChart, Users } from 'lucide-react';

const Home = () => {
  const teamMembers = [
    {
      name: 'Priyanshu Srivastava',
      role: 'ML Specialist & Backend Dev',
      initials: 'PS',
      image: null, // Add image path if available: 'Priyanshu.png'
    },
    {
      name: 'Mitali Shandilya',
      role: 'Team Leader & AI Engineer',
      initials: 'MS',
      image: null, // 'Mitali.png'
    },
    {
      name: 'Niketa Sukhraliya',
      role: 'Full Stack Developer',
      initials: 'NS',
      image: null, // 'Niketa.png'
    },
    {
      name: 'Sahil Sharma',
      role: 'UI/UX Designer & Documentation',
      initials: 'SS',
      image: null, // 'Sahil Sharma.png'
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-950 via-slate-900 to-emerald-950">
      {/* Hero Section */}
      <section className="relative overflow-hidden py-20 px-4 sm:px-6 lg:px-8">
        {/* Animated background elements */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute top-20 left-10 w-72 h-72 bg-blue-500/10 rounded-full blur-3xl animate-pulse"></div>
          <div className="absolute bottom-20 right-10 w-96 h-96 bg-emerald-500/10 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '2s' }}></div>
        </div>

        <div className="max-w-7xl mx-auto relative z-10">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Left: Content */}
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              className="space-y-6"
            >
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold leading-tight">
                <span className="bg-gradient-to-r from-blue-400 via-emerald-400 to-blue-400 bg-clip-text text-transparent block mb-2">
                  Discover the Root Cause
                </span>
                <span className="text-white block">
                  of Your Hair Problems
                </span>
              </h1>

              <div className="space-y-4 text-base sm:text-lg">
                <p className="text-gray-300 leading-relaxed">
                  <span className="text-emerald-400 font-semibold">60% of people</span> face hair-related problems today - hair fall, dandruff, premature greying, and dry scalp.
                </p>

                <p className="text-gray-300 leading-relaxed">
                  Market solutions only treat symptoms, not the{' '}
                  <span className="text-blue-400 font-semibold">root cause</span>.
                </p>

                <p className="text-gray-300 leading-relaxed">
                  Our <span className="text-emerald-400 font-semibold">AI-powered platform</span> analyzes your lifestyle, health data, and scalp images to identify exactly why you're facing hair problems.
                </p>
              </div>

              <div className="flex flex-wrap gap-3 pt-2">
                <div className="flex items-center space-x-2 bg-blue-900/40 backdrop-blur-sm px-4 py-2 rounded-full border border-blue-700/50">
                  <Brain className="w-4 h-4 text-blue-400" />
                  <span className="text-sm text-gray-300">AI-Powered Analysis</span>
                </div>
                <div className="flex items-center space-x-2 bg-emerald-900/40 backdrop-blur-sm px-4 py-2 rounded-full border border-emerald-700/50">
                  <LineChart className="w-4 h-4 text-emerald-400" />
                  <span className="text-sm text-gray-300">Explainable Results</span>
                </div>
              </div>

              <div className="flex flex-wrap gap-4 pt-4">
                <Link to="/diagnosis">
                  <button className="group relative bg-gradient-to-r from-blue-600 to-emerald-600 hover:from-blue-700 hover:to-emerald-700 text-white font-semibold px-8 py-4 rounded-xl transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-emerald-500/50 flex items-center gap-2">
                    <Sparkles size={20} className="group-hover:rotate-12 transition-transform" />
                    Start Your Analysis Now
                  </button>
                </Link>
                
                <Link to="/about">
                  <button className="bg-slate-800/50 backdrop-blur-sm hover:bg-slate-700/50 text-gray-300 hover:text-white font-semibold px-8 py-4 rounded-xl transition-all duration-300 border border-emerald-700/30 hover:border-emerald-500/50 flex items-center gap-2">
                    <Activity size={20} />
                    Learn More
                  </button>
                </Link>
              </div>
            </motion.div>

            {/* Right: Product Card - SMALLER SIZE */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="relative"
            >
              <div className="relative bg-gradient-to-br from-blue-900/40 to-emerald-900/40 backdrop-blur-sm rounded-3xl p-6 border border-emerald-700/30 shadow-2xl">
                {/* REDUCED HEIGHT - was aspect-square, now fixed height */}
                <div className="h-64 sm:h-80 bg-gradient-to-br from-slate-800 to-slate-900 rounded-2xl overflow-hidden relative">
                  {/* Gradient Overlay */}
                  <div className="absolute inset-0 bg-gradient-to-br from-blue-600/20 via-emerald-600/20 to-transparent"></div>
                  
                  {/* Content */}
                  <div className="relative z-10 h-full flex flex-col items-center justify-center p-6 text-center">
                    <div className="w-24 h-24 sm:w-32 sm:h-32 mb-4 bg-gradient-to-br from-blue-500/20 to-emerald-500/20 backdrop-blur-sm rounded-3xl flex items-center justify-center border border-emerald-500/30">
                      <Sparkles size={48} className="text-emerald-400" />
                    </div>
                    <h3 className="text-xl sm:text-2xl font-bold text-white mb-2">AI Analysis</h3>
                    <p className="text-gray-300 text-sm sm:text-base mb-4">
                      Personalized insights for your hair health
                    </p>
                    <div className="flex items-center gap-2 text-emerald-400 text-sm">
                      <CheckCircle2 size={16} />
                      <span>100% Science-Backed</span>
                    </div>
                  </div>
                </div>
                
                <Link to="/diagnosis">
                  <button className="w-full mt-6 bg-gradient-to-r from-blue-600 to-emerald-600 hover:from-blue-700 hover:to-emerald-700 text-white font-semibold py-4 rounded-xl transition-all duration-300 transform hover:scale-105 shadow-lg">
                    Get Started Free
                  </button>
                </Link>
              </div>
              
              {/* Floating decorative elements */}
              <div className="absolute -top-4 -right-4 w-24 h-24 bg-emerald-500/20 rounded-full blur-2xl"></div>
              <div className="absolute -bottom-4 -left-4 w-32 h-32 bg-blue-500/20 rounded-full blur-2xl"></div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-slate-900/50">
        <div className="max-w-7xl mx-auto">
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="bg-gradient-to-br from-blue-900/30 to-emerald-900/30 backdrop-blur-sm rounded-2xl p-8 border border-emerald-700/20 text-center hover:border-emerald-500/50 transition-all duration-300 transform hover:-translate-y-2"
            >
              <div className="text-4xl sm:text-5xl font-bold bg-gradient-to-r from-blue-400 to-emerald-400 bg-clip-text text-transparent mb-3">
                60%
              </div>
              <p className="text-gray-300 text-sm sm:text-base leading-relaxed">
                of people face hair-related problems
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
              className="bg-gradient-to-br from-blue-900/30 to-emerald-900/30 backdrop-blur-sm rounded-2xl p-8 border border-emerald-700/20 text-center hover:border-emerald-500/50 transition-all duration-300 transform hover:-translate-y-2"
            >
              <div className="text-4xl sm:text-5xl font-bold text-blue-400 mb-3">85%</div>
              <p className="text-gray-300 text-sm sm:text-base leading-relaxed">
                don't know the root cause of their issues
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.3 }}
              className="bg-gradient-to-br from-blue-900/30 to-emerald-900/30 backdrop-blur-sm rounded-2xl p-8 border border-emerald-700/20 text-center hover:border-emerald-500/50 transition-all duration-300 transform hover:-translate-y-2 sm:col-span-2 lg:col-span-1"
            >
              <div className="text-4xl sm:text-5xl font-bold text-emerald-400 mb-3">70%</div>
              <p className="text-gray-300 text-sm sm:text-base leading-relaxed">
                rely on generic solutions that don't work
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Why Choose Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-4">
              <span className="bg-gradient-to-r from-blue-400 to-emerald-400 bg-clip-text text-transparent">
                Why Choose HairCare AI?
              </span>
            </h2>
            <p className="text-lg sm:text-xl text-gray-400 max-w-3xl mx-auto leading-relaxed">
              We don't just sell products. We solve the real problem using science and AI.
            </p>
          </motion.div>

          <div className="grid sm:grid-cols-2 gap-6 sm:gap-8">
            {/* Feature 1 */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="group bg-gradient-to-br from-blue-900/30 to-slate-900/30 backdrop-blur-sm rounded-2xl p-6 sm:p-8 border border-emerald-700/20 hover:border-blue-500/50 transition-all duration-300 transform hover:-translate-y-2"
            >
              <div className="flex items-start gap-4">
                <div className="w-14 h-14 rounded-xl bg-blue-500/20 flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform duration-300">
                  <Activity className="text-blue-400" size={28} />
                </div>
                <div>
                  <h3 className="text-xl sm:text-2xl font-bold mb-3 text-white group-hover:text-blue-400 transition-colors">
                    Root Cause Analysis
                  </h3>
                  <p className="text-gray-400 text-sm sm:text-base leading-relaxed">
                    Our AI doesn't just identify symptoms. It analyzes your complete health profile - BMI, nutrition, lifestyle, medical history - to pinpoint the exact underlying causes.
                  </p>
                </div>
              </div>
            </motion.div>

            {/* Feature 2 */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="group bg-gradient-to-br from-emerald-900/30 to-slate-900/30 backdrop-blur-sm rounded-2xl p-6 sm:p-8 border border-emerald-700/20 hover:border-emerald-500/50 transition-all duration-300 transform hover:-translate-y-2"
            >
              <div className="flex items-start gap-4">
                <div className="w-14 h-14 rounded-xl bg-emerald-500/20 flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform duration-300">
                  <TrendingUp className="text-emerald-400" size={28} />
                </div>
                <div>
                  <h3 className="text-xl sm:text-2xl font-bold mb-3 text-white group-hover:text-emerald-400 transition-colors">
                    Diet-First Approach
                  </h3>
                  <p className="text-gray-400 text-sm sm:text-base leading-relaxed">
                    No expensive supplements. We focus on sustainable nutrition improvements, personalized meal plans, and lifestyle changes that create long-term hair health.
                  </p>
                </div>
              </div>
            </motion.div>

            {/* Feature 3 */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="group bg-gradient-to-br from-blue-900/30 to-slate-900/30 backdrop-blur-sm rounded-2xl p-6 sm:p-8 border border-emerald-700/20 hover:border-blue-500/50 transition-all duration-300 transform hover:-translate-y-2"
            >
              <div className="flex items-start gap-4">
                <div className="w-14 h-14 rounded-xl bg-blue-500/20 flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform duration-300">
                  <Sparkles className="text-blue-400" size={28} />
                </div>
                <div>
                  <h3 className="text-xl sm:text-2xl font-bold mb-3 text-white group-hover:text-blue-400 transition-colors">
                    Explainable AI
                  </h3>
                  <p className="text-gray-400 text-sm sm:text-base leading-relaxed">
                    Unlike black-box models, we show you exactly which factors (stress, diet, sleep) contribute to your condition and by how much. Full transparency.
                  </p>
                </div>
              </div>
            </motion.div>

            {/* Feature 4 */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="group bg-gradient-to-br from-emerald-900/30 to-slate-900/30 backdrop-blur-sm rounded-2xl p-6 sm:p-8 border border-emerald-700/20 hover:border-emerald-500/50 transition-all duration-300 transform hover:-translate-y-2"
            >
              <div className="flex items-start gap-4">
                <div className="w-14 h-14 rounded-xl bg-emerald-500/20 flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform duration-300">
                  <LineChart className="text-emerald-400" size={28} />
                </div>
                <div>
                  <h3 className="text-xl sm:text-2xl font-bold mb-3 text-white group-hover:text-emerald-400 transition-colors">
                    Progress Tracking
                  </h3>
                  <p className="text-gray-400 text-sm sm:text-base leading-relaxed">
                    Track your improvement week by week with our timeline-based recovery plan. See exactly when to expect visible results based on your unique profile.
                  </p>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-slate-900/50">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <div className="flex items-center justify-center gap-3 mb-4">
              <Users className="w-10 h-10 text-emerald-400" />
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold bg-gradient-to-r from-blue-400 to-emerald-400 bg-clip-text text-transparent">
                Meet Our Team
              </h2>
            </div>
            <p className="text-lg sm:text-xl text-gray-400 max-w-3xl mx-auto">
              Passionate developers building the future of haircare
            </p>
          </motion.div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {teamMembers.map((member, index) => (
              <motion.div
                key={member.name}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="group relative bg-gradient-to-br from-blue-900/30 to-emerald-900/30 backdrop-blur-sm rounded-2xl p-6 border border-emerald-700/20 hover:border-emerald-500/50 transition-all duration-300 transform hover:-translate-y-2 hover:shadow-2xl hover:shadow-emerald-500/20"
              >
                {/* Avatar */}
                <div className="relative mb-4">
                  <div className="w-32 h-32 mx-auto rounded-full overflow-hidden border-4 border-emerald-500/50 group-hover:border-blue-500/50 transition-all duration-300 bg-gradient-to-br from-blue-600 to-emerald-600 flex items-center justify-center">
                    {member.image ? (
                      <img 
                        src={member.image} 
                        alt={member.name}
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <span className="text-white text-4xl font-bold">
                        {member.initials}
                      </span>
                    )}
                  </div>
                </div>
                
                {/* Info */}
                <div className="text-center">
                  <h3 className="text-xl font-bold text-white mb-2 group-hover:text-emerald-400 transition-colors">
                    {member.name}
                  </h3>
                  <p className="text-gray-400 text-sm group-hover:text-gray-300 transition-colors">
                    {member.role}
                  </p>
                </div>

                {/* Decorative element */}
                <div className="absolute top-0 right-0 w-16 h-16 bg-gradient-to-br from-emerald-500/10 to-transparent rounded-tr-2xl opacity-0 group-hover:opacity-100 transition-opacity"></div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-4">
              <span className="bg-gradient-to-r from-blue-400 to-emerald-400 bg-clip-text text-transparent">
                How It Works
              </span>
            </h2>
            <p className="text-lg sm:text-xl text-gray-400 max-w-3xl mx-auto leading-relaxed">
              Get personalized hair care insights in three simple steps
            </p>
          </motion.div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {/* Step 1 */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="relative bg-gradient-to-br from-blue-900/30 to-slate-900/30 backdrop-blur-sm rounded-2xl p-8 border border-emerald-700/20 text-center"
            >
              <div className="absolute -top-6 left-1/2 -translate-x-1/2 w-12 h-12 bg-gradient-to-r from-blue-600 to-emerald-600 rounded-full flex items-center justify-center text-white font-bold text-xl shadow-lg">
                1
              </div>
              <div className="mt-4 mb-6">
                <div className="w-16 h-16 mx-auto bg-blue-500/20 rounded-2xl flex items-center justify-center">
                  <Users className="text-blue-400" size={32} />
                </div>
              </div>
              <h3 className="text-xl font-bold text-white mb-3">Share Your Details</h3>
              <p className="text-gray-400 text-sm leading-relaxed">
                Fill out a comprehensive questionnaire about your lifestyle, diet, health history, and upload scalp images.
              </p>
            </motion.div>

            {/* Step 2 */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
              className="relative bg-gradient-to-br from-emerald-900/30 to-slate-900/30 backdrop-blur-sm rounded-2xl p-8 border border-emerald-700/20 text-center"
            >
              <div className="absolute -top-6 left-1/2 -translate-x-1/2 w-12 h-12 bg-gradient-to-r from-blue-600 to-emerald-600 rounded-full flex items-center justify-center text-white font-bold text-xl shadow-lg">
                2
              </div>
              <div className="mt-4 mb-6">
                <div className="w-16 h-16 mx-auto bg-emerald-500/20 rounded-2xl flex items-center justify-center">
                  <Brain className="text-emerald-400" size={32} />
                </div>
              </div>
              <h3 className="text-xl font-bold text-white mb-3">AI Analysis</h3>
              <p className="text-gray-400 text-sm leading-relaxed">
                Our advanced AI processes your data using machine learning models trained on dermatological research.
              </p>
            </motion.div>

            {/* Step 3 */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.3 }}
              className="relative bg-gradient-to-br from-blue-900/30 to-slate-900/30 backdrop-blur-sm rounded-2xl p-8 border border-emerald-700/20 text-center sm:col-span-2 lg:col-span-1"
            >
              <div className="absolute -top-6 left-1/2 -translate-x-1/2 w-12 h-12 bg-gradient-to-r from-blue-600 to-emerald-600 rounded-full flex items-center justify-center text-white font-bold text-xl shadow-lg">
                3
              </div>
              <div className="mt-4 mb-6">
                <div className="w-16 h-16 mx-auto bg-blue-500/20 rounded-2xl flex items-center justify-center">
                  <LineChart className="text-blue-400" size={32} />
                </div>
              </div>
              <h3 className="text-xl font-bold text-white mb-3">Get Results</h3>
              <p className="text-gray-400 text-sm leading-relaxed">
                Receive a detailed report with root cause analysis, personalized recommendations, and a recovery timeline.
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-r from-blue-900/30 via-slate-900/30 to-emerald-900/30">
        <div className="max-w-4xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-6 text-white leading-tight">
              Ready to Transform Your Hair Health?
            </h2>
            <p className="text-lg sm:text-xl text-gray-300 mb-8 leading-relaxed">
              Get your personalized analysis in just 5 minutes. No subscriptions, no hidden costs.
            </p>
            <Link to="/diagnosis">
              <button className="group bg-gradient-to-r from-blue-600 to-emerald-600 hover:from-blue-700 hover:to-emerald-700 text-white font-semibold text-base sm:text-lg px-8 sm:px-10 py-4 sm:py-5 rounded-xl transition-all duration-300 transform hover:scale-105 shadow-2xl hover:shadow-emerald-500/50 inline-flex items-center gap-3">
                <Sparkles className="group-hover:rotate-12 transition-transform" size={24} />
                Start Free Analysis
              </button>
            </Link>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default Home;