const normalizeCityKeyword = (city) => {
  if (!city) return city
  let keyword = city.toLowerCase().trim()
  // Remove common prefixes
  keyword = keyword
    .replace(/^new\s+/i, "")
    .replace(/^greater\s+/i, "")
    .replace(/^old\s+/i, "")
     // Special handling
 const aliasMap = {
    // Delhi
    "delhi ncr": "delhi",
    "ncr": "delhi",
    "new delhi": "delhi",
    // Mohali
    "sahibzada ajit singh nagar": "mohali",
    "sas nagar": "mohali",
    // Gurgaon
    "gurugram": "gurgaon",
    // Bangalore
    "bengaluru": "bangalore",
    // Mumbai
    "bombay": "mumbai",
    // Prayagraj
    "allahabad": "prayagraj",
    // Vadodara
    "baroda": "vadodara"
  }

  if (aliasMap[keyword]) {
    return aliasMap[keyword]
  }

  return keyword
}
module.exports = normalizeCityKeyword