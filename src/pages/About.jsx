import { motion } from 'framer-motion';
import { Brain, BarChart3, Lightbulb, CheckCircle } from 'lucide-react';

const About = () => {
  return (
    <div className="min-h-screen py-12 px-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-16"
        >
          <h1 className="text-5xl md:text-6xl font-display font-bold mb-6">
            <span className="text-blue-300">About</span>{' '}
            <span className="gradient-text">HairCare AI</span>
          </h1>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            Revolutionizing hair health diagnosis through{' '}
            <span className="text-primary-400 font-semibold">AI-powered root cause analysis</span>
            {' '}and explainable insights.
          </p>
        </motion.div>

        {/* Problem Section */}
        <motion.section
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          className="mb-20"
        >
          <div className="text-center mb-12">
            <span className="inline-block px-6 py-2 bg-red-500/20 text-red-400 rounded-full font-medium mb-4">
              The Problem
            </span>
            <h2 className="text-4xl font-display font-bold mb-6">
              A Growing <span className="text-red-400">Crisis</span> in Hair Health
            </h2>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <div className="card card-hover text-center">
              <div className="text-6xl font-bold gradient-text mb-4">60%</div>
              <p className="text-gray-300 text-lg">of people face hair-related problems</p>
            </div>

            <div className="card card-hover text-center">
              <div className="text-6xl font-bold text-blue-400 mb-4">85%</div>
              <p className="text-gray-300 text-lg">don't know the root cause of their issues</p>
            </div>

            <div className="card card-hover text-center">
              <div className="text-6xl font-bold text-accent-400 mb-4">70%</div>
              <p className="text-gray-300 text-lg">rely on generic solutions that don't work</p>
            </div>
          </div>

          <div className="mt-12 card p-8">
            <h3 className="text-2xl font-bold mb-4 text-white">Why Traditional Approaches Fail</h3>
            <div className="space-y-4 text-gray-300">
              <p>Most hair care products and treatments focus on symptoms rather than underlying causes. You buy expensive shampoos, supplements, and treatments without understanding why you have the problem in the first place.</p>
              <p>The reality: Hair problems are often manifestations of deeper issues - nutritional deficiencies, hormonal imbalances, chronic stress, or poor lifestyle choices. Without addressing these root causes, you're just masking symptoms.</p>
            </div>
          </div>
        </motion.section>

        {/* Solution Section */}
        <motion.section
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          className="mb-20"
        >
          <div className="text-center mb-12">
            <h2 className="text-4xl font-display font-bold mb-6">
              <span className="gradient-text">AI-Powered Root Cause Analysis</span>
            </h2>
            <p className="text-xl text-gray-400 max-w-3xl mx-auto">
              We combine advanced AI, explainable machine learning, and comprehensive data analysis to identify the true reasons behind your hair problems.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            {/* Multi-Modal Analysis */}
            <div className="card card-hover">
              <div className="flex items-start gap-4 mb-4">
                <div className="w-16 h-16 rounded-xl bg-primary-500/20 flex items-center justify-center flex-shrink-0">
                  <Brain className="text-primary-400" size={32} />
                </div>
                <div>
                  <h3 className="text-2xl font-bold mb-2 text-white">Multi-Modal Analysis</h3>
                </div>
              </div>
              <p className="text-gray-400 mb-4">
                We analyze <span className="text-primary-400 font-medium">lifestyle data, health surveys, and scalp images</span> using CNN-based computer vision to create a comprehensive health profile.
              </p>
              <div className="bg-navy-800/50 rounded-lg p-4 border border-navy-600">
                <p className="text-sm text-gray-300">
                  <strong className="text-primary-400">Data sources:</strong> BMI, dietary intake, sleep patterns, stress levels, medical history, medication, and visual scalp analysis
                </p>
              </div>
            </div>

            {/* Explainable AI */}
            <div className="card card-hover">
              <div className="flex items-start gap-4 mb-4">
                <div className="w-16 h-16 rounded-xl bg-accent-500/20 flex items-center justify-center flex-shrink-0">
                  <BarChart3 className="text-accent-400" size={32} />
                </div>
                <div>
                  <h3 className="text-2xl font-bold mb-2 text-white">Explainable AI (SHAP)</h3>
                </div>
              </div>
              <p className="text-gray-400 mb-4">
                Unlike black-box models, we use <span className="text-accent-400 font-medium">SHAP analysis</span> to show exactly which factors (stress, diet, sleep) contribute to your condition and by how much.
              </p>
              <div className="bg-navy-800/50 rounded-lg p-4 border border-navy-600">
                <p className="text-sm text-gray-300">
                  <strong className="text-accent-400">Transparency:</strong> You see the confidence level, contributing factors, and reasoning behind every recommendation
                </p>
              </div>
            </div>
          </div>
        </motion.section>

        {/* Methodology Section */}
        <motion.section
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          className="mb-20"
        >
          <div className="text-center mb-12">
            <h2 className="text-4xl font-display font-bold mb-6">
              Our <span className="gradient-text">Methodology</span>
            </h2>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="card card-hover">
              <div className="text-4xl font-bold text-primary-400 mb-4">01</div>
              <h3 className="text-xl font-bold mb-2 text-white">Data Collection</h3>
              <p className="text-gray-400">Comprehensive health and lifestyle questionnaire plus scalp image upload</p>
            </div>

            <div className="card card-hover">
              <div className="text-4xl font-bold text-primary-400 mb-4">02</div>
              <h3 className="text-xl font-bold mb-2 text-white">AI Analysis</h3>
              <p className="text-gray-400">Multi-modal ML models process your data to identify patterns and deficiencies</p>
            </div>

            <div className="card card-hover">
              <div className="text-4xl font-bold text-primary-400 mb-4">03</div>
              <h3 className="text-xl font-bold mb-2 text-white">Root Cause ID</h3>
              <p className="text-gray-400">SHAP-based explainable AI pinpoints exact contributing factors with confidence scores</p>
            </div>

            <div className="card card-hover">
              <div className="text-4xl font-bold text-primary-400 mb-4">04</div>
              <h3 className="text-xl font-bold mb-2 text-white">Personalized Plan</h3>
              <p className="text-gray-400">Custom nutrition, lifestyle, and recovery recommendations based on your profile</p>
            </div>
          </div>
        </motion.section>

        {/* Benefits Section */}
        <motion.section
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          className="mb-20"
        >
          <div className="card p-8 md:p-12 bg-gradient-to-br from-primary-900/20 to-accent-900/20 border-2 border-primary-500/30">
            <div className="flex items-start gap-4 mb-8">
              <div className="w-16 h-16 rounded-xl bg-primary-500/20 flex items-center justify-center flex-shrink-0">
                <Lightbulb className="text-primary-400" size={32} />
              </div>
              <div>
                <h2 className="text-3xl font-display font-bold mb-2 text-white">
                  Why Our Approach Works
                </h2>
                <p className="text-gray-300">Science-backed, data-driven, and focused on long-term health</p>
              </div>
            </div>

            <div className="grid md:grid-cols-2 gap-6">
              <div className="flex items-start gap-3">
                <CheckCircle className="text-primary-400 flex-shrink-0 mt-1" size={24} />
                <div>
                  <h3 className="font-bold text-white mb-1">No Generic Solutions</h3>
                  <p className="text-gray-400">Every recommendation is tailored to your unique BMI, nutritional needs, and health profile</p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <CheckCircle className="text-primary-400 flex-shrink-0 mt-1" size={24} />
                <div>
                  <h3 className="font-bold text-white mb-1">Diet-First Philosophy</h3>
                  <p className="text-gray-400">Focus on sustainable nutrition improvements, not expensive supplements</p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <CheckCircle className="text-primary-400 flex-shrink-0 mt-1" size={24} />
                <div>
                  <h3 className="font-bold text-white mb-1">Holistic Health</h3>
                  <p className="text-gray-400">Improve overall wellbeing - better sleep, reduced stress, balanced nutrition</p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <CheckCircle className="text-primary-400 flex-shrink-0 mt-1" size={24} />
                <div>
                  <h3 className="font-bold text-white mb-1">Long-term Results</h3>
                  <p className="text-gray-400">Address root causes for lasting improvement, not temporary fixes</p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <CheckCircle className="text-primary-400 flex-shrink-0 mt-1" size={24} />
                <div>
                  <h3 className="font-bold text-white mb-1">Full Transparency</h3>
                  <p className="text-gray-400">Understand exactly why you have issues and how to fix them</p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <CheckCircle className="text-primary-400 flex-shrink-0 mt-1" size={24} />
                <div>
                  <h3 className="font-bold text-white mb-1">Evidence-Based</h3>
                  <p className="text-gray-400">Recommendations backed by nutritional science and dermatological research</p>
                </div>
              </div>
            </div>
          </div>
        </motion.section>

        {/* Tech Stack Note */}
        <motion.section
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
        >
          <div className="card p-6 bg-navy-800/30 border border-primary-500/20">
            <h3 className="text-xl font-bold mb-4 text-white">Technology Stack</h3>
            <p className="text-gray-400 mb-4">
              Our platform combines state-of-the-art machine learning with medical expertise:
            </p>
            <div className="grid md:grid-cols-3 gap-4 text-sm">
              <div className="bg-navy-800 rounded-lg p-4">
                <p className="font-medium text-primary-400 mb-2">Computer Vision</p>
                <p className="text-gray-400">CNN-based scalp analysis for texture, density, and inflammation detection</p>
              </div>
              <div className="bg-navy-800 rounded-lg p-4">
                <p className="font-medium text-primary-400 mb-2">Explainable AI</p>
                <p className="text-gray-400">SHAP values for transparent factor contribution analysis</p>
              </div>
              <div className="bg-navy-800 rounded-lg p-4">
                <p className="font-medium text-primary-400 mb-2">Nutritional Science</p>
                <p className="text-gray-400">BMI-based macronutrient calculations and deficiency mapping</p>
              </div>
            </div>
          </div>
        </motion.section>
      </div>
    </div>
  );
};

export default About;
