//  BMI calculator
function BMICalculator(entries_numerical) {
    let BMI;
    BMI = (entries_numerical["weight"] / (entries_numerical["height"]**2)) * 703
    BMI = BMI.toFixed(1);

    console.log("BMI is:  " + BMI)

    let rec = BMICalculatorInterpreter(BMI);

    return BMI;
}

function BMICalculatorInterpreter(BMI) {
    let recommendation = "";

	if (BMI <18.5) {
		recommendation = "<p>Your calculated BMI is: <b> " + BMI + "</b>.  This result is categorized as <b>underweight.</b></p>"}
	else if (BMI >=18.5 && BMI <=25) {
		recommendation = "<p>Your calculated BMI is: <b> " + BMI + "</b>.  This result is categorized as <b>normal weight.</b></p>"}
    else if (BMI >25 && BMI <29.9) {
        recommendation = "<p>Your calculated BMI is: <b> " + BMI + "</b>.  This result is categorized as <b>overweight.</b></p>"}
    else if (BMI >=30 && BMI <34.9) {
        recommendation = "<p>Your calculated BMI is: <b> " + BMI + "</b>.  This result is categorized as <b>Class 1 Obesity.</b></p>"}
    else if (BMI >=35 && BMI <39.9) {
        recommendation = "<p>Your calculated BMI is: <b> " + BMI + "</b>.  This result is categorized as <b>Class 2 Obesity.</b></p>"}
    else if (BMI >= 40) {
        recommendation = "<p>Your calculated BMI is: <b> " + BMI + "</b>.  This result is categorized as <b>Class 3 Obesity.</b></p>"}

		return recommendation;
    }



function basalMetabolicRate (entries_num, entries_rb) {
    console.log("ENTERED BMR FUNCTION................")
    let bmr = 0;

    if ((entries_rb["Gender"]) == "Male") {
        bmr = 66.5 + (13.75 * (entries_num['weight']/2.2)) + (5.003 * (entries_num['height'])*2.54) - (6.75 * (entries_num['Age'])) }  ;
    if ((entries_rb["Gender"]) == "Female") {
        bmr = 655.1 + (9.563 * (entries_num['weight']/2.2)) + (1.850 * (entries_num['height'])*2.54) - (4.676 * (entries_num['Age']))   ;
    }
    bmr = Math.round(bmr);
    console.log("BMR is:  " + bmr);
    return bmr;
}

function tee (entries_num, entries_rb) {
    console.log("ENTERED TEE FUNCTION................")
    let tee;
    let bmr;
    bmr = basalMetabolicRate(entries_num, entries_rb);

    if (entries_rb['exercise'] == 'None') {
        tee = bmr * 1.2;
    }
    if (entries_rb['exercise'] == "1-150 minutes of moderate physical activity") {
        tee = bmr * 1.375;
    }
    if ((entries_rb['exercise'] == "More than 75 minutes of vigorous physical activity") || (entries_rb['exercise'] == "More than 150 minutes of moderate physical activity")) {
        tee = bmr * 1.725;
    }
    tee = Math.round(tee);
    console.log("TEE is:  " + tee);
    return tee;
}


// highRiskArray function -- identifies the "risk enhancers"

function highRiskArray() {
    console.log ("ENTERED HIGH RISK ARRAY: $$$$$$$$$$$$$$$$$$ ");
    let rec;
    let ele = document.getElementsByClassName("highRiskFactors");
    let highRiskArray = [];

    for(let i = 0; i < ele.length; i++) {

        if(ele[i].type=="checkbox") {  
            if(ele[i].checked == true) {
                highRiskArray.push(" " + (ele[i].value));
            }
        }
    }

    if ((highRiskArray.length) === 0) {
        highRiskArray = "none"
    }

        rec = "Your medical history includes the following factors that increase the risk of heart and vascular disease:  " + highRiskArray;

        console.log ("DISPLAY HIGH RISK ARRAY:  ") + highRiskArray;

        return rec;  
}


// Lipid management -- primary prevention

function lipidPrimaryManagement(entries_checkboxes, entries_radiobuttons, entries_numerical) {
    console.log("ENTERED lipidPrimaryManagement function");

    // set the default recommendation
    
    let recommendation = "<br>Based on the current lipid profile and other clinical factors, there is no need to start or add additional lipid lowering medication."

    //determine the Ten Year Risk score:
    
    let tenYearRisk = pooledCohortEquations(entries_radiobuttons, entries_numerical);
    console.log("Ten year risk using the PCE is:  " + tenYearRisk)

    // If inclusion criteria not met, use Alternate Risk Score

    if ((entries_radiobuttons["hxCACScore"] == "Yes") || (entries_radiobuttons["hsCRP"] == "Yes")) {
        tenYearRisk = localStorage.getItem("RiskTenYears");}
    if ((entries_numerical["Age"] < 40) || (entries_numerical["Age"] > 79)) {
        tenYearRisk = localStorage.getItem("RiskTenYears");}
    if (entries_numerical["Race"] == "Other") {
        tenYearRisk = localStorage.getItem("RiskTenYears");}

    console.log (tenYearRisk);

    // Identify all checked high-risk indicators

    let ele = document.getElementsByClassName("highRiskFactors");
    let highRiskArray = [];

    for(let i = 0; i < ele.length; i++) {

        if(ele[i].type=="checkbox") {  
            if(ele[i].checked == true) {
                highRiskArray.push(" " + (ele[i].value));
            }
        }
        console.log ( highRiskArray);
    }

    if ((highRiskArray.length) === 0) {
        highRiskArray = "none"
    }

    //display the reported lipid values
    
    let reportedLipidValues = "";
    reportedLipidValues = "<p>Lipid profile results:  </p> <ul><li>Total cholesterol:  " + entries_numerical["tChol"] + "</li>   <li>LDL-cholesterol:  " + entries_numerical["ldlChol"] + "</li>   <li>HDL-cholesterol:  " + entries_numerical["hdlChol"] + "</li></ul>"


    // construct the recommendation

    if ((entries_numerical["Age"] > 75)) {
        recommendation = "<p>Age is " + (entries_numerical["Age"]) + ".  Lipid management guideline is only valid in patients 75 years of age or less.  For individuals over age 75, recommend clinical assessment and risk discussion to guide therapy. </p>";
        return recommendation;
    }
    
    let LDL_C = entries_numerical["ldlChol"];
    if  (LDL_C >= 190)  {
        recommendation = "<p>LDL-cholesterol is > 190 mg/dl.  Guidelines recommend high intensity statin therapy. (class I).</p>";
        return recommendation;
    }

    if ((entries_radiobuttons["diabetic"] == "Yes") && ((40 < entries_numerical["Age"]) && (entries_numerical["Age"] <= 75))) {
        recommendation = "<p>In diabetics between 40 and 75 years of age, moderate intensity statin therapy is indicated (class I).  <br>If multiple 'risk enhancers' are present, may consider high intensity statin therapy to lower LDL by > 50% (class IIa).  Possible risk enhancers may include: long duration of diabetes(&ge; 10years in Type 2 diabetes, &ge; 20 years in Type 1 diabetes), albuminuria, retinopathy or neuropathy.  In addition, in your case, specific individual factors that increase the estimated cardiovascular risk include:  " + highRiskArray + ".  </p>";
        return recommendation;
    }

    if ( ( (entries_checkboxes["FH of familial hypercholesterolemia"] == true) && (entries_numerical["Age"] < 20) ) ) {
        recommendation = "<p>In patients under age 20 with a family history of familial hypercholesterolemia, statin therapy is recommended.</p>";
        return recommendation;
    }

    if ( ((entries_numerical["Age"] >19) && (entries_numerical["Age"] <40)) ) {
        recommendation = "<p>Since age is 20-39, it is best to estimate <u>lifetime</u> risk of ASCVD and advise healthy lifestyle to reduce risk. </p> ";
            if ((LDL_C >= 160) && (entries_checkboxes["FH of premature ASCVD"] == true))  {
                recommendation += "<p>Since LDL-cholesterol is elevated (&gt; 160) and there is family history of premature coronary artery disease, consider statin therapy.</p>";
            }
        return recommendation;
    }
    
    if (((entries_numerical["Age"] >= 40) && entries_numerical["Age"] <= 75) && (((LDL_C >= 70) && (LDL_C < 190) && (entries_radiobuttons["diabetic"] == "No")))) {
        recommendation = "<p>With no history of diabetes, age 40-75 and LDL-cholesterol 70-190, the decision to initiate therapy for hyperlipidemia is not clear and further discussion regarding the pros and cons of treatment is advised.  <br>Determining the 10-year risk of cardiovascular disease helps guide further therapeutic suggestions. <br> <br>For you, the estimated 10-year risk of a cardiovascular event is:  " + tenYearRisk + " %. </p> ";

        if (tenYearRisk < 5) {
            recommendation += "<p> This risk estimate is considered to be <b>low</b>.  <br>Recommend continued healthy lifestyle to reduce risk factors (class I).  </p>";
        }
        
        else if (5 <= tenYearRisk && tenYearRisk < 7.5) {
            recommendation += "<p>This risk estimate is considered to be <b>borderline</b>.  <br><br>Recommend risk discussion to guide therapy.  <br>When the risk calculation is borderline and treatment decision is unclear, evaluating risk enhancers can refine the risk assessment.  If multiple risk enhancers are present, consider therapy with moderate intensity statin (class IIb).<br> In your case, specific factors that increase the calculated risk include:  " + highRiskArray + ".  </p>";
        }
        else if (7.5 <= tenYearRisk && tenYearRisk < 20 ) {
            recommendation += "<p>This risk estimate is considered to be <b>intermediate</b>.<br><br>Established guidelines recommend treatment with a moderate intensity statin to reduce LDL-cholesterol by 30-49% (class I).   If multiple risk factors or risk enhancers present, may consider high intensity statin therapy.  Specific factors that add to the risk of heart or vascular disease include:  " + highRiskArray + ". <br>If treatment decision remains uncertain, determining the coronary artery calcium score may be useful. </p>";
        }
        else if(tenYearRisk >= 20 ) {
            recommendation += "<p>This risk estimate is considered to be <b>high</b>.<br>Guideline directed therapy recommenndation includes treatment with a statin to reduce LDL-cholesterol by &ge; 50 % (class I). </p> ";
        }
    }

    if ((((entries_numerical["Age"] >= 40) && entries_numerical["Age"] <= 75) && (((LDL_C >= 70) && (LDL_C < 190) && (entries_radiobuttons["diabetic"] == "No")))) && (entries_radiobuttons["hxCACScore"] == "Yes")) {

        recommendation+= "<p> A coronary artery calcium score is available.</p>";

        if (entries_radiobuttons["CACScore"] == "CAC = 0" ) {
            recommendation += "<p>Coronary calcium score is 0. This result lowers risk assessment.    <br>Consider no statin therapy, unless diabetes, family history of premature cardiovascular disease or smoking are present. </p> ";
        }
        
        if (entries_radiobuttons["CACScore"] == "CAC = 1-100" ) {
            recommendation += "<p>Coronary calcium score is 1-100. <br>Based on established guidelines, statin therapy is favored, especially after age 55.</p>";
        }

        if ((entries_radiobuttons["CACScore"] == "CAC = 101-400") || (entries_radiobuttons["CACScore"] == "CAC >400"))  {
            recommendation += "<p>Coronary calcium score is > 100. <br>Based on established guidelines, treatment recommendations include use of a high intensity statin.</p>";
        }
    }
    
    recommendation = reportedLipidValues + recommendation

    //console.log("Lipid primary prevention recommendation is:  " + recommendation);

    return recommendation;
}

// metabolicSyndrome function

function metabolicSyndrome (entries_rb, entries_num){
    let counter = 0;
    let rec = ""

    if (((entries_rb["Gender"] == "Female") && (entries_num["waist"] >= 35)) || 
    ((entries_rb["Gender"] == "Male") && (entries_num["waist"] >= 40))){
        counter += 1 }
console.log(counter)
    if ((entries_rb["hga1c"] >= 5.7) || (entries_num["fbs"] > 100)) {
        counter += 1 } 
console.log (((entries_num["hga1c"] >= 5.7) || (entries_num["fbs"] > 100)))
console.log (entries_num["waist"])
console.log (entries_num["waist"] >= 40)
console.log (counter)
    if (entries_num["systolicBp"] > 130) {
        counter += 1 }
console.log(counter)
    if (entries_num["trigs"] > 150) {
        counter += 1 }
console.log(counter)
    if (((entries_rb["Gender"] == "Female") && (entries_num["hdlChol"] <   50)) ||     ((entries_rb["Gender"] == "Male") && (entries_num["hdlChol"] < 40))) {
        counter += 1 }
console.log(counter)
    if (counter >= 3) {
        rec = "Multiple criteria (including possible high blood pressure, elevated blood sugar, increased abdominal girth, low HDL-cholesterol and/or elevated triglycerides) are present, consistent with a diagnosis of <b>metabolic syndrome.</b>  Metabolic syndrome is associated with significantly increased risks of cardiac or vascular disease.  It is best treated with a multi-pronged approach, including dietary measures, physical activity, weight control and sometimes medications.  "}
    else {rec = " "}
console.log (rec)
        return rec;
    
}

//  Pooled Cohort Equations


function pooledCohortEquations (entries_rb, entries_num) {
    console.log("ENTERED POOLED COHORT fxn");

    let tenYearRisk;
    
    // next four lines eliminate invalid entries for "race" and "age" parameters

    if (((entries_rb['Race'] == "Other") || (entries_num["Age"] < 40)) || (entries_num["Age"] > 79)) {
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

    LnAge = Math.log(entries_num['Age']);
    LnTC = Math.log(entries_num['tChol']);
    LnHDL_C = Math.log(entries_num['hdlChol']);

    if (entries_rb["onHtnMeds"]=="Yes") {
        enteredSbp = entries_num["systolicBp"]
        LnTreatedSBP = Math.log(enteredSbp);
        LnUntreatedSBP = 0;}
    else if (entries_rb["onHtnMeds"]=="No") {
        enteredSbp = entries_num["systolicBp"];
        LnUntreatedSBP = Math.log(enteredSbp)
        LnTreatedSBP = 0};

    if ((entries_rb['currentSmoker'])=="Yes") {
        Smoker = 1}
    else {Smoker = 0}

    if ((entries_rb['diabetic'])=="Yes") {
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

    const coeffAge = getCoeffAge(entries_rb['Gender'], entries_rb['Race'])
    const coeffTC = getCoeffTC(entries_rb['Gender'], entries_rb['Race']);
    const coeffHDL_C = getCoeffHDL_C(entries_rb['Gender'], entries_rb['Race']);
    const coeffTreatedSBP = getCoeffTreatedSBP(entries_rb['Gender'], entries_rb['Race'], entries_rb["onHtnMeds"]);
    const coeffUntreatedSBP = getCoeffUntreatedSBP(entries_rb['Gender'], entries_rb['Race'], entries_rb["onHtnMeds"]);
    const coeffSmoker = getCoeffSmoker(entries_rb['Gender'], entries_rb['Race']);
    const coeffDiabetes = getCoeffDiabetes(entries_rb['Gender'], entries_rb['Race']);

    // console.log("coeffAge:" + coeffAge);
    // console.log("coeffTC:" + coeffTC);
    // console.log("coeffHDL-C:" + coeffHDL_C);
    // console.log("coeffTreatedSBP:" + coeffTreatedSBP);
    // console.log("coeffUntreatedSBP:" + coeffUntreatedSBP);


    // get coefficients for each interaction, based on gender and race

    const coeffAgeSquared = getCoeffLnAgeSquared(entries_rb['Gender'], entries_rb['Race']);
    const coeffAgexTC = getCoeffLnAgexLnTC(entries_rb['Gender'], entries_rb['Race']);
    const coeffAgexHDL_C = getCoeffLnAgexLnHDL_C(entries_rb['Gender'], entries_rb['Race']);
    const coeffAgexTreatedSBP = getCoeffLnAgexLnTreatedSBP(entries_rb['Gender'], entries_rb['Race'], entries_rb["onHtnMeds"]);
    const coeffAgexUntreatedSBP = getCoeffLnAgexLnUntreatedSBP(entries_rb['Gender'], entries_rb['Race'], entries_rb["onHtnMeds"]);
    const coeffAgexSmoking = getCoeffLnAgexSmoking(entries_rb['Gender'], entries_rb['Race']);

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
    let meanSum = getMeanSum(entries_rb['Gender'], entries_rb['Race']);
    let baselineSurvival = getBaselineSurvival(entries_rb['Gender'], entries_rb['Race']);
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
    let dmPresent = entries_rb["diabetic"];
    let fbs = entries_num["fbs"];

    if (chf == "Yes" || ascvd == "Yes") {
        additionalAdvice = "<p>Since there is a known history of cardiovascular disease or a history of congestive heart failure, the use of an SGLT-1 inhibitor may confer significant reduction in future cardiac events or worsening heart failure. </p> "
    }

    console.log ("now on line 436")
    if (HgA1C < 5.7 && dmPresent == "No") {
        rec = "<p>The reported HgA1C level of <b>" + HgA1C + "</b> indicates there is no evidence of diabetes.</p>  Continue current dietary and activity recommendations. " }
    else if ((((HgA1C >= 5.7) && (HgA1C < 6.5)) && (dmPresent == "No")) || ((fbs > 100) && (fbs <125))) {
        rec = "<p>The reported HgA1C level and/or fasting blood glucose level (HgA1C:  " + HgA1C + ", FBS:  " + fbs +") indicates there is no evidence of diabetes, but 'pre-diabetes' is present.</p>  Recommendation:  Following excellent dietary and activity patterns (and occasionally medications) can help delay the onset of type 2 diabetes.  " }
    else if (HgA1C < 6.5 && dmPresent == "Yes") {
        rec = "<p>The reported HgA1C level of <b>" + HgA1C + "</b> indicates diabetes is well-controlled.</p>  Continue current dietary, activity and medication therapy for diabetes management.  " + additionalAdvice }
    else if (HgA1C >= 6.5 && HgA1C <= 7.0) {
        rec = "<p>The reported HgA1C level of <b>" + HgA1C + "</b> indicates diabetes is adequately controlled, but borderline.</p>  Continue dietary, activity and medication therapy for diabetes management.  Consider intensifying therapy to lower HgA1C. " + pcDiabetesRec + "  " + additionalAdvice}
    else if (HgA1C > 7.0) {
        rec = "<p>The reported HgA1C level of <b>" + HgA1C + "</b> indicates diabetes is not adequately controlled.</p>  Consider intensifying therapy to lower HgA1C.  " + pcDiabetesRec +  "  " + additionalAdvice}
    console.log ("now on line 447")
    console.log(rec)
    let metabolicSyndromeRec = metabolicSyndrome(entries_rb, entries_num);
    console.log ("metabolicSyndromeRec is: " + metabolicSyndromeRec)
    rec += "<p> " + metabolicSyndromeRec + "</p>"

    console.log(rec);

    return rec;
}

function diabetesPrevCare(entries_rb, entries_num) {

    let rec = diabetes(entries_rb, entries_num);

    var displayText = document.getElementById("pcType2DiabetesText");
    displayText.innerHTML = pcDiabetesText;

    let displayRec = document.getElementById("pcType2DiabetesRec");
    displayRec.innerHTML = rec;
}

function dietAndNutrition (entries_num, entries_rb, entries_cb) {

    console.log ("ENTERED dietAndNutrition function")

    let result = "<p>You reported that you eat beef or pork " + entries_num['redMeatNumber'] + " times per week. Red meat (beef and pork) is higher in saturated fat than white meat and plant-based proteins. There is a link between high saturated fat intake and risk of heart disease; therefore, it is recommended to limit red meat intake to no more than 3 times per week. Make most of your protein choices lean (low in saturated fat), such as chicken, turkey, fish, shellfish, and plant-based proteins. Good sources of plant-based protein include beans, lentils, soy products (tofu, tempeh, edamame, TVP or texturized vegetable protein), quinoa, nuts, and seeds." 
    
    let teeValue = tee(entries_num, entries_rb);
    let fatGrams = teeValue * 0.10/9;
    fatGrams = Math.round(fatGrams);

    console.log("TEE is: "+teeValue);


    result += "<p>You reported that your main cooking fat is " + entries_rb['fatsInCooking']  + ".   Butter, lard, shortening, coconut oil, and bacon drippings are concentrated sources of saturated fat. High saturated fat intake is linked to elevated LDL (“bad”) cholesterol levels and increased risk of heart disease. It is recommended to limit your saturated fat intake to no more than 10% of total calories. For you, that would equal a maximum of " + fatGrams + " grams saturated fat per day.  </p> "
    
    
    result += "<p>You reported that you consume " + entries_num["fruitNumber"] + " servings of fruit and " + entries_num["vegetableNumber"] + " servings of vegetables daily.  Your combined total daily servings of fruits and vegetables is " + (Number(entries_num["fruitNumber"]) +  Number(entries_num["vegetableNumber"])) + ".  </p>   <p> It is recommended to consume a minimum of 5 combined servings of fruit and vegetables daily, as they are a good source of phytonutrients, such as antioxidants, and fiber. A serving of fruit is equal to a tennis ball-sized piece of fruit, 1 cup of chopped fresh fruit, or 2 Tablespoons dried fruit (no sugar added). A serving of vegetables is equal to ½ cup cooked, 1 cup raw, or 2 cups leafy greens. Choose options with higher fiber, such as eating an apple instead of drinking apple juice, to help you reach the minimum goal of 25 grams fiber per day for women and 30 grams per day for men. Fiber helps reduce cardiovascular risk by lowering LDL (“bad”) cholesterol. </p> "
    

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

    result += "<p>Your preferred beverages include:  " + beverageChoicesArray + ".</p> To maintain a healthy weight and reduce the risk of heart disease, it is recommended to limit calorie-containing beverages, especially those that contain simple or refined sugars such as sugar-sweetened soda, sweet tea, energy drinks, and fruit juices. Beverages high in simple or refined sugars are linked to elevated triglyceride levels which can increase the risk of heart disease over time. Healthful beverage options include water, unsweetened carbonated water, artificially sweetened/diet/zero sugar beverages, and low-fat or fat-free milk/milk alternatives (unsweetened).  "



    result += "<p>Your response to 'Do you add salt during cooking and/or at the table?' was:  " +  entries_rb['addedSalt']  + ".  You reported that you " + entries_rb['compareLabels']  + " compare products and choose lower-sodium options when shopping. </p> <p> Diets high in added salt/sodium are linked to increased blood pressure and risk of heart disease. The recommended daily limit for sodium is 2,300mg per day. 1 tsp of salt (all varieties) is equal to 2,300mg of sodium. The majority of sodium in the Standard American Diet typically comes from processed/self-stable food and not from added salt during cooking/eating. To reduce overall sodium intake, practice reading labels prior to purchasing products from the store. A low-sodium food has less than or equal to 140mg sodium per serving. A high-sodium food has greater than or equal to 300mg sodium per serving. Examples of high-sodium foods include cured meats (bacon, ham, pepperoni, salami, deli sliced meats), processed cheese, canned vegetables, canned beans, canned meats (tuna, chicken, Spam), instant mashed potatoes or flavored rice blends, chips/pretzels/crackers/microwave popcorn, pickles, and certain condiments such as soy sauce and ketchup. Examples of lower-sodium foods include fresh or frozen fruits and vegetables, natural cheese, fresh meats, no-salt-added canned vegetables and beans, mustard, and mayonnaise. Restaurant foods tend to be very high in sodium and eating out should be limited. </p> "



    result += "<p>You indicated you eat out " + entries_num["eatOutNumber"]+ " times per week.</p>Restaurant food tends to be high in calories, added sugar, total fat, saturated fat, and sodium. It is recommended to limit eating out to a maximum of two (2) times per week. When eating out, look up nutrition information in advance. Most chain restaurants will have nutrition information posted on their website. Look for items cooked by low-fat method, such as baked, grilled, roasted, and steamed. Ask the chef not to salt food during cooking. Ask for salad dressings and sauces on the side to control intake. Choose calorie-free beverages, such as water or unsweetened tea. "



    result += pcNutritionRec;

    return result
}

function dietAndNutritionPrevCare (entries_num, entries_rb, entries_cb) {
    
    let rec = dietAndNutrition(entries_num, entries_rb, entries_cb);

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

    if ((entries_rb["hxCACScore"] == "Yes") || (entries_rb["hsCRP"] == "Yes")) {
        tenYearRisk = localStorage.getItem("RiskTenYears");}
    else if ((entries_num["Age"] < 40) || (entries_num["Age"] > 79)) {
        tenYearRisk = localStorage.getItem("RiskTenYears");}
    else if (entries_num["Race"] == "Other") {
        tenYearRisk = localStorage.getItem("RiskTenYears");}

    console.log (tenYearRisk);



    let rec = "";

    if (entries_rb["recentBpRange"] == "<120 systolic") {
        rec = "<p>Your current level of blood pressure  is classified as <b>normal.</b><br>  Following a healty lifestyle, diet, weight control and exercise will help maintain excellent blood pressure control.</p>"
        console.log(rec);
    }
    else if (entries_rb["recentBpRange"] == "120-129/<80") {
        rec = "<p>Your current level of blood pressure  is classified as <b>elevated or borderline.</b></p>  Initial treatment recommendations include weight loss, a heart-healthy diet (DASH or Mediterranean diet), sodium restriction (optimally less than 1500-2200 mg/d), potassium-rich diet, exercise (including aerobic, isometric resistance and dynamic resistance exercises), and limited alcohol (for men <3 and for women <2 drinks per day)."
        console.log(rec);
    }
    
    else if (entries_rb["recentBpRange"] == "130-139/80-89") {

        if ((tenYearRisk < 10) && ((entries_rb["diabetic"] == "Yes" ) || (entries_rb["ckdPresent"] == "Yes"))) {
            rec = "<p>Your current level of blood pressure  is classified as <b>Stage 1 Hypertension and the estimated 10-year risk of cardiovascular disease is less than 10%.</b></p>  In addition, either diabetes or chronic kidney disease are present.  In adults with hypertension, initial recommendations include weight loss, heart-healthy diet (DASH or DASH Mediterranean diet), sodium restriction (optimally less than 1500-2200 mg/d), potassium-rich diet with supplements as necessary, exercise including aerobic, isometric resistance (hand-grip), dynamic resistance (weights), and limited alcohol (men <3 and women <2 per day).  With Stage 1 hypertension, use of BP-lowering medication is recommended with a BP target of <130/80 mm Hg. "
        }
        else if (tenYearRisk < 10) {
            rec = "<p>Your current level of blood pressure  is classified as <b>Stage 1 Hypertension and the estimated 10-year risk of cardiovascular disease is less than 10%.</b></p>  Non-drug therapy is recommended as the initial treatment.  In adults with hypertension, initial recommendations include weight loss, heart-healthy diet (DASH or DASH Mediterranean diet), sodium restriction (optimally less than 1500-2200 mg/d), potassium-rich diet with supplements as necessary, exercise including aerobic, isometric resistance (hand-grip), dynamic resistance (weights), and limited alcohol (men <3 and women <2 per day).  A blood pressure target of <130/80 mm Hg is recommended. "
        }
        else if (((tenYearRisk >= 10) || (entries_rb["diabetic"] == "Yes" )) || entries_rb["ckdPresent"] == "Yes")  {
            rec = "<p>Your current level of blood pressure  is classified as <b>Stage 1 Hypertension.  In addition, either the estimated 10-year risk of cardiovascular disease is greater than 10%, diabetes is present or there is evidence of chronic kidney disease.</b></p>  Initial recommendations include weight loss, following a heart-healthy diet (DASH or DASH Mediterranean diet), sodium restriction (optimally less than 1500-2200 mg/d), potassium-rich diet with supplements as necessary, exercise including aerobic, isometric resistance (hand-grip), dynamic resistance (weights), and limited alcohol (men <3 and women <2 per day).  With Stage 1 hypertension and increased risk of cardiovascular disease, use of BP-lowering medication is recommended with a BP target of <130/80 mm Hg. "
        }
        console.log(rec);
    }

    else if (entries_rb["recentBpRange"] == "140+/90+") {
        rec = "<p>Your current level of blood pressure  is classified as <b>Stage 2 Hypertension.</b></p>   Initial recommendations include weight loss, heart-healthy diet (DASH or DASH Mediterranean diet), sodium restriction (optimally less than 1500-2200 mg/d), potassium-rich diet with supplements as necessary, exercise including aerobic, isometric resistance (hand-grip), dynamic resistance (weights), and limited alcohol (men <3 and women <2 per day).  With Stage 2 hypertension,treatment should also include BP-lowering medication. A target BP of <130/80 mm Hg is recommended."}

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

    if ((entries_rb["hxCACScore"] == "Yes") || (entries_rb["hsCRP"] == "Yes")) {
        ten_year_risk = localStorage.getItem("RiskTenYears");}
    else if ((entries_num["Age"] < 40) || (entries_num["Age"] > 79)) {
        ten_year_risk = localStorage.getItem("RiskTenYears");}
    else if (entries_num["Race"] == "Other") {
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
        rec = rec + "  This is considered to be <b>low risk</b>.<br>"}
    else if (ten_year_risk >= 5 && ten_year_risk < 7.5) {
        rec = rec + "  This is considered to be <b>borderline risk</b>.<br>"}
    else if (ten_year_risk >= 7.5 && ten_year_risk <= 20) {
        rec = rec + "  This is considered to be <b>intermediate risk</b>.<br>"}
    else if (ten_year_risk > 20) {
        rec = rec + "  This is considered to be <b>high risk</b>.<br>"
    }

    let finalRec = rec + "   " + pcRiskAssessmentRec;

    var display = document.getElementById("pcRiskAssessmentText");
    display.innerHTML = pcRiskAssessmentText;

    let displayRec = document.getElementById("pcRiskAssessmentRec");
    displayRec.innerHTML = finalRec;

    return finalRec;
    }
}

function tobaccoUse (entries_rb, entries_num) {
    console.log("ENTERED tobaccoUse FUNCTION");

    let tobaccoUser = (entries_rb["currentSmoker"]);
    let smokedPreviously = (entries_rb["priorSmoker"]);
    let ppd = (entries_num["smokingPpd"]);
    let smokingDuration = (entries_num["smokingDuration"]);
    let yearsQuit = (entries_num["yearsQuit"]);
    let secondHandSmoke = (entries_rb["secondHandSmoke"]);

    let rec = "";

    console.log ("New TobaccoUser entry is:  " +  (entries_rb["currentSmoker"]) + tobaccoUser);

    if (tobaccoUser == "Yes") {
        rec = "<p>Since you are a current smoker, there is an opportunity to reduce the risk of future cardiovascular events.  Quitting smoking and other tobacco or nicotine-containing products has immediate and long term benefits to your health. </p> ";

        if (((entries_num["smokingDuration"]) !== "") && ((entries_num["smokingPpd"]) !== "")) {
            let packYears = smokingDuration * ppd;
            rec += "<p> You reported a total of " + packYears + " pack-years of smoking.  Between 20 to 40 pack-years is considered moderate use and more than 40 pack-years is considered heavy use.  The risk of stroke or heart attack increases with heavier exposure to cigarette smoke, but quitting at any time decreases the chances of a future cardiovascular event. By one year, quitting reduces the risk of coronary heart disaease by half.</p>";

            rec = rec + "<p>" + pcTobaccoUseRec + "</p>";
        }
    }

    else if ((tobaccoUser == "No") &&  (smokedPreviously == "Yes")) {
 
        rec = "<p>Since you are a former smoker, you have already taken the important step in improving your health by quitting.  Smoking cessation dramatically decreases the chances of a future cardiovascular event. By one year, quitting reduces the risk of coronary heart disaease by half." 
        if (((entries_num["smokingDuration"]) !== "") && ((entries_num["smokingPpd"]) !== "")) {
            let packYears = smokingDuration * ppd;
            rec += "<br><br> You reported a total of " + packYears + " pack-years of smoking.  Between 20 to 40 pack-years is considered moderate use and more than 40 pack-years is considered heavy use.  The risk of cardiovascular events like stroke or heart attack increases with heavier exposure to cigarette smoke, but quitting at any time decreases the chances of a future cardiovascular event. By one year, quitting reduces the risk of coronary heart disaease by half.";
            if (secondHandSmoke == "Yes") {
                rec += "<br>Even though you are no longer smoking, avoiding second-hand smoke is still very important.";
            }
        }
    }

    else if ((tobaccoUser == "No") &&  (smokedPreviously == "No")) {
        rec = "Even though you do not smoke, exposure to smoke or vapors is still harmful.  Avoiding second-hand smoke is strongly recommended.";
    }

    return rec;
}
   
function tobaccoUsePrevCare(entries_rb, entries_num) {

    let rec = tobaccoUse (entries_rb, entries_num)
    
    var displayText = document.getElementById("pcTobaccoUseText");
    displayText.innerHTML = pcTobaccoUseText;

    let displayRec = document.getElementById("pcTobaccoUseRec");
    displayRec.innerHTML = rec;

    return rec;
}

function  weightManagement (entries_numerical, entries_radiobuttons) {
    console.log("ENTERED WEIGHT MANAGEMENT FUNCTION");

    console.log(entries_numerical);

    let bmi = BMICalculator(entries_numerical);
    let bmiDefinition = BMICalculatorInterpreter(bmi);
    let finalRec;

    let teeValue = tee(entries_numerical, entries_radiobuttons);

    
    if (bmi < 18.5) {
        finalRec = bmiDefinition + "  <br>Low bmi values are often associated with malnutrition and worse outcomes.  Consult with your health care provider regarding further evaluation and a nutritional plan."}
    else if (bmi >= 18.5 && bmi <= 25) {
        finalRec = bmiDefinition + "  <br>  Based on your sex, height, weight, age, and activity level, your daily calorie expenditure is "  + teeValue +  ".  To maintain your current weight, you should eat about this many calories every day."} 
        
        
        
        // Recommend:  continue current diet and weight control strategies.  A healthy plant-based or Mediterranean-like diet high in vegetables, fruits, nuts, whole grains, lean vegetable or animal protein (preferably fish), and vegetable fiber has been shown to lower the risk of death compared to a standard diet."}
    else if (bmi > 25) {
        finalRec = bmiDefinition + "  <br> Based on your sex, height, weight, age, and activity level, your daily calorie expenditure is "  + tee(entries_numerical, entries_radiobuttons) +  ".  Based on your BMI, you may benefit from weight reduction to reduce your risk of heart disease. At your current activity level, you should reduce your calorie intake by 500 calories per day, or consume " + (tee(entries_numerical, entries_radiobuttons)-500) + " calories per day, to lose about 1 lb per week. It is recommended to average 0.5-2 lbs of weight loss per week for sustainable weight loss. If your recommendation for weight loss is less than 1200 calories per day, you should follow-up regularly with a Registered Dietitian Nutritionist (RDN) throughout the weight loss process to allow for monitoring of adequate nutritional intake. " 
    }

    return finalRec
}

function weightManagementPrevCare (entries_numerical, entries_radiobuttons) {
console.log(entries_numerical);
    let Rec =weightManagement(entries_numerical, entries_radiobuttons);

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

    dietAndNutritionPrevCare (entries_num, entries_rb, entries_cb)

    weightManagementPrevCare(entries_num, entries_rb);

    hypertensionPrevCare (entries_rb, entries_num);

    diabetesPrevCare(entries_rb, entries_num);

    CholesterolPrevCare(entries_cb, entries_rb, entries_num);

    tobaccoUsePrevCare(entries_rb, entries_num);

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

    let response_dict_radiobuttons = retrieveValuesRadiobuttons();
    let response_dict_numerical = retrieveValuesNumericalEntries();

    determineRiskScoreCalculator(response_dict_numerical, response_dict_radiobuttons);

    return;
}

function determineRiskScoreCalculator(RDnum, RDrb) {
    console.log ("ENTERED determineRiskScore function");

    let confirmEntriesParagraph = document.getElementById("acknowledgeConfirmation");
    // console.log(confirmEntriesParagraph)
    confirmEntriesParagraph.innerHTML = "Entries are confirmed. Click submit button to continue."

    document.getElementById("confirmButton").style.display = "none";
    document.getElementById("entryButton").style.display = "block";

    if ((RDrb["hxCACScore"] == "Yes") || (RDrb["hsCRP"] == "Yes")) {
        openAlternateCalculatorsPage()}
    if ((RDnum["Age"] < 40) || (RDnum["Age"] > 79)) {
        openAlternateCalculatorsPage()}
    if (RDrb["Race"] == "Other") {
        openAlternateCalculatorsPage()}
    return;
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

    if  ((RDrb["hxCACScore"] == "Yes") || (RDrb["hsCRP"] == "Yes") || (RDnum["Age"] < 40) || (RDnum["Age"] > 79) || (RDnum["Race"] == "Other") ) {
        displayedText = alternateScore} 
    else {displayedText = "ACC/AHA ASCVD Risk Score"}

    return displayedText;
}


function returnToForm(){
    document.getElementById("entryForm").style.display = "block";
    document.getElementById("confirmButton").style.display = "block";
    document.getElementById("entryButton").style.display = "none"
    document.getElementById("printableDisplay").style.display = "none";
    document.getElementById("printButton").style.display = "none";
    document.getElementById("returnButton").style.display = "none";
    document.getElementById("closeButton").style.display = "none";
    // clear the old display
    document.getElementById("printableDisplay").innerHTML = ""
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

