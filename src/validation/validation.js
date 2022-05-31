// export const idCodeValidation = "^[0-9]{10}$";

// export const idCodeValidation = (idCode) => {
//     let arrayIdCode = [];
//     let sum = 0;
//     let result = 0;
//     arrayIdCode = idCode.split('');
//     if (arrayIdCode.length !== 10){
//         return false;
//     }else if (idCode === '0000000000' || idCode === '1111111111' || idCode === '2222222222' ||
//             idCode === '3333333333' || idCode === '4444444444' || idCode === '5555555555' || 
//             idCode === '6666666666' || idCode === '7777777777' || idCode === '8888888888' || 
//             idCode === '9999999999'          
//     ){
//         return false;

//     }else {
//         for(let i = 0 ; i < arrayIdCode.length -1 ; i++) {
//             sum += parseInt(arrayIdCode[i]) * (10-i);
//         }
//         result = sum % 11 ;
//         if (result < 2) {
//             if(parseInt(arrayIdCode[9]) === result) {
//                 return true;
//             } else {
//                 return false;
//             }
//         } else {
//             if (parseInt(arrayIdCode[9]) === (11 - result)){
//                 return true;
//             }else {
//                 return false;
//             }
//         }
//     }

// };

// export const phoneNumberValidation = "^[0]?[9][0|3|1|9|2]+[0-9]{8}$";

// export const emailValidation = "^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$"

// export const homePhoneNumberValidation = "^[0][^9][^2|^9][0-9]{8}$"

// export const ipAddressValidation = "^(?!0)(?!.*\.$)((1?\d?\d|25[0-5]|2[0-4]\d)(\.|$)){4}$"
const onlyNumberAndDot="^[0-9.\b]+$"

// export const macAddressValidation = "^([0-9A-Fa-f]{2}[:-]){5}([0-9A-Fa-f]{2})$"

// export const clockValidation = "^(2[0-3]|[01]?[0-9]):([0-5]?[0-9]):([0-5]?[0-9])$"

// export const dateValidation = "^[1][1-4][0-9]{2}\/((0[1-6]\/(0[1-9]|[1-2][0-9]|3[0-1]))|(0[7-9]\/(0[1-9]|[1-2][0-9]|30))|(1[0-1]\/(0[1-9]|[1-2][0-9]|30))|(12\/(0[1-9]|[1-2][0-9])))"

// export const geoLocationValidation = {
//     lat : "^(-?[1-8]?\d(?:\.\d{1,18})?|90(?:\.0{1,18})?)$",
//     lon : "^(-?(?:1[0-7]|[1-9])?\d(?:\.\d{1,18})?|180(?:\.0{1,18})?)$"
// }

// export const IMEIvalidation = (imei) => {

//     let arrayIMEI = [];
//     let sum = 0;
//     let multiply = 0;
//     arrayIMEI = imei.split('');
    
//     for(let i =0 ; i< imei.length ; i++){
//         if (i % 2 === 0 ){
//             sum += parseInt(arrayIMEI[i]);
//         }else{
            
//             multiply = parseInt(arrayIMEI[i]) * 2;
//             if (multiply > 9 ) {
                
//                 sum += multiply % 10 + Math.floor(multiply / 10) ;
//             }else {
//                 sum += multiply;
//             }
//         }
//     }

//     if (sum % 10 === 0 ) {
//         return true;
//     } else {
//         return false;
//     }
// }

module.exports={
    onlyNumberAndDot
}