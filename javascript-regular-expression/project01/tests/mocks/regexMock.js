
exports.unsafeRegex = /(a+)+/ 

exports.safeRegex = /^([^\x00-\x1F\x7F-\x9F\cX]+)<(.+)>$/