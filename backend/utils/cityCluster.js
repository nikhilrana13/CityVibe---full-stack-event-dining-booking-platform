const cityClusters = {
  // NCR
  delhi: ["delhi", "new delhi", "gurgaon", "gurugram", "noida", "greater noida", "faridabad", "ghaziabad","sonipat"],
  noida:["delhi", "new delhi", "gurgaon", "gurugram", "noida", "greater noida"],
  Gurgaon:["delhi", "new delhi", "gurgaon", "gurugram", "noida", "greater noida"],
  faridabad:["delhi", "new delhi", "gurgaon", "gurugram", "noida", "greater noida", "faridabad", "ghaziabad","sonipat"],
  ghaziabad:["delhi", "new delhi", "gurgaon", "gurugram", "noida", "greater noida", "faridabad", "ghaziabad","sonipat"],
  sonipat:["delhi", "new delhi", "gurgaon", "gurugram", "noida", "greater noida", "faridabad", "ghaziabad","sonipat"],
  // Chandigarh Tricity
  chandigarh: ["chandigarh", "mohali", "panchkula", "zirakpur", "kharar"],
  zirakpur:["chandigarh", "mohali", "panchkula", "zirakpur", "kharar"],
  kharar:["chandigarh", "mohali", "panchkula", "zirakpur", "kharar"],
  mohali:["chandigarh", "mohali", "panchkula", "zirakpur", "kharar"],
  //panchkula
  panchkula:["panchkula","chandigarh","mohali","zirakpur","kalka"],   
  // Mumbai MMR
  mumbai: ["mumbai", "thane", "navi mumbai", "kalyan", "dombivli"],
  // Bengaluru Urban
  bangalore: ["bangalore", "bengaluru", "electronic city", "whitefield"],
  // Hyderabad Metro
  hyderabad: ["hyderabad", "secunderabad", "gachibowli"],
  // Kolkata Metro
  kolkata: ["kolkata", "howrah", "salt lake"],
  // Pune Metro
  pune: ["pune", "pimpri", "chinchwad", "hinjawadi"],
  // Chennai Metro
  chennai: ["chennai", "tambaram"],
  // Ahmedabad Metro
  ahmedabad: ["ahmedabad", "gandhinagar"],
  // Jaipur
  jaipur: ["jaipur"],
  // Lucknow
  lucknow: ["lucknow"],
  // Bhopal
  bhopal: ["bhopal"],
  // Indore
  indore: ["indore"],
  // Patna
  patna: ["patna"],
  // Ranchi
  ranchi: ["ranchi"],
  // Kochi
  kochi: ["kochi", "ernakulam"],
  // Thiruvananthapuram
  thiruvananthapuram: ["thiruvananthapuram", "trivandrum"],
  // Surat
  surat: ["surat"],
  // Vadodara
  vadodara: ["vadodara", "baroda"],
  // Nagpur
  nagpur: ["nagpur"],
  // Kanpur
  kanpur: ["kanpur"],
  // Varanasi
  varanasi: ["varanasi", "banaras"],
  // Coimbatore
  coimbatore: ["coimbatore"],
  // Visakhapatnam
  visakhapatnam: ["visakhapatnam", "vizag"],
  // punjab   
  punjab: ["amritsar", "jalandhar", "ludhiana", "patiala", "bathinda"],
  amritsar: ["amritsar"],
  ludhiana: ["ludhiana", "khanna"],
  jalandhar: ["jalandhar", "phagwara"],
  patiala: ["patiala", "rajpura"],
  bathinda: ["bathinda"],
  //haryana
  haryana: ["gurgaon", "gurugram", "faridabad", "panipat", "ambala", "karnal", "hisar", "rohtak","sonipat"],
  gurgaon: ["gurgaon", "gurugram", "manesar"],
  faridabad: ["faridabad"],
  panipat: ["panipat"],
  ambala: ["ambala", "ambala cantt"],
  karnal: ["karnal"],
  hisar: ["hisar"],
  rohtak: ["rohtak"],
  // UTTARAKHAND
 uttarakhand: ["dehradun", "haridwar", "rishikesh", "haldwani", "nainital"],
 dehradun: ["dehradun", "mussoorie"],
 haridwar: ["haridwar", "rishikesh"],
 haldwani: ["haldwani", "kathgodam"],
 nainital: ["nainital","haldwani","kathgodam"],
 //himachal
himachal: ["shimla", "manali", "dharamshala", "kasauli", "solan", "dalhousie", "kasol", "kullu"],
shimla: ["shimla", "naldehra", "chail"],
manali: ["manali", "kullu", "rohtang","siyal","old manali"],
dharamshala: ["dharamshala", "mcleodganj"],
kasauli: ["kasauli","shimla"],
dalhousie: ["dalhousie"],
kasol: ["kasol", "tosh","kullu manali","manali"],
kullu: ["kullu", "manali"],
}
module.exports = cityClusters