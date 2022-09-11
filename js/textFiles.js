// Text for Preventive care module -- each topic has a "Text" (general discussion) and a "Rec" (individualized specific recommendation).


// test changes for commit using remote 

const pcIntroduction = "Welcome! By completing this form and answering a few questions, you’ve taken an important first step towards improving your health and protecting yourself from cardiovascular disease.  The information and recommendations presented below are all  evidence-based and validated.  Hopefully, they will provide useful guideposts on your journey to healthier living."
const pcRiskAssessmentText = "Assessment of ASCVD risk is the foundation of primary prevention. For those aged 20-39 years, it is reasonable to measure traditional risk factors every 4-6 years to identify major factors (e.g., tobacco, dyslipidemia, family history of premature ASCVD, chronic inflammatory diseases, hypertension, or type 2 diabetes mellitus [T2DM]) that provide rationale for optimizing lifestyle and tracking risk factor progression and need for treatment.";
const pcRiskAssessmentRec = "The intensity of recommended preventative measures and treatment are determined by the ten-year estimated risk of cardiovascular events.";
const pcNutritionText = "Dietary patterns associated with high cardiovascular mortality include—sugar, low-calorie sweeteners, high-carbohydrate diets, low-carbohydrate diets, refined grains, trans fat, saturated fat, sodium, red meat, and processed red meat (such as bacon, salami, ham, hot dogs, and sausage). Longstanding dietary patterns that focus on low intake of carbohydrates and a high intake of animal fat and protein as well as high carbohydrate diets are associated with increased cardiac and noncardiac mortality.";
const pcNutritionRec = "It is recommended all adults should consume a healthy plant-based or Mediterranean-like diet high in vegetables, fruits, nuts, whole grains, lean vegetable or animal protein (preferably fish), and vegetable fiber, which has been shown to lower the risk of death compared to a standard diet.";
const pcObesityText ="Adults diagnosed as overweight (body mass index [BMI] 25-29.9 kg/m2) or obese (BMI ≥30 kg/m2) are at increased risk of heart attack, stroke, peripheral vascular disease, heart failure, and atrial fibrillation compared with those of a normal weight. Obese and overweight adults will benefit from participating in comprehensive lifestyle programs that assist in adhering to a low-calorie diet (decrease by 500 kcal or 800-1500 kcal/day) and high levels of physical activity (200-300 minutes/week). Meaningful weight loss (≥5% initial weight) is associated with improved blood pressure (BP), LDL-C, triglycerides, and glucose levels, and delays the development of type 2 diabetes.";
const pcObesityRec = "Recommendation:  Follow a low-calorie diet (decrease daily caloric intake by 500 kcal or follow a calorie-restricted diet of 1200-1500 kcal/day) and engage in high levels of physical activity (200-300 minutes/week).";
const pcPhysicalActivityText = "There is extensive data showing regular aerobic physical activity lowers the risk of cardiovascular disease.  Despite this, approximately 50% of adults in the United States do not meet minimum recommendations.";
const pcPhysicalActivityRec ="Recommendations are that adults should engage in at least 150 minutes/week of moderate-intensity or 75 minutes/week of vigorous-intensity physical activity, including resistance exercise.";
const pcHypertensionText = "In the United States, hypertension accounts for more cardiovascular deaths than any other modifiable risk factor. 46% of the US population has stage I hypertension defined as systolic BP (SBP) ≥130 or diastolic BP (DBP) ≥80 mm Hg. The prevalence is higher in Blacks, Asians, and Hispanic Americans, and increases dramatically with increasing age. An increase in systolic BP of 20 mm Hg or a diastolic BP of more than 10 mm Hg are each associated with a doubling in the risk of death from stroke, heart disease, or other vascular disease."; 
const pcHypertensionRec = "In adults with elevated or borderline hypertension (BP 120-129/<80 mm Hg) or hypertension, the initial recommendations include weight loss, heart-healthy diet (DASH or DASH Mediterranean diet), sodium restriction (optimally less than 1500-2200 mg/d), potassium-rich diet with supplements as necessary, exercise including aerobic, isometric resistance (hand-grip), dynamic resistance (weights), and limited alcohol (men <3 and women <2 per day). In adults with stage I hypertension (BP 130-139/80-89 mm Hg) and estimated 10-year ASCVD risk of <10%, nonpharmacologic therapy is recommended. In those with a 10% or higher 10-year ASCVD risk, use of BP-lowering medication is recommended with a BP target of <130/80 mm Hg including persons with chronic kidney disease and diabetes. A target of <130/80 mm Hg is also recommended for Stage 2 hypertension, defined as BP ≥140/90 mm Hg with nonpharmacological and BP-lowering medication.";
const pcDiabetesText = "Type 2 Diabetes (T2DM), defined as a hemoglobin A1c (HbA1c) >6.5%, is a metabolic disorder characterized by insulin resistance leading to hyperglycemia. The development and progression are heavily influenced by dietary pattern, physical activity, and body weight. T2DM is strongly associated with the risk of developing cardiovascular disease, including heart attack, stroke and peripheral vascular disease.  Lifestyle changes including healthy diet, exercise and weight control can be effective in preventing the development of T2DM and controlling blood sugar.";
const pcDiabetesRec = "Nutritional counseling regarding a diet to promote weight loss and glycemic control.  Diets such as Mediterranean, DASH or vegan/vegetarian are beneficial.  Moderate to vigorous exercise of at least 150 minutes per week promotes a reduction in HgA1C of approximately 0.7 percentage points.  Any additional risk factors (smoking, hypertension, hyperlipidemia) should also be addressed.  For medication therapy, metformin is the standard for initial therapy, with a goal HgA1C of 6.6-7.0.  Use of metformin is associated with significant reduction in rates of heart attack and death.  Other agents, including the SGLT-1 inhibitors and the GLP-1R agonists, also reduce cardiovascular events in patients with known cardiovascular disease or at high risk for cardiovascular events.  These medications may also have a role in primary prevention of atherosclerotic vascular disease.";
const pcCholesterolText = "High cholesterol is closely associated with developing vascular disease, heart attack and stroke.  Prevention of cardiovascular disease requires assessing risk factors beginning in childhood and maintaining excellent control of cholesterol and other lipids throughout life.  A healthy lifestyle, diet, exercise, weight control and medications all have a role in reducing the risks of high cholesterol.";
const pcCholesterolRec = "";
const pcTobaccoUseText = "Tobacco use is the leading preventable cause of disease, disability, and death in the United States. Smoking and smokeless tobacco (e.g., chewing tobacco) increases the risk for all-cause mortality and causes cardiovascular disease. Secondhand smoke is a cause of heart attack and stroke, and almost one third of heart attack related deaths are attributable to smoking and exposure to secondhand smoke. Even low levels of smoking increase risks of heart attack; thus, reducing the number of cigarettes per day does not totally eliminate risk. Electronic Nicotine Delivery Systems (ENDS), known as e-cigarettes and vaping, emit aerosol containing fine and ultrafine particulates, nicotine, and toxic gases that may increase risk for cardiovascular and pulmonary diseases, arrhythmias and high blood pressure.";
const pcTobaccoUseRec = "Smokers are strongly advised to quit.  Tobacco use is addictive and quiting is difficult.   Sometimes, referral to specialists is helpful for behavioral modification, nicotine replacement, and/or drug treatments. Treatment may include varieties of nicotine replacement, the nicotine receptor blocker varenicline, and bupropion, an antidepressant.  Also, exposure to second-hand smoke is harmful and should be avoided.  ";
const pcAspirinText="For decades, low-dose aspirin (75-100 mg with US 81 mg/day) has been widely administered for ASCVD prevention. By irreversibly inhibiting platelet function, aspirin reduces risk of atherothrombosis but at the risk of bleeding, particularly in the gastrointestinal (GI) tract. Aspirin is well established for secondary prevention of ASCVD and is widely recommended for this indication, but recent studies have shown that in the modern era, aspirin should not be used in the routine primary prevention of ASCVD due to lack of net benefit. Most important is to avoid aspirin in persons with increased risk of bleeding including a history of GI bleeding or peptic ulcer disease, bleeding from other sites, age >70 years, thrombocytopenia, coagulopathy, chronic kidney disease, and concurrent use of nonsteroidal anti-inflammatory drugs, steroids, and anticoagulants.";
const pcAspirinRec = "The following are recommendations based on meta-analysis and three recent trials: <br> <ul> <li>  Low-dose aspirin might be considered for primary prevention of ASCVD in select higher risk adults aged 40-70 years who are not at increased bleeding risk.</li> <li>Low-dose aspirin should not be administered on a routine basis for primary prevention of ASCVD among adults >70 years.</li> <li>Low-dose aspirin should not be administered for primary prevention among adults at any age who are at increased bleeding risk.</li> </ul>";
const pcConclusion = "Congratulations! You have completed an important first step towards improving your health. The recommendations above may serve as a useful action list to guide you to better health.  Good luck on your journey to healthy living!"

