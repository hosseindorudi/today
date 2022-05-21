const data = [
  {
    id: 1,
    time: 0,
    running:true,
    activityDesciption: "مقایسه imei با پشت قاب و جعبه",
    result: false,
    describe: "",
  },
  {
    id: 2,
    time: 0,
    running:false,
    activityDesciption: "بررسی معایب ظاهری(خط و خش ضربه تا)",
    result: false,
    describe: "",
  },
  {
    id: 3,
    time: 0,
    running:false,
    activityDesciption: "بررسی ایراد اظهار شده توسط مشتری",
    result: false,
    describe: "",
  },
  {
    id: 4,
    time: 0,
    running:false,
    activityDesciption: "بررسی رمز و اکانت",
    result: false,
    describe: "",
  },
  {
    id: 5,
    time: 0,
    running:false,
    activityDesciption: "چک آنتن و صدا",
    result: false,
    describe: "",
  }
];
const qc={
    date:"1401-2-3",
    time:"12:10",
    name:"مهرزاد",
    province:"تهران",
    city:"تهران",
    operator:"تست",
    operatorQC:"اپراتور"
}
const qcExit={
  date:"1401-2-3",
  time:"12:10",
  name:"مهرزاد",
  province:"تهران",
  city:"تهران",
  tech:"تکنسین",
  operatorQC:"اپراتور"
}
const phone={
    garanteeType:"تست",
    serial:"12314",
    brand:"نوکیا",
    type:"نوع",
    model:"مدل دستگاه",
    color:"سفید",
    storage:"گیگ"

}


module.exports={
    data,
    qc,
    qcExit,
    phone
}

