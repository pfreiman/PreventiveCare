"use strict";


// Pooled Cohort Equations constants

const coeffWFemaleLnAge = -29.799
const coeffWFemaleLnTC = 13.540
const coeffWFemaleLnHDL_C = -13.578
const coeffWFemaleLnTreatedSBP = 2.019
const coeffWFemaleLnUntreatedSBP = 1.957
const coeffWFemaleSmoker = 7.574
const coeffWFemaleDiabetes = 0.661

const coeffWFemaleLnAgeSquared = 4.884
const coeffWFemaleLnAgexLnTC = -3.114
const coeffWFemaleLnAgexLnHDL_C = 3.149
const coeffWFemaleLnAgexLnTreatedSBP = 0
const coeffWFemaleLnAgexLnUntreatedSBP = 0
const coeffWFemaleLnAgexSmoker = -1.665

const coeffAAFemaleLnAge = 17.114
const coeffAAFemaleLnTC = 0.940
const coeffAAFemaleLnHDL_C = -18.920
const coeffAAFemaleLnTreatedSBP = 29.291
const coeffAAFemaleLnUntreatedSBP = 27.820
const coeffAAFemaleSmoker = 0.691
const coeffAAFemaleDiabetes = 0.874

const coeffAAFemaleLnAgeSquared = 0
const coeffAAFemaleLnAgexLnTC = 0
const coeffAAFemaleLnAgexLnHDL_C = 4.475
const coeffAAFemaleLnAgexLnTreatedSBP = -6.432
const coeffAAFemaleLnAgexLnUntreatedSBP = -6.087
const coeffAAFemaleLnAgexSmoker = 0

const coeffWMaleLnAge = 12.344
const coeffWMaleLnTC = 11.853
const coeffWMaleLnHDL_C = -7.990
const coeffWMaleLnTreatedSBP = 1.797
const coeffWMaleLnUntreatedSBP = 1.764
const coeffWMaleSmoker = 7.837
const coeffWMaleDiabetes = 0.658

const coeffWMaleLnAgeSquared = 0
const coeffWMaleLnAgexLnTC = -2.664
const coeffWMaleLnAgexLnHDL_C = 1.769
const coeffWMaleLnAgexLnTreatedSBP = 0
const coeffWMaleLnAgexLnUntreatedSBP = 0
const coeffWMaleLnAgexSmoker  = -1.795

const coeffAAMaleLnAge = 2.469
const coeffAAMaleLnTC = 0.302
const coeffAAMaleLnHDL_C = -.307
const coeffAAMaleLnTreatedSBP = 1.916
const coeffAAMaleLnUntreatedSBP = 1.809
const coeffAAMaleSmoker = 0.549
const coeffAAMaleDiabetes = 0.645

const coeffAAMaleLnAgeSquared = 0
const coeffAAMaleLnAgexLnTC = 0
const coeffAAMaleLnAgexLnHDL_C = 0
const coeffAAMaleLnAgexLnTreatedSBP = 0
const coeffAAMaleLnAgexLnUntreatedSBP = 0
const coeffAAMaleLnAgexSmoker = 0

const MeanCoeffxValueWFemale = -29.18
const MeanCoeffxValueAAFemale = 86.61
const MeanCoeffxValueWMale = 61.18
const MeanCoeffxValueAAMale = 19.54

const BaselineSurvivalWFemale = 0.9665
const BaselineSurvivalAAFemale = 0.9533
const BaselineSurvivalWMale = 0.9144
const BaselineSurvivalAAMale = 0.8954


// Next set of functions gets the appropriate coefficients

function getCoeffAge(gender, race) {
    let coeffAge;
    if (gender == "Female" && race == "White") {
        coeffAge = coeffWFemaleLnAge} 
    else if (gender == "Female" && race == "African American") {
        coeffAge = coeffAAFemaleLnAge}
    else if (gender == "Male" && race == "White") {
            coeffAge = coeffWMaleLnAge}
    else if (gender == "Male" && race == "African American") {
            coeffAge = coeffAAMaleLnAge}
    return coeffAge;
}

function getCoeffTC(gender, race) {
    let coeffTC;
    if (gender == "Female" && race == "White") {
        coeffTC = coeffWFemaleLnTC} 
    else if (gender == "Female" && race == "African American") {
        coeffTC = coeffAAFemaleLnTC}
    else if (gender == "Male" && race == "White") {
            coeffTC = coeffWMaleLnTC}
    else if (gender == "Male" && race == "African American") {
            coeffTC = coeffAAMaleLnTC}
    return coeffTC;
}

function getCoeffHDL_C(gender, race) {
    let coeffHDL_C;
    if (gender == "Female" && race == "White") {
        coeffHDL_C = coeffWFemaleLnHDL_C} 
    else if (gender == "Female" && race == "African American") {
        coeffHDL_C = coeffAAFemaleLnHDL_C}
    else if (gender == "Male" && race == "White") {
            coeffHDL_C = coeffWMaleLnHDL_C}
    else if (gender == "Male" && race == "African American") {
            coeffHDL_C = coeffAAMaleLnHDL_C}
    return coeffHDL_C;
}

function getCoeffTreatedSBP(gender, race, IsHTNTreated) {
    let coeffTreatedSBP;
    if (IsHTNTreated == 'No') {
        coeffTreatedSBP = 0}
    else if (gender == "Female" && race == "White") {
        coeffTreatedSBP = coeffWFemaleLnTreatedSBP} 
    else if (gender == "Female" && race == "African American") {
        coeffTreatedSBP = coeffAAFemaleLnTreatedSBP}
    else if (gender == "Male" && race == "White") {
            coeffTreatedSBP = coeffWMaleLnTreatedSBP}
    else if (gender == "Male" && race == "African American") {
            coeffTreatedSBP = coeffAAMaleLnTreatedSBP}
    else {
        coeffTreatedSBP = 0}
    return coeffTreatedSBP;
}

function getCoeffUntreatedSBP(gender, race, IsHTNTreated) {
    let coeffUntreatedSBP;
    if (IsHTNTreated == 'Yes') {
        coeffUntreatedSBP = 0}
    else if (IsHTNTreated == 'No') {
        if (gender == "Female" && race == "White") {
        coeffUntreatedSBP = coeffWFemaleLnUntreatedSBP} 
        else if (gender == "Female" && race == "African American") {
            coeffUntreatedSBP = coeffAAFemaleLnUntreatedSBP}
        else if (gender == "Male" && race == "White") {
            coeffUntreatedSBP = coeffWMaleLnUntreatedSBP}
        else if (gender == "Male" && race == "African American") {
            coeffUntreatedSBP = coeffAAMaleLnUntreatedSBP}
        else {
            coeffUntreatedSBP = undefined}
        }
    return coeffUntreatedSBP;
}

function getCoeffSmoker(gender, race) {
    let coeffSmoker;
    if (gender == "Female" && race == "White") {
        coeffSmoker = coeffWFemaleSmoker} 
    else if (gender == "Female" && race == "African American") {
        coeffSmoker = coeffAAFemaleSmoker}
    else if (gender == "Male" && race == "White") {
            coeffSmoker = coeffWMaleSmoker}
    else if (gender == "Male" && race == "African American") {
            coeffSmoker = coeffAAMaleSmoker}
    return coeffSmoker;
}

function getCoeffDiabetes(gender, race) {
    let coeffDiabetes;
    if (gender == "Female" && race == "White") {
        coeffDiabetes = coeffWFemaleDiabetes} 
    else if (gender == "Female" && race == "African American") {
        coeffDiabetes = coeffAAFemaleDiabetes}
    else if (gender == "Male" && race == "White") {
        coeffDiabetes = coeffWMaleDiabetes}
    else if (gender == "Male" && race == "African American") {
        coeffDiabetes = coeffAAMaleDiabetes}
    return coeffDiabetes;
}

function getCoeffLnAgeSquared(gender, race) {
    let coeffLnAgeSquared;
    if (gender == "Female" && race == "White") {
        coeffLnAgeSquared = coeffWFemaleLnAgeSquared} 
    else if (gender == "Female" && race == "African American") {
        coeffLnAgeSquared = coeffAAFemaleLnAgeSquared}
    else if (gender == "Male" && race == "White") {
        coeffLnAgeSquared = 0}
    else if (gender == "Male" && race == "African American") {
        coeffLnAgeSquared = 0}
    return coeffLnAgeSquared;
}

function getCoeffLnAgexLnTC (gender, race){
    let coeffLnAgexLnTC;
    if (gender == "Female" && race == "White") {
        coeffLnAgexLnTC = coeffWFemaleLnAgexLnTC} 
    else if (gender == "Female" && race == "African American") {
        coeffLnAgexLnTC = coeffAAFemaleLnAgexLnTC}
    else if (gender == "Male" && race == "White") {
        coeffLnAgexLnTC = coeffWMaleLnAgexLnTC}
    else if (gender == "Male" && race == "African American") {
        coeffLnAgexLnTC = coeffAAMaleLnAgexLnTC}
    return coeffLnAgexLnTC;
}

function getCoeffLnAgexLnHDL_C (gender, race){
    let coeffLnAgexLnHDL_C;
    if (gender == "Female" && race == "White") {
        coeffLnAgexLnHDL_C = coeffWFemaleLnAgexLnHDL_C} 
    else if (gender == "Female" && race == "African American") {
        coeffLnAgexLnHDL_C = coeffAAFemaleLnAgexLnHDL_C}
    else if (gender == "Male" && race == "White") {
        coeffLnAgexLnHDL_C = coeffWMaleLnAgexLnHDL_C}
    else if (gender == "Male" && race == "African American") {
        coeffLnAgexLnHDL_C = coeffAAMaleLnAgexLnHDL_C}
    return coeffLnAgexLnHDL_C;
}

function getCoeffLnAgexLnTreatedSBP (gender, race, IsHTNTreated){
   
    let coeffLnAgexLnTreatedSBP = 0;
    if (IsHTNTreated == 'Yes') {
        if (gender == "Female" && race == "White") {
            coeffLnAgexLnTreatedSBP = coeffWFemaleLnAgexLnTreatedSBP} 
        else if (gender == "Female" && race == "African American") {
            coeffLnAgexLnTreatedSBP = coeffAAFemaleLnAgexLnTreatedSBP}
        else if (gender == "Male" && race == "White") {
            coeffLnAgexLnTreatedSBP = coeffWMaleLnAgexLnTreatedSBP}
        else if (gender == "Male" && race == "African American") {
            coeffLnAgexLnTreatedSBP = coeffAAMaleLnAgexLnTreatedSBP}
        }
    return coeffLnAgexLnTreatedSBP;
}

function getCoeffLnAgexLnUntreatedSBP (gender, race, IsHTNTreated){
    
    let coeffLnAgexLnUntreatedSBP = 0;
    if (IsHTNTreated == 'No') {
        if (gender == "Female" && race == "White") {
            coeffLnAgexLnUntreatedSBP = coeffWFemaleLnAgexLnUntreatedSBP} 
        else if (gender == "Female" && race == "African American") {
            coeffLnAgexLnUntreatedSBP = coeffAAFemaleLnAgexLnUntreatedSBP}
        else if (gender == "Male" && race == "White") {
            coeffLnAgexLnUntreatedSBP = coeffWMaleLnAgexLnUntreatedSBP}
        else if (gender == "Male" && race == "African American") {
            coeffLnAgexLnUntreatedSBP = coeffAAMaleLnAgexLnUntreatedSBP}
        }
    return coeffLnAgexLnUntreatedSBP;
}

function getCoeffLnAgexSmoking (gender, race){
    let coeffLnAgexSmoking;
    if (gender == "Female" && race == "White") {
        coeffLnAgexSmoking = coeffWFemaleLnAgexSmoker} 
    else if (gender == "Female" && race == "African American") {
        coeffLnAgexSmoking = coeffAAFemaleLnAgexSmoker}
    else if (gender == "Male" && race == "White") {
        coeffLnAgexSmoking = coeffWMaleLnAgexSmoker}
    else if (gender == "Male" && race == "African American") {
        coeffLnAgexSmoking = coeffAAMaleLnAgexSmoker}
    return coeffLnAgexSmoking;
}

function getMeanSum(gender, race) {
    let meanSum;
    if (gender == "Female" && race == "White") {
        meanSum = MeanCoeffxValueWFemale} 
    else if (gender == "Female" && race == "African American") {
        meanSum = MeanCoeffxValueAAFemale}
    else if (gender == "Male" && race == "White") {
        meanSum = MeanCoeffxValueWMale}
    else if (gender == "Male" && race == "African American") {
        meanSum = MeanCoeffxValueAAMale}
    return meanSum;
}

function getBaselineSurvival(gender, race) {
        let baselineSurvival;
        if (gender == "Female" && race == "White") {
            baselineSurvival = BaselineSurvivalWFemale} 
        else if (gender == "Female" && race == "African American") {
            baselineSurvival = BaselineSurvivalAAFemale}
        else if (gender == "Male" && race == "White") {
            baselineSurvival = BaselineSurvivalWMale}
        else if (gender == "Male" && race == "African American") {
            baselineSurvival = BaselineSurvivalAAMale}
        return baselineSurvival;
}
