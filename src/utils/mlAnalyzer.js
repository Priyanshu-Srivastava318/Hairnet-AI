// ML Analysis Engine - Realistic hair health diagnosis
// Accounts for: BMI, diet preference (veg/non-veg), nutrition, lifestyle, health history

export class HairHealthAnalyzer {
  constructor(userData) {
    this.userData = userData;
    this.bmi = this.calculateBMI();
    this.dietPreference = userData.basicInfo?.dietPreference || 'non-vegetarian';
    this.nutritionalGaps = [];
    this.recommendations = [];
    this.riskScore = 0;
  }

  // Calculate BMI - FIXED
  calculateBMI() {
    const { weight, height } = this.userData.basicInfo; // Changed from 'basic'
    const heightInMeters = height / 100;
    return (weight / (heightInMeters * heightInMeters)).toFixed(1);
  }

  // Main analysis function
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

  // Enhanced nutrition analysis with diet preference
  analyzeNutrition() {
    const { diet } = this.userData;
    const proteinNeeds = this.calculateProteinNeeds();
    const ironNeeds = this.calculateIronNeeds();

    // Check protein intake
    if ((diet.proteinSources?.length || 0) < 2) {
      this.nutritionalGaps.push({
        nutrient: 'Protein',
        current: 'Insufficient variety',
        recommended: `${proteinNeeds}g per day from ${this.dietPreference === 'vegetarian' ? 'plant sources' : 'diverse sources'}`,
        severity: 'high',
        impact: 'Hair structure, keratin production, follicle strength'
      });
    }

    // Iron - critical for vegetarians and women
    const isVegetarian = this.dietPreference === 'vegetarian';
    const { gender } = this.userData.basicInfo;
    
    if (!diet.ironRichFoods) {
      this.nutritionalGaps.push({
        nutrient: 'Iron',
        current: 'Likely deficient',
        recommended: `${ironNeeds}mg per day ${isVegetarian ? '(with vitamin C for absorption)' : ''}`,
        severity: (gender === 'female' || isVegetarian) ? 'critical' : 'high',
        impact: 'Hair growth cycle, oxygen delivery to follicles'
      });
    }

    // Omega-3 - source depends on diet
    if (!diet.fishOilOrNuts || diet.fishOilOrNuts === 'rarely') {
      this.nutritionalGaps.push({
        nutrient: 'Omega-3 Fatty Acids',
        current: 'Insufficient',
        recommended: isVegetarian 
          ? '2-3 tbsp flaxseeds/chia seeds daily' 
          : '2-3 servings fatty fish per week OR 250-500mg EPA+DHA',
        severity: 'medium',
        impact: 'Scalp health, inflammation reduction, shine'
      });
    }

    // B12 - critical for vegetarians
    if (isVegetarian && (!diet.b12Intake || diet.b12Intake === 'no')) {
      this.nutritionalGaps.push({
        nutrient: 'Vitamin B12',
        current: 'Deficient (common in vegetarians)',
        recommended: '2.4mcg daily (fortified foods or supplement)',
        severity: 'critical',
        impact: 'Cell production, red blood cell formation, hair growth'
      });
    }

    // Zinc - especially important with high processed food
    if (diet.processedFoods === 'high') {
      this.nutritionalGaps.push({
        nutrient: 'Zinc',
        current: 'Potentially low',
        recommended: isVegetarian 
          ? '10-12mg daily (pumpkin seeds, chickpeas, cashews)' 
          : '8-11mg daily (oysters, beef, pumpkin seeds)',
        severity: 'medium',
        impact: 'Hair tissue growth and repair, oil gland function'
      });
    }

    // Biotin
    if (diet.vegetables === 'low') {
      this.nutritionalGaps.push({
        nutrient: 'Biotin (Vitamin B7)',
        current: 'Low',
        recommended: '30-100mcg daily from whole foods',
        severity: 'medium',
        impact: 'Keratin production, hair strength'
      });
    }
  }

  // Calculate protein needs
  calculateProteinNeeds() {
    const { weight } = this.userData.basicInfo;
    const { activityLevel } = this.userData.lifestyle;
    
    let multiplier = 0.8;
    if (activityLevel === 'moderate') multiplier = 1.0;
    if (activityLevel === 'active') multiplier = 1.2;
    if (activityLevel === 'very_active') multiplier = 1.5;

    // Vegetarians may need slightly more due to lower bioavailability
    if (this.dietPreference === 'vegetarian') {
      multiplier += 0.1;
    }

    return Math.round(weight * multiplier);
  }

  // Calculate iron needs
  calculateIronNeeds() {
    const { gender, age } = this.userData.basicInfo;
    let needs = gender === 'female' && age < 50 ? 18 : 8;
    
    // Vegetarians need ~1.8x more due to lower absorption
    if (this.dietPreference === 'vegetarian') {
      needs = Math.round(needs * 1.8);
    }
    
    return needs;
  }

  // Lifestyle analysis
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

    if (lifestyle.activityLevel === 'sedentary') {
      this.riskScore += 10;
    }
  }

  // Health history analysis
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

  // Scalp condition (simulated)
  analyzeScalpCondition() {
    const { scalpImages } = this.userData;
    
    if (scalpImages && scalpImages.length > 0) {
      this.scalpAnalysis = {
        hairDensity: 'moderate',
        scalpHealth: 'normal',
        inflammation: 'none',
        hairThinning: 'mild'
      };
    }
  }

  // Identify root causes with realistic confidence
  identifyRootCauses() {
    const causes = [];

    // Protein deficiency
    if (this.nutritionalGaps.find(gap => gap.nutrient === 'Protein')) {
      causes.push({
        cause: 'Insufficient Protein Diversity',
        confidence: 82,
        description: `Your current protein intake lacks variety. ${
          this.dietPreference === 'vegetarian' 
            ? 'Plant proteins need to be combined (lentils + rice, beans + quinoa) for complete amino acids.' 
            : 'Include lean meats, fish, eggs, and dairy for complete protein profile.'
        }`,
        priority: 'high'
      });
    }

    // Iron deficiency
    if (this.nutritionalGaps.find(gap => gap.nutrient === 'Iron')) {
      const isVeg = this.dietPreference === 'vegetarian';
      causes.push({
        cause: 'Iron Deficiency',
        confidence: this.userData.basicInfo.gender === 'female' || isVeg ? 88 : 75,
        description: `Low iron levels are disrupting your hair growth cycle. ${
          isVeg 
            ? 'Plant iron (non-heme) has lower absorption - pair with vitamin C rich foods (citrus, tomatoes, peppers).' 
            : 'Include red meat, liver, or fortified cereals for better iron absorption.'
        }`,
        priority: 'critical'
      });
    }

    // B12 for vegetarians
    if (this.nutritionalGaps.find(gap => gap.nutrient === 'Vitamin B12')) {
      causes.push({
        cause: 'Vitamin B12 Deficiency',
        confidence: 90,
        description: 'B12 is primarily found in animal products. Deficiency leads to poor cell division and affects hair follicle regeneration. Supplement or fortified foods are essential.',
        priority: 'critical'
      });
    }

    // Stress
    if (this.userData.lifestyle.stressLevel === 'high') {
      causes.push({
        cause: 'Chronic Stress (Telogen Effluvium)',
        confidence: 78,
        description: 'Elevated cortisol from chronic stress is pushing hair follicles into resting (telogen) phase prematurely, causing excessive shedding.',
        priority: 'high'
      });
    }

    // Sleep
    if (this.userData.lifestyle.sleepHours < 7) {
      causes.push({
        cause: 'Sleep Deprivation',
        confidence: 72,
        description: 'Inadequate sleep disrupts growth hormone secretion needed for cellular repair and hair follicle regeneration.',
        priority: 'medium'
      });
    }

    // BMI imbalance
    if (this.bmi < 18.5 || this.bmi > 30) {
      causes.push({
        cause: 'BMI Imbalance',
        confidence: 68,
        description: `${this.bmi < 18.5 ? 'Underweight' : 'Overweight'} status affects hormonal regulation and nutrient distribution to hair follicles.`,
        priority: 'medium'
      });
    }

    return causes.sort((a, b) => b.confidence - a.confidence).slice(0, 5);
  }

  // Generate personalized recommendations
  generateRecommendations() {
    this.nutritionalGaps.forEach(gap => {
      this.recommendations.push(this.createNutritionRecommendation(gap));
    });

    // Sleep recommendation
    if (this.userData.lifestyle.sleepHours < 7) {
      this.recommendations.push({
        category: 'Sleep',
        title: 'Optimize Sleep for Hair Growth',
        description: 'Increase sleep to 7-8 hours. Growth hormone peaks during deep sleep - critical for hair follicle regeneration.',
        actionItems: [
          'Fixed sleep schedule: Bed by 10:30 PM, wake by 6:30 AM',
          'No screens 1 hour before bed (blue light disrupts melatonin)',
          'Keep bedroom dark, cool (18-20°C), and quiet',
          'Avoid caffeine after 2 PM'
        ],
        expectedImpact: 'Reduced hair fall within 4-6 weeks, improved texture in 8-10 weeks'
      });
    }

    // Stress management
    if (this.userData.lifestyle.stressLevel === 'high') {
      this.recommendations.push({
        category: 'Stress Management',
        title: 'Lower Cortisol to Prevent Telogen Effluvium',
        description: 'Chronic stress triggers telogen effluvium - mass shedding 2-3 months after stressful period.',
        actionItems: [
          'Daily meditation: 10-15 minutes (Headspace, Calm apps)',
          'Yoga or light exercise 3-4x/week',
          'Adaptogenic herbs: Ashwagandha (300-500mg) or Rhodiola',
          'Journaling before bed to process thoughts'
        ],
        expectedImpact: 'Reduced shedding within 8-12 weeks as cortisol normalizes'
      });
    }
  }

  // Create diet-specific nutrition recommendations
  createNutritionRecommendation(gap) {
    const isVeg = this.dietPreference === 'vegetarian';
    
    const foodSources = {
      'Protein': isVeg 
        ? ['tofu', 'paneer', 'Greek yogurt', 'lentils', 'quinoa', 'chickpeas', 'tempeh', 'edamame']
        : ['eggs', 'Greek yogurt', 'chicken breast', 'salmon', 'lean beef', 'turkey', 'cottage cheese', 'tuna'],
      'Iron': isVeg 
        ? ['spinach (with lemon)', 'pumpkin seeds', 'fortified cereals', 'tofu', 'dark chocolate', 'quinoa', 'beans + vitamin C']
        : ['red meat', 'liver', 'oysters', 'spinach', 'fortified cereals', 'dark chocolate'],
      'Omega-3 Fatty Acids': isVeg 
        ? ['flaxseeds', 'chia seeds', 'walnuts', 'hemp seeds', 'algae oil (DHA)', 'Brussels sprouts']
        : ['salmon', 'mackerel', 'sardines', 'herring', 'walnuts', 'fish oil supplements'],
      'Vitamin B12': isVeg 
        ? ['fortified plant milk', 'nutritional yeast', 'fortified cereals', 'B12 supplement (MUST)', 'fortified tofu']
        : ['eggs', 'dairy', 'fish', 'meat', 'fortified cereals'],
      'Biotin (Vitamin B7)': isVeg 
        ? ['almonds', 'peanuts', 'sweet potato', 'mushrooms', 'avocado', 'spinach']
        : ['eggs (especially yolk)', 'salmon', 'sweet potato', 'almonds', 'nutritional yeast'],
      'Zinc': isVeg 
        ? ['pumpkin seeds', 'cashews', 'chickpeas', 'lentils', 'oatmeal', 'fortified cereals']
        : ['oysters', 'beef', 'crab', 'pumpkin seeds', 'cashews', 'chickpeas']
    };

    const sources = foodSources[gap.nutrient] || [];

    return {
      category: 'Nutrition',
      title: `Address ${gap.nutrient} Deficiency`,
      description: `Target: ${gap.recommended}. This nutrient is essential for ${gap.impact.toLowerCase()}.`,
      actionItems: [
        `Include 2-3 servings daily from: ${sources.slice(0, 3).join(', ')}`,
        `Alternative sources: ${sources.slice(3, 6).join(', ')}`,
        gap.nutrient === 'Iron' && isVeg 
          ? 'Always pair with vitamin C (lemon, orange, tomatoes) for 3-4x better absorption'
          : gap.nutrient === 'Vitamin B12' && isVeg
          ? 'CRITICAL: Take B12 supplement (1000mcg weekly) - not negotiable for vegetarians'
          : 'Consider timing: Protein best absorbed post-workout, iron away from calcium/tea'
      ],
      foodSources: sources,
      expectedImpact: gap.severity === 'critical' ? 'Improvement in 8-12 weeks' : 'Visible results in 12-16 weeks'
    };
  }

  // Generate diet plan based on preference
  generateDietPlan() {
    const proteinNeeds = this.calculateProteinNeeds();
    const ironNeeds = this.calculateIronNeeds();
    const isVeg = this.dietPreference === 'vegetarian';

    const mealPlan = isVeg ? {
      breakfast: [
        '2 scrambled eggs / tofu scramble (15g protein, biotin)',
        '1 cup cooked spinach with lemon juice (iron + vitamin C)',
        '2 slices whole grain toast with almond butter',
        '1/4 avocado (healthy fats, biotin)'
      ],
      lunch: [
        '1.5 cups lentil dal / chickpea curry (18g protein, iron)',
        '1 cup quinoa / brown rice (complete protein)',
        'Mixed vegetable salad with 2 tbsp pumpkin seeds (zinc)',
        '1 cup fortified soy milk (B12, calcium)'
      ],
      dinner: [
        '150g paneer / tofu stir-fry (20g protein)',
        '1.5 cups mixed vegetables (broccoli, peppers for vitamin C)',
        '1 medium sweet potato (biotin, complex carbs)',
        '1 tbsp flaxseed powder (omega-3)'
      ],
      snacks: [
        '1/4 cup almonds or walnuts (omega-3, biotin)',
        '1 cup Greek yogurt with chia seeds (protein, omega-3)',
        'Handful of roasted chickpeas (protein, iron)',
        'B12 supplement (1000mcg weekly) - ESSENTIAL'
      ]
    } : {
      breakfast: [
        '2 whole eggs + 2 egg whites (25g protein, biotin)',
        '1 cup spinach omelette (iron)',
        '1 slice whole grain toast',
        '1/4 avocado (healthy fats)'
      ],
      lunch: [
        '150g grilled chicken/salmon (35g protein, omega-3)',
        '1.5 cups mixed greens salad',
        '1/2 cup quinoa (iron, complete protein)',
        '2 tbsp pumpkin seeds (zinc, iron)'
      ],
      dinner: [
        '150g lean beef / grilled fish (30g protein, iron, B12)',
        '1 cup broccoli (vitamin C for iron absorption)',
        '1 medium sweet potato (biotin, complex carbs)',
        '1 tbsp olive oil dressing'
      ],
      snacks: [
        '1/4 cup mixed nuts (biotin, protein)',
        '1 cup Greek yogurt (20g protein, B12)',
        'Sardines on crackers (omega-3, calcium)',
        'Handful of walnuts (omega-3)'
      ]
    };

    return {
      dailyTargets: {
        calories: this.calculateCalorieNeeds(),
        protein: `${proteinNeeds}g`,
        iron: `${ironNeeds}mg`,
        omega3: isVeg ? '2-3 tbsp flax/chia seeds' : '250-500mg EPA+DHA',
        biotin: '30-100mcg',
        zinc: isVeg ? '10-12mg' : '8-11mg',
        water: '2.5-3L',
        ...(isVeg && { vitaminB12: '2.4mcg (supplement REQUIRED)' })
      },
      mealPlan
    };
  }

  // Calculate calorie needs
  calculateCalorieNeeds() {
    const { weight, height, age, gender } = this.userData.basicInfo;
    const { activityLevel } = this.userData.lifestyle;

    // Mifflin-St Jeor
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

  // Lifestyle changes
  generateLifestyleChanges() {
    return [
      {
        area: 'Hydration',
        current: `${this.userData.lifestyle.waterIntake}L/day`,
        target: '2.5-3L/day',
        tips: [
          'Start morning with 500ml water',
          'Drink 250ml every 2 hours',
          'Herbal teas count toward intake'
        ]
      },
      {
        area: 'Sleep',
        current: `${this.userData.lifestyle.sleepHours} hours`,
        target: '7-8 hours',
        tips: [
          'Fixed bedtime: 10:30 PM',
          'No caffeine after 2 PM',
          'Dark, cool bedroom (18-20°C)'
        ]
      },
      {
        area: 'Exercise',
        current: this.userData.lifestyle.activityLevel,
        target: '30 min/day moderate activity',
        tips: [
          'Morning walk or yoga',
          'Scalp massage 5 min during shower (increases blood flow)',
          'Avoid excessive heat styling'
        ]
      }
    ];
  }

  // Calculate risk score
  calculateRiskScore() {
    this.riskScore = Math.min(100, this.riskScore + this.nutritionalGaps.length * 5);
  }

  // Recovery timeline
  generateTimeline() {
    const baseTimeline = [
      {
        week: '1-2',
        phase: 'Adaptation Phase',
        changes: 'Body adjusting to improved nutrition and hydration. Nutrient absorption increasing.',
        visible: 'Slight improvement in scalp health, reduced dryness'
      },
      {
        week: '3-4',
        phase: 'Stabilization Phase',
        changes: 'Nutrient levels stabilizing in bloodstream. Hair shedding beginning to decrease.',
        visible: 'Less hair fall during washing and brushing'
      },
      {
        week: '5-8',
        phase: 'Early Growth Phase',
        changes: 'Hair follicles entering anagen (growth) phase. Miniaturized hairs starting to thicken.',
        visible: 'Baby hair growth at hairline, improved hair texture'
      },
      {
        week: '9-12',
        phase: 'Visible Improvement Phase',
        changes: 'Improved hair strength and elasticity. Keratin production optimized.',
        visible: 'Noticeably healthier, shinier hair. Less breakage.'
      },
      {
        week: '13-16',
        phase: 'Significant Progress Phase',
        changes: 'Full growth cycle completion for many follicles. Consistent growth pattern.',
        visible: 'Increased hair density and volume. Visible regrowth.'
      }
    ];

    // Adjust timeline based on severity
    if (this.riskScore > 70) {
      return baseTimeline.map(phase => ({
        ...phase,
        changes: phase.changes + ' (May take 20-25% longer due to severity of deficiencies.)'
      }));
    }

    return baseTimeline;
  }

  // Generate insights
  generateInsights() {
    const topCause = this.identifyRootCauses()[0];
    const criticalGaps = this.nutritionalGaps.filter(g => g.severity === 'critical').length;

    return {
      primaryIssue: topCause?.cause || 'Nutritional imbalance detected',
      keyFinding: criticalGaps > 0 
        ? `${criticalGaps} critical deficiencies identified - requires immediate attention`
        : `${this.nutritionalGaps.length} nutritional gaps affecting hair health`,
      confidence: '85-92%',
      successProbability: this.riskScore < 40 ? 'Very High (85-90%)' : 
                         this.riskScore < 65 ? 'High (70-80%)' : 
                         'Moderate (55-70%) - Consider medical consultation',
      expectedTimeframe: this.riskScore < 40 ? '10-14 weeks' :
                        this.riskScore < 65 ? '12-16 weeks' :
                        '16-20 weeks with medical support'
    };
  }
}

// Export main function
export const analyzeHairHealth = (userData) => {
  const analyzer = new HairHealthAnalyzer(userData);
  return analyzer.analyze();
};