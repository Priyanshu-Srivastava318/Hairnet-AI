// ML Analysis Engine - Simulates intelligent hair health diagnosis
// Based on BMI, nutritional intake, lifestyle factors, and health history

export class HairHealthAnalyzer {
  constructor(userData) {
    this.userData = userData;
    this.bmi = this.calculateBMI();
    this.nutritionalGaps = [];
    this.recommendations = [];
    this.riskScore = 0;
  }

  // Calculate BMI
  calculateBMI() {
    const { weight, height } = this.userData.basic;
    const heightInMeters = height / 100;
    return (weight / (heightInMeters * heightInMeters)).toFixed(1);
  }

  // Analyze complete health profile
  analyze() {
    this.analyzeNutrition();
    this.analyzeLifestyle();
    this.analyzeHealthHistory();
    this.analyzeScalpCondition();
    this.generateRecommendations();
    this.calculateRiskScore();

    return {
      bmi: this.bmi,
      riskScore: this.riskScore,
      rootCauses: this.identifyRootCauses(),
      nutritionalGaps: this.nutritionalGaps,
      recommendations: this.recommendations,
      dietPlan: this.generateDietPlan(),
      lifestyleChanges: this.generateLifestyleChanges(),
      timeline: this.generateTimeline(),
      insights: this.generateInsights()
    };
  }

  // Nutrition analysis based on BMI and diet data
  analyzeNutrition() {
    const { diet } = this.userData;
    const proteinNeeds = this.calculateProteinNeeds();
    const ironNeeds = this.calculateIronNeeds();
    const vitaminNeeds = this.calculateVitaminNeeds();

    // Check protein intake
    if (diet.proteinSources.length < 2) {
      this.nutritionalGaps.push({
        nutrient: 'Protein',
        current: 'Insufficient',
        recommended: `${proteinNeeds}g per day`,
        severity: 'high',
        impact: 'Hair structure and growth'
      });
    }

    // Check iron intake (especially important)
    if (this.userData.basic.gender === 'female' && !diet.ironRichFoods) {
      this.nutritionalGaps.push({
        nutrient: 'Iron',
        current: 'Likely deficient',
        recommended: `${ironNeeds}mg per day`,
        severity: 'critical',
        impact: 'Hair follicle health and growth cycle'
      });
    }

    // Check omega-3
    if (!diet.fishOilOrNuts || diet.fishOilOrNuts === 'rarely') {
      this.nutritionalGaps.push({
        nutrient: 'Omega-3 Fatty Acids',
        current: 'Insufficient',
        recommended: '250-500mg EPA+DHA daily',
        severity: 'medium',
        impact: 'Scalp health and inflammation'
      });
    }

    // Check biotin sources
    if (!diet.biotin || diet.biotin === 'low') {
      this.nutritionalGaps.push({
        nutrient: 'Biotin (Vitamin B7)',
        current: 'Low',
        recommended: '30-100mcg daily',
        severity: 'medium',
        impact: 'Hair strength and keratin production'
      });
    }

    // Check zinc
    if (diet.processedFoods === 'high') {
      this.nutritionalGaps.push({
        nutrient: 'Zinc',
        current: 'Potentially low',
        recommended: '8-11mg daily',
        severity: 'medium',
        impact: 'Hair tissue growth and repair'
      });
    }
  }

  // Calculate protein needs based on BMI and activity
  calculateProteinNeeds() {
    const { weight } = this.userData.basic;
    const { activityLevel } = this.userData.lifestyle;
    
    let multiplier = 0.8; // base
    if (activityLevel === 'moderate') multiplier = 1.0;
    if (activityLevel === 'active') multiplier = 1.2;
    if (activityLevel === 'very_active') multiplier = 1.5;

    return Math.round(weight * multiplier);
  }

  // Calculate iron needs
  calculateIronNeeds() {
    const { gender, age } = this.userData.basic;
    if (gender === 'female' && age < 50) return 18;
    if (gender === 'female' && age >= 50) return 8;
    return 8;
  }

  // Calculate vitamin needs
  calculateVitaminNeeds() {
    return {
      vitaminD: '600-800 IU',
      vitaminE: '15mg',
      vitaminC: '75-90mg',
      vitaminA: '700-900mcg'
    };
  }

  // Analyze lifestyle factors
  analyzeLifestyle() {
    const { lifestyle } = this.userData;

    if (lifestyle.sleepHours < 7) {
      this.riskScore += 15;
    }

    if (lifestyle.stressLevel === 'high') {
      this.riskScore += 20;
    }

    if (lifestyle.smoking === 'yes') {
      this.riskScore += 25;
    }

    if (lifestyle.waterIntake < 2) {
      this.riskScore += 10;
    }
  }

  // Analyze health history
  analyzeHealthHistory() {
    const { health } = this.userData;

    if (health.thyroid === 'yes') {
      this.riskScore += 20;
    }

    if (health.anemia === 'yes') {
      this.riskScore += 25;
    }

    if (health.hormonal === 'yes') {
      this.riskScore += 15;
    }

    if (health.medications && health.medications.length > 0) {
      this.riskScore += 10;
    }
  }

  // Analyze scalp condition from images (simulated)
  analyzeScalpCondition() {
    const { scalpImages } = this.userData;
    
    // Simulate CNN-based image analysis
    if (scalpImages && scalpImages.length > 0) {
      // Mock analysis results
      this.scalpAnalysis = {
        hairDensity: Math.random() > 0.5 ? 'moderate' : 'low',
        scalpHealth: Math.random() > 0.5 ? 'dry' : 'oily',
        inflammation: Math.random() > 0.7 ? 'detected' : 'none',
        hairThinning: Math.random() > 0.6 ? 'yes' : 'no'
      };
    }
  }

  // Identify root causes
  identifyRootCauses() {
    const causes = [];

    if (this.nutritionalGaps.find(gap => gap.nutrient === 'Protein')) {
      causes.push({
        cause: 'Protein Deficiency',
        confidence: 85,
        description: 'Insufficient protein intake affecting hair structure and keratin production',
        priority: 'high'
      });
    }

    if (this.nutritionalGaps.find(gap => gap.nutrient === 'Iron')) {
      causes.push({
        cause: 'Iron Deficiency',
        confidence: 90,
        description: 'Low iron levels disrupting hair growth cycle and follicle health',
        priority: 'critical'
      });
    }

    if (this.userData.lifestyle.stressLevel === 'high') {
      causes.push({
        cause: 'Chronic Stress',
        confidence: 75,
        description: 'Elevated cortisol levels pushing hair follicles into telogen phase',
        priority: 'high'
      });
    }

    if (this.userData.lifestyle.sleepHours < 7) {
      causes.push({
        cause: 'Sleep Deprivation',
        confidence: 70,
        description: 'Inadequate sleep disrupting growth hormone secretion and cellular repair',
        priority: 'medium'
      });
    }

    if (this.bmi < 18.5 || this.bmi > 30) {
      causes.push({
        cause: 'BMI Imbalance',
        confidence: 65,
        description: 'Weight imbalance affecting hormonal regulation and nutrient distribution',
        priority: 'medium'
      });
    }

    return causes.sort((a, b) => b.confidence - a.confidence);
  }

  // Generate personalized recommendations
  generateRecommendations() {
    this.nutritionalGaps.forEach(gap => {
      this.recommendations.push(this.createNutritionRecommendation(gap));
    });

    // Lifestyle recommendations
    if (this.userData.lifestyle.sleepHours < 7) {
      this.recommendations.push({
        category: 'Sleep',
        title: 'Optimize Sleep Schedule',
        description: 'Increase sleep to 7-8 hours per night to support hair follicle regeneration',
        actionItems: [
          'Establish consistent sleep-wake schedule',
          'Create dark, cool sleeping environment',
          'Avoid screens 1 hour before bed'
        ],
        expectedImpact: 'Improved hair growth cycle within 4-6 weeks'
      });
    }

    if (this.userData.lifestyle.stressLevel === 'high') {
      this.recommendations.push({
        category: 'Stress Management',
        title: 'Implement Stress Reduction Techniques',
        description: 'Lower cortisol levels to prevent telogen effluvium',
        actionItems: [
          'Practice 10-15 minutes daily meditation',
          'Incorporate yoga or light exercise',
          'Consider adaptogenic herbs (ashwagandha, rhodiola)'
        ],
        expectedImpact: 'Reduced hair shedding within 8-12 weeks'
      });
    }
  }

  // Create nutrition-specific recommendations
  createNutritionRecommendation(gap) {
    const foodSources = {
      'Protein': ['eggs', 'Greek yogurt', 'lentils', 'quinoa', 'chicken breast', 'tofu'],
      'Iron': ['spinach', 'red meat', 'pumpkin seeds', 'dark chocolate', 'beans', 'fortified cereals'],
      'Omega-3 Fatty Acids': ['salmon', 'mackerel', 'walnuts', 'chia seeds', 'flaxseeds', 'sardines'],
      'Biotin (Vitamin B7)': ['eggs', 'almonds', 'sweet potato', 'mushrooms', 'avocado', 'nutritional yeast'],
      'Zinc': ['oysters', 'beef', 'pumpkin seeds', 'cashews', 'chickpeas', 'oatmeal']
    };

    return {
      category: 'Nutrition',
      title: `Increase ${gap.nutrient} Intake`,
      description: `Target ${gap.recommended} to support ${gap.impact.toLowerCase()}`,
      actionItems: [
        `Include 2-3 servings daily from: ${foodSources[gap.nutrient].slice(0, 3).join(', ')}`,
        `Alternative sources: ${foodSources[gap.nutrient].slice(3).join(', ')}`,
        'Consider food pairing for better absorption (e.g., vitamin C with iron)'
      ],
      foodSources: foodSources[gap.nutrient],
      expectedImpact: 'Visible improvement in 12-16 weeks'
    };
  }

  // Generate personalized diet plan
  generateDietPlan() {
    const proteinNeeds = this.calculateProteinNeeds();
    const ironNeeds = this.calculateIronNeeds();

    return {
      dailyTargets: {
        calories: this.calculateCalorieNeeds(),
        protein: `${proteinNeeds}g`,
        iron: `${ironNeeds}mg`,
        omega3: '250-500mg EPA+DHA',
        biotin: '30-100mcg',
        zinc: '8-11mg',
        water: '2.5-3L'
      },
      mealPlan: {
        breakfast: [
          '2 eggs (protein, biotin)',
          '1 cup spinach (iron)',
          '1 slice whole grain toast',
          '1/4 avocado (healthy fats)'
        ],
        lunch: [
          '150g grilled chicken/salmon (protein, omega-3)',
          '1.5 cups mixed greens salad',
          '1/2 cup quinoa (protein, iron)',
          '2 tbsp pumpkin seeds (zinc, iron)'
        ],
        dinner: [
          '150g lean beef/tofu (protein, iron)',
          '1 cup broccoli (vitamin C for iron absorption)',
          '1 medium sweet potato (biotin)',
          '1 tbsp olive oil dressing'
        ],
        snacks: [
          '1/4 cup almonds (biotin, protein)',
          '1 cup Greek yogurt (protein)',
          'Handful of walnuts (omega-3)'
        ]
      }
    };
  }

  // Calculate calorie needs
  calculateCalorieNeeds() {
    const { weight, height, age, gender } = this.userData.basic;
    const { activityLevel } = this.userData.lifestyle;

    // Mifflin-St Jeor Equation
    let bmr;
    if (gender === 'male') {
      bmr = 10 * weight + 6.25 * height - 5 * age + 5;
    } else {
      bmr = 10 * weight + 6.25 * height - 5 * age - 161;
    }

    const activityMultipliers = {
      'sedentary': 1.2,
      'light': 1.375,
      'moderate': 1.55,
      'active': 1.725,
      'very_active': 1.9
    };

    return Math.round(bmr * (activityMultipliers[activityLevel] || 1.2));
  }

  // Generate lifestyle changes
  generateLifestyleChanges() {
    return [
      {
        area: 'Hydration',
        current: `${this.userData.lifestyle.waterIntake}L/day`,
        target: '2.5-3L/day',
        tips: [
          'Start each morning with 500ml water',
          'Keep water bottle at desk',
          'Set hourly reminders'
        ]
      },
      {
        area: 'Sleep',
        current: `${this.userData.lifestyle.sleepHours} hours`,
        target: '7-8 hours',
        tips: [
          'Fixed bedtime at 10:30 PM',
          'No caffeine after 3 PM',
          'Bedroom temperature 18-20°C'
        ]
      },
      {
        area: 'Exercise',
        current: this.userData.lifestyle.activityLevel,
        target: 'Moderate (30 min/day)',
        tips: [
          'Morning walk or yoga',
          'Scalp massage during shower (5 min)',
          'Avoid excessive heat styling'
        ]
      }
    ];
  }

  // Calculate overall risk score
  calculateRiskScore() {
    // Normalize to 0-100
    this.riskScore = Math.min(100, this.riskScore);
    
    // Adjust based on number of gaps
    this.riskScore += this.nutritionalGaps.length * 5;
    
    this.riskScore = Math.min(100, this.riskScore);
  }

  // Generate recovery timeline
  generateTimeline() {
    return [
      {
        week: '1-2',
        phase: 'Adaptation',
        changes: 'Body adjusts to new nutrition, improved hydration',
        visible: 'Slight improvement in scalp health'
      },
      {
        week: '3-4',
        phase: 'Stabilization',
        changes: 'Nutrient levels stabilizing, reduced shedding',
        visible: 'Less hair fall during washing'
      },
      {
        week: '5-8',
        phase: 'Early Growth',
        changes: 'Hair follicles entering anagen phase',
        visible: 'Baby hair growth at hairline'
      },
      {
        week: '9-12',
        phase: 'Visible Improvement',
        changes: 'Improved hair texture and strength',
        visible: 'Noticeably healthier, shinier hair'
      },
      {
        week: '13-16',
        phase: 'Significant Progress',
        changes: 'Full growth cycle completion',
        visible: 'Increased hair density and volume'
      }
    ];
  }

  // Generate key insights
  generateInsights() {
    return {
      primaryIssue: this.identifyRootCauses()[0]?.cause || 'Nutritional imbalance',
      keyFinding: this.nutritionalGaps.length > 0 
        ? `${this.nutritionalGaps.length} critical nutritional gaps identified`
        : 'Lifestyle factors are primary contributors',
      confidence: '87%',
      successProbability: this.riskScore < 50 ? 'High (85%)' : this.riskScore < 75 ? 'Moderate (65%)' : 'Requires medical consultation',
      expectedTimeframe: '12-16 weeks for visible improvement'
    };
  }
}

// Export analysis function
export const analyzeHairHealth = (userData) => {
  const analyzer = new HairHealthAnalyzer(userData);
  return analyzer.analyze();
};
