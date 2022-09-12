//  BMI calculator

function BMICalculator(entries_numerical) {
    let BMI;
    BMI = (entries_numerical["Weight (lbs)"] / (entries_numerical["Height (in)"]**2)) * 703
    BMI = BMI.toFixed(1);

    console.log("BMI is:  " + BMI)

    let rec = BMICalculatorInterpreter(BMI);

    return BMI;
}

function BMICalculatorInterpreter(BMI) {
    let recommendation = "";

	if (BMI <18.5) {
		recommendation = "<p>Your calculated BMI is: <b>" + BMI + "</b>.  This result is categorized as <b>UNDERWEIGHT.</b></p>"}
	else if (BMI >=18.5 && BMI <=25) {
		recommendation = "<p>Your calculated BMI is: <b> " + BMI + "</b>.  This result is categorized as <b>NORMAL WEIGHT.</b></p>"}
    else if (BMI >25 && BMI <29.9) {
        recommendation = "<p>Your calculated BMI is: <b> " + BMI + "</b>.  This result is categorized as <b>OVERWEIGHT.</b></p>"}
    else if (BMI >=30 && BMI <34.9) {
        recommendation = "<p>Your calculated BMI is: <b> " + BMI + "</b>.  This result is categorized as <b>Class 1 Obesity.</b></p>"}
    else if (BMI >=35 && BMI <39.9) {
        recommendation = "<p>Your calculated BMI is: <b> " + BMI + "</b>.  This result is categorized as <b>Class 2 Obesity.</b></p>"}
    else if (BMI >= 40) {
        recommendation = "<p>Your calculated BMI is: <b> " + BMI + "</b>.  This result is categorized as <b>Class 3 Obesity.</b></p>"}

		return recommendation;
    }

// Lipid management -- primary prevention

function lipidPrimaryManagement(entries_checkboxes, entries_radiobuttons, entries_numerical) {
    console.log("ENTERED lipid-primary prevention function");
    
    let recommendation = "<br>Based on the current lipid profile and other clinical factors, there is no clear indication for statin therapy."
    
    let tenYearRisk = pooledCohortEquations(entries_radiobuttons, entries_numerical);
    console.log("Ten year risk using the PCE is:  " + tenYearRisk)

    // If inclusion criteria not met, use Alternate Risk Score

    if ((entries_radiobuttons["hxCACScore"] == "Yes") || (entries_radiobuttons["hsCRP?"] == "Yes")) {
        tenYearRisk = localStorage.getItem("RiskTenYears");}
    if ((entries_numerical["Age:"] < 40) || (entries_numerical["Age:"] > 75)) {
        tenYearRisk = localStorage.getItem("RiskTenYears");}
    if (entries_numerical["Race:"] == "Other") {
        tenYearRisk = localStorage.getItem("RiskTenYears");}

    console.log (tenYearRisk);


    let LDL_C = entries_numerical["LDL-cholesterol:"];

    // Identify all checked high-risk indicators

    let ele = document.getElementsByClassName("highRiskFactors");
    let highRiskArray = [];

    for(let i = 0; i < ele.length; i++) {

        if(ele[i].type=="checkbox") {  
            if(ele[i].checked == true) {
                highRiskArray.push(" " + (ele[i].value));
            }
        }
    }
    
    let reportedLipidValues = "";
    reportedLipidValues = "<p>Lipid profile results:  </p> <ul><li>Total cholesterol:  " + entries_numerical["Total cholesterol:"] + "</li>   <li>LDL-cholesterol:  " + entries_numerical["LDL-cholesterol:"] + "</li>   <li>HDL-cholesterol:  " + entries_numerical["HDL-cholesterol:"] + "</li></ul>"

    if ((entries_numerical["Age:"] > 75)) {
        recommendation = "<br>Age is " + (entries_numerical["Age:"]) + ".  Guideline only valid in patients 75 years of age or less.  For patients over age 75, recommend clinical assessment and risk discussion to guide therapy."
    }
    
    if  (LDL_C >= 190)  {
        recommendation = "LDL-cholesterol is > 190 mg/dl.  High intensity statin therapy indicated (class I)."
    }

    if ((entries_radiobuttons["Diabetic?"] == "Yes") && ((40 < entries_numerical["Age:"]) && (entries_numerical["Age:"] <= 75))) {
        recommendation = "<br>In diabetics between 40 and 75 years of age, moderate intensity statin therapy is indicated (class I).  <br>If multiple risk factors or risk enhancers (e.g. elevated CAC score, HTN, T2DM for > 10 years, T1DM > 20 years, eGFR < 60, albuminuria, retinopathy, neuropathy, ABI < 0.9, smoking, +FH), may consider high intensity statin therapy to lower LDL by > 50% (class IIa)."
    }

    if ( ( (entries_checkboxes["FH of familial hypercholesterolemia"] == true) && (entries_numerical["Age:"] < 20) ) ) {
        recommendation = "In patients under age 20 with history of familial hypercholesterolemia, statin therapy is recommended."
    }

    if ( ((entries_numerical["Age:"] >19) && (entries_numerical["Age:"] <40)) ) {
        recommendation = "In patients aged 20-39, estimate lifetime risk of ASCVD and advise healthy lifesttyle to reduce risk.  "
            if ((LDL_C >= 160) && (entries_checkboxes["FH of premature ASCVD"] == true))  {
                recommendation += "LDL is elevated. With LDL > 160 and FH of premature CAD, consider statin therapy."
            }
    }
    
    if (((entries_numerical["Age:"] >= 40) && entries_numerical["Age:"] <= 75) && (((LDL_C >= 70) && (LDL_C < 190) && (entries_radiobuttons["Diabetic?"] == "No")))) {
        recommendation = "<br>In the absence of diabetes, the decision to initiate therapy for hyperlipidemia when age is 40-75 and LDL-cholesterol is 70-190 is not clear and further discussion regarding the pros and cons of treatment is advised.  <br>Determining the 10-year risk of cardiovascular disease helps to determine further therapeutic suggestions.  <br>Based on the entered data, the 10-year risk is:  " + tenYearRisk + " %.  (> 7.5 % is considered intermediate risk, > 20 % is high risk).  <br><br>When the risk calculation is borderline and treatment decision is unclear, risk enhancers can refine the risk assessment.  <br>Certain factors may add to the estimated risk calculation.  In your case, specific individual factors that increase the calculated risk include:  " + highRiskArray + ".  <br><br>If risk decision is uncertain, determining the CAC score may be useful.  "

        if (tenYearRisk < 5) {
            recommendation = "<br><br>Low risk.  Estimated ten year risk of ASCVD is " + tenYearRisk + "%.  <br>Recommend continued healthy lifestyle to reduce risk factors (class I).  "
        }
        else if (5 <= tenYearRisk && tenYearRisk < 7.5) {
            recommendation += "<br><br>Borderline risk.  Estimated ten year risk of ASCVD is " + tenYearRisk + "%.  <br>Recommend risk discussion to guide therapy.  If multiple risk enhancing factors present, consider CAC score to further evaluate risk or consider moderate intensity statin therapy (class IIb).  ";
        }
        else if (7.5 <= tenYearRisk && tenYearRisk < 20 ) {
            recommendation += "<br><br>Intermediate risk.  Estimated ten year risk of ASCVD is " + tenYearRisk + "%.  <br>Recommend moderate intensity statin therapy indicated to reduce LDL-cholesterol by 30-49% (class I).   If multiple risk factors or risk enhancers present, may consider high intensity statin therapy.  ";
        }
        else if(tenYearRisk >= 20 ) {
            recommendation += "<br><br>High risk.  Estimated ten year risk of ASCVD is " + tenYearRisk + "%.    <br>Recommend statin therapy indicated to reduce LDL-cholesterol by >= 50 % (class I).  "
        }
    }

    if (((entries_numerical["Age:"] >= 40) && entries_numerical["Age:"] <= 75) && (((LDL_C >= 70) && (LDL_C < 190) && (entries_radiobuttons["Diabetic?"] == "No")))) {

        if (entries_radiobuttons["CAC score available?"] == "CAC = 0" ) {
                    recommendation += "Coronary calcium score is 0. This result lowers risk assessment.    <br>Consider no statin therapy, unless diabetes, FH of premature ASCVD or smoking are present.  "
        }
        
        else if (entries_radiobuttons["CAC score available?"] == "CAC = 1-100" ) {
            recommendation += "Coronary calcium score is 1-100. <br>Statin therapy is favored, especially after age 55."
        }

        else if (entries_radiobuttons["CAC score available?"] == "CAC > 100" ) {
            recommendation += "Coronary calcium score is > 100. <br>High intensity statin therapy indicated."
        }
    }
    
    recommendation = reportedLipidValues + recommendation


    //console.log("Lipid primary prevention recommendation is:  " + recommendation);

    return recommendation;
}



//  Pooled Cohort Equations


function pooledCohortEquations (entries_rb, entries_num) {
    console.log("ENTERED POOLED COHORT fxn");

    let tenYearRisk;
    
    // next four lines eliminate invalid entries for "race" and "age" parameters

    if (((entries_rb['Race:'] == "Other") || (entries_num["Age:"] < 40)) || (entries_num["Age:"] > 79)) {
        tenYearRisk = -1;  
        return tenYearRisk;
    }

    let treatedSbp, untreatedSbp;
    let enteredSbp;
    let exponent1, exponent2;
    let individualSum;
    let LnAge, LnTC, LnHDL_C, Smoker, Diabetes
    let LnTreatedSBP, LnUntreatedSBP;

    let LnAgeSquared, LnAgexLnTC, LnAgexLnHDL_C, LnAgexLnTreatedSBP, LnAgexSmoker;

    // console.log("the entries objects are:")
    // console.log (entries_rb);
    // console.log(entries_num)

// get the values of the natural log of variable values

    LnAge = Math.log(entries_num['Age:']);
    LnTC = Math.log(entries_num['Total cholesterol:']);
    LnHDL_C = Math.log(entries_num['HDL-cholesterol:']);

    if (entries_rb["On HTN Meds?"]=="Yes") {
        enteredSbp = entries_num["Systolic BP:"]
        LnTreatedSBP = Math.log(enteredSbp);
        LnUntreatedSBP = 0;}
    else if (entries_rb["On HTN Meds?"]=="No") {
        enteredSbp = entries_num["Systolic BP:"];
        LnUntreatedSBP = Math.log(enteredSbp)
        LnTreatedSBP = 0};

    if ((entries_rb['Current Smoker?'])=="Yes") {
        Smoker = 1}
    else {Smoker = 0}

    if ((entries_rb['Diabetic?'])=="Yes") {
        Diabetes = 1}
    else {Diabetes = 0}

    // console.log("LnAge:" + LnAge);
    // console.log("LnTC:" + LnTC);
    // console.log("LnHDL-C:" + LnHDL_C);
    // console.log("LnTreatedSBP:" + LnTreatedSBP);
    // console.log("LnUntreatedSBP:" + LnUntreatedSBP);

    // get the values of the interactions
    
    LnAgeSquared = LnAge * LnAge;
    LnAgexLnTC = LnAge * LnTC;
    LnAgexLnHDL_C = LnAge * LnHDL_C;
    LnAgexLnTreatedSBP = LnAge * LnTreatedSBP;
    LnAgexLnUntreatedSBP = LnAge * LnUntreatedSBP;
    LnAgexSmoker = LnAge * Smoker;


    // console.log("LnAgeSquared  " + LnAgeSquared);
    // console.log("LnAgexLnTC=  " + LnAgexLnTC);
    // console.log("LnAgexLnHDL_C=  " + LnAgexLnHDL_C);
    // console.log("LnAgexLnTreatedSBP=  " + LnAgexLnTreatedSBP);
    // console.log("LnAgexLnUntreatedSBP=  " + LnAgexLnUntreatedSBP);
    // console.log("LnAgexSmoker=  " + LnAgexSmoker);
    // console.log("Smoker = " + Smoker);
    // console.log("Diabetes = " + Diabetes);

        // get coefficients for each variable, based on gender, race

    const coeffAge = getCoeffAge(entries_rb['Gender:'], entries_rb['Race:'])
    const coeffTC = getCoeffTC(entries_rb['Gender:'], entries_rb['Race:']);
    const coeffHDL_C = getCoeffHDL_C(entries_rb['Gender:'], entries_rb['Race:']);
    const coeffTreatedSBP = getCoeffTreatedSBP(entries_rb['Gender:'], entries_rb['Race:'], entries_rb["On HTN Meds?"]);
    const coeffUntreatedSBP = getCoeffUntreatedSBP(entries_rb['Gender:'], entries_rb['Race:'], entries_rb["On HTN Meds?"]);
    const coeffSmoker = getCoeffSmoker(entries_rb['Gender:'], entries_rb['Race:']);
    const coeffDiabetes = getCoeffDiabetes(entries_rb['Gender:'], entries_rb['Race:']);

    // console.log("coeffAge:" + coeffAge);
    // console.log("coeffTC:" + coeffTC);
    // console.log("coeffHDL-C:" + coeffHDL_C);
    // console.log("coeffTreatedSBP:" + coeffTreatedSBP);
    // console.log("coeffUntreatedSBP:" + coeffUntreatedSBP);


    // get coefficients for each interaction, based on gender and race

    const coeffAgeSquared = getCoeffLnAgeSquared(entries_rb['Gender:'], entries_rb['Race:']);
    const coeffAgexTC = getCoeffLnAgexLnTC(entries_rb['Gender:'], entries_rb['Race:']);
    const coeffAgexHDL_C = getCoeffLnAgexLnHDL_C(entries_rb['Gender:'], entries_rb['Race:']);
    const coeffAgexTreatedSBP = getCoeffLnAgexLnTreatedSBP(entries_rb['Gender:'], entries_rb['Race:'], entries_rb["On HTN Meds?"]);
    const coeffAgexUntreatedSBP = getCoeffLnAgexLnUntreatedSBP(entries_rb['Gender:'], entries_rb['Race:'], entries_rb["On HTN Meds?"]);
    const coeffAgexSmoking = getCoeffLnAgexSmoking(entries_rb['Gender:'], entries_rb['Race:']);

    // console.log("coeffAgeSquared:" + coeffAgeSquared);
    // console.log("coeffAgexTC:" + coeffAgexTC);
    // console.log("coeffAgexHDL-C:" + coeffAgexHDL_C);
    // console.log("coeffcoeffAgexTreatedSBP:" + coeffAgexTreatedSBP);
    // console.log("coeffcoeffAgexUntreatedSBP:" + coeffAgexUntreatedSBP);
    // console.log("coeffAgexSmoking:" + coeffAgexSmoking);


    // calculate the products of coefficient and value for each variable
    
    const coeffTimesValue_age = coeffAge * LnAge;
    const coeffTimesValue_tc = coeffTC * LnTC;
    const coeffTimesValue_hdl_c = coeffHDL_C * LnHDL_C;
    const coeffTimesValue_treatedSBP = coeffTreatedSBP * LnTreatedSBP;
    const coeffTimesValue_untreatedSBP =  coeffUntreatedSBP * LnUntreatedSBP;
    const coeffTimesValue_currentSmoker = coeffSmoker * Smoker;
    const coeffTimesValue_diabetes = coeffDiabetes * Diabetes;

    // calculate the products of coefficient and value for each interaction
    
    const coeffTimesValue_ageSquared = coeffAgeSquared * LnAgeSquared;
    const coeffTimesValue_agexTC = coeffAgexTC * LnAgexLnTC;
    const coeffTimesValue_agexHDL_C = coeffAgexHDL_C * LnAgexLnHDL_C;
    const coeffTimesValue_agextreatedSBP = coeffAgexTreatedSBP * LnAgexLnTreatedSBP;
    const coeffTimesValue_agexuntreatedSBP = coeffAgexUntreatedSBP * LnAgexLnUntreatedSBP;
    const coeffTimesValue_agexsmoker = coeffAgexSmoking * LnAgexSmoker;


    //  debug -- check calculated values of all the products.  "Individual sum" is the sum of all calculated products.

    // console.log("Summary of entries:  " +

    //     coeffTimesValue_age,
    //     coeffTimesValue_ageSquared,
    //     coeffTimesValue_tc,
    //     coeffTimesValue_agexTC, 
    //     coeffTimesValue_hdl_c,
    //     coeffTimesValue_agexHDL_C,
    //     coeffTimesValue_treatedSBP,
    //     coeffTimesValue_agextreatedSBP,
    //     coeffTimesValue_untreatedSBP,
    //     coeffTimesValue_agexuntreatedSBP, 
    //     coeffTimesValue_currentSmoker,
    //     coeffTimesValue_agexsmoker,
    //     coeffTimesValue_diabetes
    // );



    // add up all the products to get the individual sum

    individualSum = (coeffTimesValue_age + coeffTimesValue_tc + coeffTimesValue_hdl_c + coeffTimesValue_treatedSBP + coeffTimesValue_untreatedSBP + 
    coeffTimesValue_currentSmoker + coeffTimesValue_diabetes + coeffTimesValue_ageSquared + coeffTimesValue_agexTC + coeffTimesValue_agexHDL_C + coeffTimesValue_agextreatedSBP + 
    coeffTimesValue_agexuntreatedSBP + coeffTimesValue_agexsmoker);

    // console.log("individualSum: " + individualSum);


    // get the values for mean sum and baseline survival
    let meanSum = getMeanSum(entries_rb['Gender:'], entries_rb['Race:']);
    let baselineSurvival = getBaselineSurvival(entries_rb['Gender:'], entries_rb['Race:']);
    //console.log("retrieved value for Baseline Survival = " + baselineSurvival);
      
    exponent1 = individualSum-meanSum;
    // console.log("indiv sum = " + individualSum);
    // console.log("mean sum = " + meanSum);
    // console.log("exponent1 = " + exponent1);
    exponent2 = Math. exp(exponent1);
    //console.log("exponent2 = " + exponent2);

    const survivalRate = Math. pow (baselineSurvival, exponent2 )
    //console.log("Calculated survival rate=  " + survivalRate)
    

    tenYearRisk = 1 - survivalRate;  // 10-yr risk is 1-survival rate
    tenYearRisk = tenYearRisk * 100;
    tenYearRisk = parseFloat(tenYearRisk);
    tenYearRisk = tenYearRisk.toFixed(1);


    console.log("10 year risk of ASCVD by Pooled Cohort Equations is:  " + tenYearRisk + "%");

    return tenYearRisk;   
}


// Functions to use for Preventive Care module


function aspirin(entries_rb) {
    console.log("ENTERED aspirin FUNCTION");

    let aspirinUser = (entries_rb["Using aspirin regularly?"]);
    let rec = "";

    rec = pcAspirinRec;

    return rec;
}

function aspirinPrevCare (entries_rb){
    let pcRec = aspirin(entries_rb);

    var displayText = document.getElementById("pcAspirinUseText");
    displayText.innerHTML = pcAspirinText;

    let displayRec = document.getElementById("pcAspirinUseRec");
    displayRec.innerHTML = pcRec;
}

function Cholesterol(entries_cb, entries_rb, entries_num) {
    console.log("ENTERED Cholesterol FUNCTION");

    let rec = lipidPrimaryManagement(entries_cb, entries_rb, entries_num);

    console.log(rec);

    return rec;
}

function CholesterolPrevCare (entries_cb, entries_rb, entries_num) {

    let rec = Cholesterol(entries_cb, entries_rb, entries_num);

    var display = document.getElementById("pcCholesterolText");
    display.innerHTML = pcCholesterolText;

    let displayRec = document.getElementById("pcCholesterolRec");
    displayRec.innerHTML = rec;

    return rec;
}

function diabetes(entries_rb, entries_num) {
    console.log("ENTERED diabetes FUNCTION");

    let rec = "";
    let additionalAdvice = "";
    let HgA1C = entries_num["hga1c"];
    let ascvd = entries_rb["hxVascularDz"];
    let chf = entries_rb["hxCHF"];
    let dmPresent = entries_rb["Diabetic?"];
    let fbs = entries_num["fbs"];

    if (chf == "Yes" || ascvd == "Yes") {
        additionalAdvice = "<p>Since there is a known history of cardiovascular disease or a history of congestive heart failure, the use of an SGLT-1 inhibitor may confer significant reduction in future cardiac events or worsening heart failure. </p> "
    }

    if (HgA1C < 6.5 && dmPresent == "No") {
        rec = "<p>The reported HgA1C level of <b>" + HgA1C + "</b> indicates there is no evidence of diabetes.</p>  Continue current dietary, activity and medication therapy for diabetes management.  " }
    else if (HgA1C < 6.5 && dmPresent == "Yes") {
        rec = "<p>The reported HgA1C level of <b>" + HgA1C + "</b> indicates diabetes is well-controlled.</p>  Continue current dietary, activity and medication therapy for diabetes management.  " + additionalAdvice }
    else if (HgA1C >= 6.5 && HgA1C <= 7.0) {
        rec = "<p>The reported HgA1C level of <b>" + HgA1C + "</b> indicates diabetes is adequately controlled, but borderline.</p>  Continue current dietary, activity and medication therapy for diabetes management.  Consider intensifying therapy to lower HgA1C.  " + pcDiabetesRec + "  " + additionalAdvice}
    else if (HgA1C > 7.0) {
        rec = "<p>The reported HgA1C level of <b>" + HgA1C + "</b> indicates diabetes is not adequately controlled.</p>  Consider intensifying therapy to lower HgA1C.  " + pcDiabetesRec +  "  " + additionalAdvice}

    return rec;
}

function diabetesPrevCare(entries_rb, entries_num) {

    let rec = diabetes(entries_rb, entries_num);

    var displayText = document.getElementById("pcType2DiabetesText");
    displayText.innerHTML = pcDiabetesText;

    let displayRec = document.getElementById("pcType2DiabetesRec");
    displayRec.innerHTML = rec;
}

function dietAndNutrition (entries_num, entries_cb) {

    console.log ("ENTERED dietAndNutrition function")

    let result = "<p>Currently, you usually eat " + entries_num["mealNumber"] + " meals and have " + entries_num["snackNumber"] + " snacks each day.</p>"

    result += "<p>In a typical week, you eat out " + entries_num["eatOutNumber"]+ " times.</p>"
    
    result += "<p>Daily servings include:  <ul><li>Fruits or fruit juice:  " + entries_num["fruitNumber"] + "</li><li>Vegetables or vegetable juice:  " + entries_num["vegetableNumber"] + "</li> <li>Legumes :  " + entries_num["legumesNumber"] +"</li></ul></p>"

    // Identify all checked beverage choices

    let ele = document.getElementsByClassName("beverageChoices");
    let beverageChoicesArray = [];

    for(let i = 0; i < ele.length; i++) {

        if(ele[i].type=="checkbox") {  
            if(ele[i].checked == true) {
                beverageChoicesArray.push(" " + (ele[i].value));
            }
        }
    }

    result += "<p>Your preferred beverages include:  " + beverageChoicesArray + ".</p>"

    result += pcNutritionRec;

    return result
}

function dietAndNutritionPrevCare (entries_num, entries_cb) {
    
    let rec = dietAndNutrition(entries_num, entries_cb);

    var displayText = document.getElementById("pcDietAndNutritionText");
    displayText.innerHTML = pcNutritionText;

    let displayRec = document.getElementById("pcDietAndNutritionRec");
    displayRec.innerHTML = rec;

    return rec
}

function exerciseAndActivity(entries_rb) {

    console.log ("ENTERED exerciseAndActivity function")

    let result = "<p>Your current level of exercise is:  " + entries_rb["exercise"] + " per week.  </p>"

    result += pcPhysicalActivityRec;
    return result
}

function exerciseAndActivityPrevCare(entries_rb) {

    let rec = exerciseAndActivity(entries_rb);

    var displayText = document.getElementById("pcExerciseAndActivityText");
    displayText.innerHTML = pcPhysicalActivityText;

    let displayRec = document.getElementById("pcExerciseAndActivityRec");
    displayRec.innerHTML = rec;
    return rec
}


function hypertension (entries_rb, entries_num) {
    console.log("ENTERED hypertension FUNCTION");

    let tenYearRisk = pooledCohortEquations(entries_rb, entries_num);
    console.log("Ten year risk using the PCE is:  " + tenYearRisk);

    // If inclusion criteria not met, use Alternate Risk Score

    if ((entries_rb["hxCACScore"] == "Yes") || (entries_rb["hsCRP?"] == "Yes")) {
        tenYearRisk = localStorage.getItem("RiskTenYears");}
    else if ((entries_num["Age:"] < 40) || (entries_num["Age:"] > 75)) {
        tenYearRisk = localStorage.getItem("RiskTenYears");}
    else if (entries_num["Race:"] == "Other") {
        tenYearRisk = localStorage.getItem("RiskTenYears");}

    console.log (tenYearRisk);



    let rec = "";

    if (entries_rb["Recent BP range:"] == "<120 systolic") {
        rec = "<p>Your current level of blood pressure  is classified as <b>normal.</b><br>  Following a healty lifestyle, diet, weight control and exercise will help maintain excellent blood pressure control.</p>"
        console.log(rec);
    }
    else if (entries_rb["Recent BP range:"] == "120-129/<80") {
        rec = "<p>Your current level of blood pressure  is classified as <b>elevated or borderline.</b></p>  Initial treatment recommendations include weight loss, heart-healthy diet (DASH or Mediterranean diet), sodium restriction (optimally less than 1500-2200 mg/d), potassium-rich diet, exercise (including aerobic, isometric resistance and dynamic resistance exercises), and limited alcohol (for men <3 and for women <2 drinks per day)."
        console.log(rec);
    }
    
    else if (entries_rb["Recent BP range:"] == "130-139/80-89") {

        if ((tenYearRisk < 10) && ((entries_rb["Diabetic?"] == "Yes" ) || (entries_rb["CKD present?"] == "Yes"))) {
            rec = "<p>Your current level of blood pressure  is classified as <b>Stage 1 Hypertension and estimated 10-year risk of cardiovascular disease is less than 10%.</b></p>  Either diabetes or chronic kidney disease are present.  Use of BP-lowering medication is recommended with a BP target of <130/80 mm Hg. "
        }
        else if (tenYearRisk < 10) {
            rec = "<p>Your current level of blood pressure  is classified as <b>Stage 1 Hypertension and estimated 10-year risk of cardiovascular disease is less than 10%.</b></p>  Nonpharmacologic therapy is recommended as the initial treatment.  A BP target of <130/80 mm Hg is recommended. "
        }
        else if (((tenYearRisk >= 10) || (entries_rb["Diabetic?"] == "Yes" )) || entries_rb["CKD present?"] == "Yes")  {
            rec = "<p>Your current level of blood pressure  is classified as <b>Stage 1 Hypertension and estimated 10-year risk of cardiovascular disease is greater than 10% or either diabetes or chronic kidney disease are present.</b></p>  Use of BP-lowering medication is recommended with a BP target of <130/80 mm Hg. "
        }
        console.log(rec);
    }

    else if (entries_rb["Recent BP range:"] == "140+/90+") {
        rec = "<p>Your current level of blood pressure  is classified as <b>Stage 2 Hypertension.</b></p>  A target BP of <130/80 mm Hg is recommended.  Treatment should include nonpharmacological and BP-lowering medication."}

    console.log("REC for hypertension is:  " + rec);

    return rec;
}

function hypertensionPrevCare (entries_rb, entries_num) {

    let rec = hypertension (entries_rb, entries_num);

    var displayText = document.getElementById("pcHypertensionText");
    displayText.innerHTML = pcHypertensionText;

    let displayRec = document.getElementById("pcHypertensionRec");
    displayRec.innerHTML = rec;

    return rec;
}

               
function tenYearRiskAssessment(entries_rb, entries_num) {
    console.log("ENTERED tenYearRiskAssessment FUNCTION");

    let ten_year_risk = pooledCohortEquations (entries_rb, entries_num);
    console.log("Ten year risk using the PCE is:  " + ten_year_risk)

    // If inclusion criteria not met, use Alternate Risk Score

    if ((entries_rb["hxCACScore"] == "Yes") || (entries_rb["hsCRP?"] == "Yes")) {
        ten_year_risk = localStorage.getItem("RiskTenYears");}
    else if ((entries_num["Age:"] < 40) || (entries_num["Age:"] > 75)) {
        ten_year_risk = localStorage.getItem("RiskTenYears");}
    else if (entries_num["Race:"] == "Other") {
        ten_year_risk = localStorage.getItem("RiskTenYears");}

    console.log (ten_year_risk);


    let rec = "";
    if (ten_year_risk == -1) {
        let finalRec = "The estimated ten-year risk of cardiovascular disease calculated by the pooled cohort equations is only validated for whites and non-hispanic blacks between the ages of 40 and 79.    An alternative risk assessment tool should be considered in other ethnic and age groups.  ";
        console.log(rec);
        return finalRec;
    }
    else {

    let rec = "Your estimated risk of developing cardiovascular disease in the next 10 years is:  <br><br> <b>" + ten_year_risk + "</b>%. <br><br>"
    
    let sourceDisplay = displaySourceOfRiskScore();
    rec += "This estimated risk score is derived from:  " + sourceDisplay + "<br></br>"

    if (ten_year_risk < 5) {
        rec = rec + "  This is considered to be <b>low risk</b>."}
    else if (ten_year_risk >= 5 && ten_year_risk < 7.5) {
        rec = rec + "  This is considered to be <b>intermediate risk</b>."}
    else if (ten_year_risk >= 7.5 && ten_year_risk <= 20) {
        rec = rec + "  This is considered to be <b>high risk</b>."}
    else if (ten_year_risk > 20) {
        rec = rec + "  This is considered to be <b>very high risk</b>."
    }

    let finalRec = rec + "   " + pcRiskAssessmentRec;

    var display = document.getElementById("pcRiskAssessmentText");
    display.innerHTML = pcRiskAssessmentText;

    let displayRec = document.getElementById("pcRiskAssessmentRec");
    displayRec.innerHTML = finalRec;

    return finalRec;
    }
}

function tobaccoUse (entries_rb) {
    console.log("ENTERED tobaccoUse FUNCTION");

    let tobaccoUser = (entries_rb["Current smoker?"]);
    let rec = "";

    if (tobaccoUser == "Yes") {
        rec = "<p>Since you are a current smoker, there is an opportunity to reduce the risk of future cardiovascular events.  Quitting smoking and other tobacco or nicotine-containing products has immediate and long term benefits to your health.  </p> "
        rec = rec + pcTobaccoUseRec}
    else if (tobaccoUser == "No") {
        rec = "Even though you do not smoke, exposure to smoke or vapors is still harmful.  Avoiding second-hand smoke is strongly recommended."
    }

    return rec;
}
   
function tobaccoUsePrevCare(entries_rb) {

    let rec = tobaccoUse (entries_rb)
    
    var displayText = document.getElementById("pcTobaccoUseText");
    displayText.innerHTML = pcTobaccoUseText;

    let displayRec = document.getElementById("pcTobaccoUseRec");
    displayRec.innerHTML = rec;

    return rec;
}


function  weightManagement (entries_numerical) {
    console.log("ENTERED WEIGHT MANAGEMENT FUNCTION");

    console.log(entries_numerical);

    let bmi = BMICalculator(entries_numerical);
    let bmiDefinition = BMICalculatorInterpreter(bmi);
    let finalRec;
    
    if (bmi < 18.5) {
        finalRec = bmiDefinition + "  <br>Low bmi values are often associated with malnutrition and worse outcomes.  Consult with your health care provider regarding further evaluation and a nutritional plan."}
    else if (bmi >= 18.5 && bmi <= 25) {
        finalRec = bmiDefinition + "  <br>Continue current diet and weight control strategies.  A healthy plant-based or Mediterranean-like diet high in vegetables, fruits, nuts, whole grains, lean vegetable or animal protein (preferably fish), and vegetable fiber has been shown to lower the risk of death compared to a standard diet."}
    else if (bmi > 25) {
        finalRec = bmiDefinition + "  <br>" + pcObesityRec;
    }

    return finalRec
}

function weightManagementPrevCare (entries_numerical) {
console.log(entries_numerical);
    let Rec =weightManagement(entries_numerical);

    var displayText = document.getElementById("pcWeightManagementText");
    displayText.innerHTML = pcObesityText;

    let displayRec = document.getElementById("pcWeightManagementRec");
    displayRec.innerHTML = Rec;

    return Rec
}


// Comprehensive recommendation function

function comprehensiveRec(entries_cb, entries_rb, entries_num) {
    
    console.log ("ENTERED ComprehensiveRec FUNCTION")

    let selectedDiv = "printableDisplay";

    createElement (selectedDiv, "H1", "pcHeader", "Preventive Care Recommendations:");

    let textEntries = retrieveValuesTextboxEntries()
    createElement (selectedDiv, "p", "pcHeaderParagraph", "Prepared exclusively for:  " + textEntries["name"]);
    
    createElement (selectedDiv, "H2", "pcIntroHeader", "Introduction:");
    createElement (selectedDiv, "p", "pcIntroParagraph", pcIntroduction);

    createElement (selectedDiv, "H2", "pcRiskAssessmentSubtitle", "Risk assessment:");
    createElement (selectedDiv, "p", "pcRiskAssessmentText", pcRiskAssessmentText);
    createElement (selectedDiv, "p", "pcRiskAssessmentRec", "");
    
    tenYearRiskAssessment(entries_rb, entries_num);

    createElement (selectedDiv, "H2", "pcDietAndNutritionSubtitle", "Diet and Nutrition:");
    createElement (selectedDiv, "p", "pcDietAndNutritionText", pcNutritionText);
    createElement (selectedDiv, "p", "pcDietAndNutritionRec", pcNutritionRec);

    createElement (selectedDiv, "H2", "pcExerciseAndActivitySubtitle", "Exercise and Physical Activity:");
    createElement (selectedDiv, "p", "pcExerciseAndActivityText", pcPhysicalActivityText);
    createElement (selectedDiv, "p", "pcExerciseAndActivityRec", pcPhysicalActivityRec);

    createElement (selectedDiv, "H2", "pcWeightManagementSubtitle", "Weight Management:");
    createElement (selectedDiv, "p", "pcWeightManagementText", pcObesityText);
    createElement (selectedDiv, "p", "pcWeightManagementRec", pcObesityRec);

    createElement (selectedDiv, "H2", "pcHypertensionSubtitle", "Hypertension (High blood pressure):");
    createElement (selectedDiv, "p", "pcHypertensionText", pcHypertensionText);
    createElement (selectedDiv, "p", "pcHypertensionRec", pcHypertensionRec);

    createElement (selectedDiv, "H2", "pcType2DiabetesSubtitile", "Type 2 Diabetes:");
    createElement (selectedDiv, "p", "pcType2DiabetesText", pcDiabetesText);
    createElement (selectedDiv, "p", "pcType2DiabetesRec", pcDiabetesRec);

    createElement (selectedDiv, "H2", "pcCholesterolSubtitle", "Cholesterol:");
    createElement (selectedDiv, "p", "pcCholesterolText", pcCholesterolText);
    createElement (selectedDiv, "p", "pcCholesterolRec", pcCholesterolRec);

    createElement (selectedDiv, "H2", "pcTobaccoUseSubtitle", "Tobacco Use:");
    createElement (selectedDiv, "p", "pcTobaccoUseText", pcTobaccoUseText);
    createElement (selectedDiv, "p", "pcTobaccoUseRec", pcTobaccoUseRec);

    createElement (selectedDiv, "H2", "pcAspirinSubtitle", "Aspirin:");
    createElement (selectedDiv, "p", "pcAspirinUseText", pcAspirinText);
    createElement (selectedDiv, "p", "pcAspirinUseRec", pcAspirinRec);

    createElement (selectedDiv, "H2", "pcConclusionSubtitle", "Conclusion:");
    createElement (selectedDiv, "p", "pcConclusionText", pcConclusion);

    exerciseAndActivityPrevCare(entries_rb);

    dietAndNutritionPrevCare (entries_num, entries_cb)

    weightManagementPrevCare(entries_num);

    hypertensionPrevCare (entries_rb, entries_num);

    diabetesPrevCare(entries_rb, entries_num);

    CholesterolPrevCare(entries_cb, entries_rb, entries_num);

    tobaccoUsePrevCare(entries_rb);

    aspirinPrevCare(entries_rb);

    let conclusionP = document.getElementById("pcConclusionText");
    conclusionP.innerHTML = pcConclusion;

    return selectedDiv;

}



// function to create dynamic new element, add it to div in document, and place selected text in the element for display.

function createElement (divName, elementType, elementId, text) {
    let currentDiv = document.getElementById(divName);
    let newElement = document.createElement(elementType);
    newElement.id = elementId;
    newElement.innerHTML = text;
    currentDiv.appendChild(newElement);
    // currentDiv.appendChild(document.createElement("br"));
    return
}


// function to print the contents of a div 

function printDiv(divName) {
    var divContents = document.getElementById(divName).innerHTML;
    var a = window.open('', '', 'height=500, width=500');
    a.document.write('<html>');
    a.document.write('<body > <br>');
    a.document.write(divContents);
    a.document.write('</body></html>');
    a.document.close();
    a.print();
}


// Functions below are to obtain alternate Risk Score if inclusion criteria for PCE calculation are not met.


// check to see if alternate Risk Score calculator is needed

function checkIfAlternateCalculatorNeeded(){
    console.log("ENTERED checkAlternateRS calculator function")

    //let response_dict_checkboxes = retrieveValuesCheckboxes();
    let response_dict_radiobuttons = retrieveValuesRadiobuttons();
    let response_dict_numerical = retrieveValuesNumericalEntries();

    determineRiskScoreCalculator(response_dict_numerical, response_dict_radiobuttons);

    return
}

function determineRiskScoreCalculator(RDnum, RDrb) {
    console.log ("ENTERED determineRiskScore function");

    let confirmEntriesParagraph = document.getElementById("acknowledgeConfirmation");
    console.log(confirmEntriesParagraph)
    confirmEntriesParagraph.innerHTML = "Entries are confirmed. Click submit button to continue."

    document.getElementById("confirmButton").style.display = "none";
    document.getElementById("entryButton").style.display = "block";

    if ((RDrb["hxCACScore"] == "Yes") || (RDrb["hsCRP?"] == "Yes")) {
        openAlternateCalculatorsPage()}
    if ((RDnum["Age:"] < 40) || (RDnum["Age:"] > 75)) {
        openAlternateCalculatorsPage()}
    if (RDnum["Race:"] == "Other") {
        openAlternateCalculatorsPage()}
    return
    }


function openAlternateCalculatorsPage() {
    console.log ('ENTERED openAlternateCalculatorsPage function')
    window.open("navPage.html", "_blank");
}


function acceptTenYearRiskValue() {

    // takes inputs for Alternate Risk Score and Risk Score Source and puts them into local storage and closes tab
    
    let alternateRiskScore;
    let entryBox = document.getElementById("tenYearRiskValue");
    alternateRiskScore = entryBox.value
	localStorage.setItem("RiskTenYears", alternateRiskScore);

    //get the checked source and add it to local storage
	let selectedSource;
	let ele = document.getElementsByName("riskScoreSource");
	for (i=0; i < ele.length; i++) {
		if (ele[i].checked)
		selectedSource= ele[i].value;
	}

	localStorage.setItem("Selected source", selectedSource);
    
    window. close()
    return alternateRiskScore;
}


function displaySourceOfRiskScore() {

    let displayedText;
    let alternateScore;

    RDnum = retrieveValuesNumericalEntries();
    RDrb = retrieveValuesRadiobuttons();

    alternateScore = localStorage.getItem("Selected source");

    if  ((RDrb["hxCACScore"] == "Yes") || (RDrb["hsCRP?"] == "Yes") || (RDnum["Age:"] < 40) || (RDnum["Age:"] > 75) || (RDnum["Race:"] == "Other") ) {
        displayedText = alternateScore} 
    else {displayedText = "ACC/AHA ASCVD Risk Score"}

    return displayedText;
}

function returnToForm(){
    document.getElementById("entryForm").style.display = "block";
    document.getElementById("printableDisplay").style.display = "none";
    document.getElementById("printButton").style.display = "none";
    document.getElementById("returnButton").style.display = "none";
    document.getElementById("closeButton").style.display = "none";
    return
}

function closeApplication() {
  
        // Open the new window 
        // with the URL replacing the
        // current page using the
        // _self value
        let new_window =
            open(location, '_self');

        // Close this window
        new_window.close();

        return false;
}


// function applySelectedRiskScore (entries_rb, entries_num){

//         let tenYrRisk;
        
//         let source = determineSourceOfRiskScore(entries_num, entries_rb);
        
//         if (source == "Alternate calculator") {
//         tenYrRisk = localStorage.getItem("RiskTenYears");
//         console.log (tenYrRisk);}
        
//         else tenYrRisk = pooledCohortEquations (entries_rb, entries_num);  
        
//         return tenYrRisk;
//         }


// function determineSourceOfRiskScore (num, rb) {
//     console.log ("ENTERED determineSourceofRiskScore function");
    
//     let source = ""
        
//     if ((rb["hxCACScore"] == "Yes") || (rb["hsCRP?"] == "Yes")) {
//         source = "Alternate calculator"}
//     else if ((num["Age:"] < 40) || (num["Age:"] > 75)) {
//         source = "Alternate calculator"}
//     else if (rb["Race:"] == "Other") {
//         source = "Alternate calculator"}
//     else {
//         source = "Pooled cohort equations"
//     }
//         console.log (source)
//         return source;
//     }
